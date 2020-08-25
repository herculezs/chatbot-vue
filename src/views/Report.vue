<template>
  <div class="report">
    <Content>
      <h1 class="h4 text-center mb-1">Well done {{ getProfile.name }}!</h1>
      <h2 class="text mb-5 text-center">Here’s your first report</h2>

      <!--<div class="report-notifications">
        To keep respones private (and honest), I will wait until I have recieved at
        least 4 responses, I will send you their answers and update you as I receive more.
      </div>-->
      <!--<div class="diagram__title-with-respondents mb-3">
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
      </div>-->

      <div class="h5 mb-4">
        You guessed you are
      </div>
      <Card
        v-if="getGuessedCard"
        :title="getGuessedCard.title"
        :showText="getGuessedCard.showText"
        :hideText="getGuessedCard.hideText"
        :tag="getGuessedCard.tag"
        :img="getGuessedCard.src"
      />

      <div class="h5 mb-4">
        Based on your answers
      </div>
      <Card
        v-if="getCard"
        :title="getCard.title"
        :showText="getCard.showText"
        :hideText="getCard.hideText"
        :img="getCard.src"
        :tag="getCard.tag"
        :defaultOpen="true"
      />

      <div class="diagram mb-5">
        <Radar :data="radarData" />
      </div>


      <b-modal
        id="modal-multi-1"
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
      <button
        v-b-modal.modal-multi-1
        class="button button_w-100 button_theme-default button_size-m">
        Crowdsource now
      </button>
    </Content>
  </div>
</template>

<script>
import Card from '@components/Card/Card.vue';
import InputCopy from '@components/InputCopy/InputCopy.vue';
import Content from '@components/Content/Content.vue';
import Radar from '@components/Radar/Radar.vue';
import constants from '@constants';

import { mapGetters } from 'vuex';

export default {
  components: {
    Card,
    InputCopy,
    Content,
    Radar,
  },
  name: 'Report',
  data: () => ({
    radarData: [
      {
        value: [],
        areaStyle: {
          color: 'rgba(120, 17, 200, 0.5)',
        },
        itemStyle: {
          color: 'rgba(120, 17, 200, 0.8)',
        },
        symbol: 'none',
        name: 'user',
      },
      {
        value: [],
        type: 'radar',
        areaStyle: {
          color: 'rgba(255, 0, 0, 0.5)',
        },
        itemStyle: {
          color: 'rgba(255, 0, 0, 0.8)',
        },
        symbol: 'none',
        name: 'average',
      },
    ],
    // radarData: [],
    // radarUser: [],
    respondentsCount: 6,
    shareLink: null,
    tag: null,
  }),
  computed: {
    ...mapGetters({
      getProfile: 'auth/getProfile',
    }),
    getCard() {
      if (!this.tag) return null;

      return constants.cards[this.tag];
    },
    getGuessedCard() {
      if (!this.tag) return null;

      return constants.cards[this.getProfile.selfPersonalityType];
    },
  },
  created() {
    this.fetchPersonalityTypeReport();
  },
  methods: {
    fetchPersonalityTypeReport() {
      this.$api.personalityTypeReport.fetchPersonalityTypeReport().then((res) => {
        const user = this.radarData.find(item => item.name === 'user');
        user.value = Object.values(res.self);

        if (res.othersAmount > 3) {
          const average = this.radarData.find(item => item.name === 'average');
          average.value = Object.values(res.othersAverage);
        }

        this.tag = res.selfResult;
        this.shareLink = `${window.location.host}${res.invitationLink}`;
      });
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
    justify-content: space-between;
  }
  .diagram__legend-item{
    margin-right: 10px;
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
