<template>
  <div class="report">
    <Content>
      <div class="report-notifications" v-if="!isOthersAmount">
        To keep responses anonymous and honest,
        I will wait until I have received at least 4 responses before
        I send your first results and will update you as I receive more
      </div>

      <h1 class="h4 text-center mb-1">Well done {{ getProfile.name }}!</h1>
      <h2 class="text mb-5 text-center">Here’s your first report</h2>

      <template v-if="getGuessedCard">
        <div class="h5 mb-4">
          You guessed you are
        </div>
        <Card
          :title="getGuessedCard.title"
          :showText="getGuessedCard.showText"
          :tag="getGuessedCard.tag"
          :img="getGuessedCard.src"
        />
      </template>

      <div class="diagram mb-5">
        <div class="diagram__title-with-respondents mb-3" v-if="respondentsCount">
          <div class="report__respondents">
            <svg class="report__respondents-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.42 15.93">
              <circle
                fill="none"
                stroke="#999"
                stroke-miterlimit="10"
                cx="6.21"
                cy="4"
                r="3.91"/>
              <path
                fill="none" stroke="#999" stroke-miterlimit="10"
                d="M2.29,16a5.71,5.71,0,0,1,11.34-.92,5.62,5.62,0,0,1,.08.92"
                transform="translate(-1.79 -0.07)"
              />
            </svg>
            Respondents:  {{ respondentsCount }}
          </div>
        </div>

        <ChartCompare :data="refreshData()"></ChartCompare>
        <Radar :data="radarData" />
      </div>

      <b-modal
        id="modal-multi-1"
        modal-class="modal-sticky-bottom"
        hide-footer
      >
        <template v-slot:modal-title>
           Crowdsource your Work Persona
        </template>
        <p class="text mb-3">
          Your report so far is what you think your personality is.
          This is called your Anima.
          The "you" that others experience is called your Persona.
          We can find out what your Work Persona is by asking people you work or have worked with
          to answer questions about you.
        </p>
        <p class="text mb-3">
          Share the link with your colleagues - they can answer a similar questionnaire about
          you and remain totally anonymous. We do this so they are more open and honest than
          they might be if you asked them directly.
        </p>
        <p class="text mb-4">
          You need to get at least 4 responses for us to show the anonymised results.
          We will continue to update you as we receive more responses.
        </p>
        <InputCopy v-model="shareLink" class="mb-4" />
      <!--<Share :url="shareLink" />-->
      </b-modal>
      <FeedbackModal v-model="showReportModal" />
      <button
        v-b-modal.modal-multi-1
        class="button button_w-100 button_theme-default button_size-m">
        Ask Colleagues
      </button>
    </Content>
  </div>
</template>

<script>
import Card from '@components/Card/Card.vue';
import InputCopy from '@components/InputCopy/InputCopy.vue';
import Content from '@components/Content/Content.vue';
import Radar from '@components/Radar/Radar.vue';
import FeedbackModal from '@components/Modals/FeedbackModal.vue';
import constants from '@constants';
import ChartCompare from '@components/Charts/ChartCompare.vue';


import { mapGetters } from 'vuex';

export default {
  components: {
    Card,
    InputCopy,
    Content,
    Radar,
    FeedbackModal,
    ChartCompare,
  },
  name: 'Report',
  data: () => ({
    radarData: [
      {
        value: [],
        type: 'bar',
        areaStyle: {
          color: 'rgba(0, 157, 206)',
          colorHover: 'rgba(0,157,206,0.58)',
        },
        name: 'Me',
      },
      {
        value: [],
        type: 'bar',
        areaStyle: {
          color: 'rgba(255, 192, 0)',
          colorHover: 'rgba(255,192,0,0.83)',
        },
        name: 'Colleagues',
      },
    ],
    respondentsCount: null,
    shareLink: null,
    tag: null,
    tagOthersAverage: null,
    showReportModal: false,
    SelfCoordinate: null,
    OtherCoordinate: null,
    data: [],
    nearPoints: [],
  }),
  computed: {
    ...mapGetters({
      getProfile: 'auth/getProfile',
    }),
    isOthersAmount() {
      return this.respondentsCount > 3;
    },
    getGuessedCard() {
      return constants.cards[this.getProfile.selfPersonalityType];
    },

  },
  created() {
    this.fetchPersonalityTypeReport();
  },
  methods: {
    chartOptionsBar() {
      if (this.OtherCoordinate) {
        this.data.push(
          {
            value: [],
            data: [this.getGuessedCard.value[0], this.getGuessedCard.value[1], `You guessed you are - \n ${this.getGuessedCard.title}`],
          },
          {
            value: [],
            data: [this.SelfCoordinate[0], this.SelfCoordinate[1], 'You are'],
          },
          {
            value: [],
            data: [this.OtherCoordinate[0], this.OtherCoordinate[1], 'Your Colleagues say'],
          },
          ...this.nearPoints,
        );
      }
      this.data.push(
        {
          value: [],
          data: [this.getGuessedCard.value[0], this.getGuessedCard.value[1], `You guessed you are - \n ${this.getGuessedCard.title}`],
        },
        {
          value: [],
          data: [this.SelfCoordinate[0], this.SelfCoordinate[1], 'You are'],
        },
      );
    },
    refreshData() {
      return this.data;
    },
    fetchPersonalityTypeReport() {
      this.$api.personalityTypeReport.fetchPersonalityTypeReport().then((res) => {
        this.respondentsCount = res.othersAmount;

        this.setRadar(res.selfResult.split(/(?=[-+])/), 'Me');

        if (this.isOthersAmount) {
          this.setRadar(res.othersAverageResult.split(/(?=[-+])/), 'Colleagues');
          this.OtherCoordinate = this.Coordinates(res.othersAverageResult);
          console.log('OtherCoordinate', this.OtherCoordinate);
          console.log('constants.cards', constants.cards);

          const rs = [];
          Object.values(constants.cards).forEach((key) => {
            const distance = Math.sqrt(((key.value[0] - this.OtherCoordinate[0]) ** 2)
              + ((key.value[1] - this.OtherCoordinate[1]) ** 2));
            rs.push({
              distance,
              title: key.title,
              value: key.value,
            });
          });

          function sortByDistance(arr) {// eslint-disable-line
            arr.sort((a, b) => a.distance > b.distance ? 1 : -1);// eslint-disable-line
          }                                     // eslint-disable-line

          sortByDistance(rs);

          rs.slice(0, 3).forEach((x) => {
            this.nearPoints.push({
              value: [],
              data: [x.value[0], x.value[1], x.title],
            });
          });

          console.log('this.data', this.data);
          console.log('this.nearPoints', this.nearPoints);
        }

        // this.CoordinatesForGuessed(this.getProfile.selfPersonalityType);
        this.showFeedBackModalByParams(res.othersAmount);

        this.tag = res.selfResult;
        this.tagOthersAverage = res.othersAverageResult;
        this.SelfCoordinate = this.Coordinates(res.selfResult);
        this.shareLink = `${window.location.host}${res.invitationLink}`;
        this.chartOptionsBar();
      });
    },
    setRadar(data, name) {
      const average = this.radarData.find(item => item.name === name);
      average.value = Object.values(data);
    },
    Coordinates(Res) {
      const arr = Res.split(/(?=[-+])/);
      // eslint-disable-next-line no-eval
      const x = eval(arr[0] + arr[2]);
      // eslint-disable-next-line no-eval
      const y = eval(arr[3] - arr[4] + arr[1]);

      return [x, y];
    },
    showFeedBackModalByParams() {
      const { isOthersAmount } = this;
      const isCompletedFeedBack = this.getProfile.completedFeedbacks.length;

      if (!isCompletedFeedBack && isOthersAmount) {
        this.setShowReportModal(true);
      }
    },
    setShowReportModal(value) {
      this.showReportModal = value;
    },
  },
};
</script>

<style lang="scss">
  .diagram{
    margin-left: -24px;
    margin-right: -24px;
    background-color: #fff;
    padding: 0 24px;
    position: relative;
    /*&:after{*/
    /*  content: '';*/
    /*  display: block;*/
    /*  width: 100%;*/
    /*  height: 1px;*/
    /*  background-color: #e9eaf0;*/
    /*  position: absolute;*/
    /*  left: 0;*/
    /*  top: 245px;*/
    /*}*/
    .echarts{
      width: 100%;
      height: 310px;
    }
  }
  .report__respondents{
    color: $txtColor3;
    font-family: $defaultFont;
    font-size: 14px;
    letter-spacing: 0;
    line-height: 17px;
    display: flex;
    align-items: center;
    margin-left: auto;
  }
  .report__respondents-icon{
    width: 14px;
    height: 17px;
    margin-right: 5px;
  }
  .diagram__title-with-respondents{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .report-notifications{
    padding: 16px;
    border: 1px solid #ddd;
    font-family: $defaultFont;
    font-size: 14px;
    line-height: 16px;
    color: $txtColor2;
    border-radius: 4px;
    margin-bottom: 30px;
  }

  .diagram__legend{
    border-top: 1px solid #e9eaf0;
    margin: 0 -24px;
    padding: 10px 24px ;
    overflow: scroll;
  }
  .diagram__legend-list{
    display: flex;
    justify-content: flex-end;
  }
  .diagram__legend-item{
    margin-right: 50px;
  }
  .diagram__legend-title{
    font-size: 12px;
    font-family: $defaultFont;
    color: #505D6F;
  }
  .diagram__legend-icon{
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    margin-right: 5px;
  }

</style>
