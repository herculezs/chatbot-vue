<template>
  <div class="report">
    <Content>
      <div class="report-notifications" v-if="!isOthersAmount">
        To keep responses anonymous and honest,
        we will wait until we have received at least <b>4 responses</b> before
        we send your first results. We will update you as further responses come in ...
      </div>
      <div class="block">
        <h1 class="h4 text-center mb-1">Well done {{ getProfile.name }}!</h1>
        <h2 class="first_report text mb-5 text-center">
          Here's your first report. It shows your personality
          type in relation to the other 34 personality
          types and where <b>you think</b> you lie on the
          Flexibility-Stability scale.
          <br/>
          Hover over the dots to show a brief summary of characteristics.
        </h2>
      </div>
      <div class="block">
        <template v-if="youAnswerCard">
          <div class="h5">
            Based on your answers, your type is ...
          </div>
          <Card
            :title="youAnswerCard.title"
            :showText="youAnswerCard.showText"
            :tag="youAnswerCard.tag"
            :img="youAnswerCard.src"
            :typeCard="'Guessed'"
          />
        </template>
      </div>
      <template v-if="this.isOthersAmount" >
        <div class="block">
          <div class="h5">
            Your contacts think your personality type is ...
          </div>
          <Card
            :title="collegAnswerCard.title"
            :showText="collegAnswerCard.showText"
            :tag="collegAnswerCard.tag"
            :img="collegAnswerCard.src"
            :typeCard="'Contacts'"
          />
        </div>
      </template>
      <div class="diagram mb-5">
        <div class="block">
          <div class="diagram__title-with-respondents" v-if="respondentsCount">
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
          <div class="name-label-chart-top"><b class="chart-label">More Flexible</b></div>
          <br/>
          <div class="name-label-chart-left"><b class="chart-label">Less Stable</b></div>
          <div class="name-label-chart-right"><b class="chart-label">More Stable</b></div>
          <ChartCompare :data="refreshData()"
                        @charateristic-click="setChosenCharacteristic($event)">
          </ChartCompare>
          <div class="name-label-chart-bottom"><b class="chart-label">Less Flexible</b></div>
          <template v-if="selectedCharateristic">
            <br/>
            <div class="h5">
              You clicked ...
            </div>
            <Card
              :title="selectedCharateristic.name"
              :showText="selectedCharateristic.text"
              :typeCard="'Based'"
              default-open
            />
          </template>
        </div>
        <div class="block">
          <div class="h5 mb-4">
            Personality trait comparison, by category
          </div>
          <Radar :data="radarData" />
        </div>
      </div>

      <b-modal
        modal-class="modal-sticky-bottom ask-contacts"
        class="ask-contacts"
        id="modal-multi-1"
        hide-footer
      >
        <template v-slot:modal-title>
          {{configEnv.report.textForReport.title}}
        </template>
        <p class="text mb-3" v-html="configEnv.report.textForReport.paragraph1">
          {{configEnv.report.textForReport.paragraph1}}
        </p>
        <p class="text mb-3">
          {{configEnv.report.textForReport.paragraph2}}
        </p>
        <p class="text mb-3" v-html="configEnv.report.textForReport.paragraph3">
          {{configEnv.report.textForReport.paragraph3}}
        </p>
        <p class="text mb-4">
          Click the <b>copy button below</b> and paste the explanatory
          text and link to your colleagues using your favourite method.
        </p>
        <InputCopy v-model="shareLink" class="mb-4" />
        <br/>
        <br/>
      </b-modal>
      <div v-if="isFreeVersionWebSite">
        <div class="buttons-report">
          <div class="block">
            <h2 class="first_report text mb-5 text-center">
              Your report so far is what you think your personality is. This is called your Anima.
              The "you" that others experience is called your Persona. We can find out what your
              Social Persona is by asking people you know socially to answer questions about you.
            </h2>
            <button
              v-b-modal.modal-1
              class="button button_w-100 button_theme-default button_size-m">
              Ask Others
            </button>
          </div>
          <b-modal
            id="modal-1"
            hide-footer
          >
            <AskOthers></AskOthers>
          </b-modal>
        </div>
      </div>
      <div v-else>
        <FeedbackModal v-model="showReportModal" />
        <div class="buttons-report">
          <div class="block">
            <button
              v-b-modal.modal-multi-1
              class="button button_theme-default button_size-m button-left">
              Ask Contacts
            </button>
            <button
              @click="redirectToQuestionnaireManagement"
              class="button button_theme-default button_size-m button-right">
              See Surveys
            </button>
          </div>
        </div>
      </div>
    </Content>
  </div>
</template>

<script>
import Card from '@components/Card/Card.vue';
import InputCopy from '@components/InputCopy/InputCopy.vue';
import Content from '@components/Content/Content.vue';
import Radar from '@components/Radar/Radar.vue';
import FeedbackModal from '@components/Modals/FeedbackModal.vue';
import ChartCompare from '@components/Charts/ChartCompare.vue';
import AskOthers from '@components/AskOthers/AskOthers.vue';
import configEnv from '@configEnv';
import isFreeVersion from '@helpers/func';

import { mapGetters } from 'vuex';
import constants from '@constants';

export default {
  components: {
    Card,
    InputCopy,
    Content,
    Radar,
    FeedbackModal,
    ChartCompare,
    AskOthers,
  },
  name: 'Report',
  data: () => ({
    configEnv,
    radarData: [
      {
        value: [],
        type: 'bar',
        areaStyle: {
          color: '#7811c9',
          colorHover: '#a111ff',
        },
        name: 'Me',
      },
      {
        value: [],
        type: 'bar',
        areaStyle: {
          color: '#ff5151',
          colorHover: 'rgba(255,81,81,0.73)',
        },
        name: 'Contacts',
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
    youAnswerCard: {},
    selectedCharateristic: null,
    collegAnswerCard: {},
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
    isFreeVersionWebSite() {
      if (this.getProfile.completedQuestionnaires) {
        return isFreeVersion() && !this.getProfile.completedQuestionnaires
          .includes(process.env.QUESTIONNAIRE_ID);
      }
      return isFreeVersion();
    },
  },
  created() {
    this.fetchPersonalityTypeReport();
  },
  methods: {
    redirectToQuestionnaireManagement() {
      this.$router.push('questionnaire-management');
    },
    changeName(text) {
      return text.replace(/\{\{firstName\}\}/g, this.getProfile.name).replace(/\{\{secondName\}\}/g,
        this.getProfile.lastName);
    },
    setChosenCharacteristic(event) {
      this.selectedCharateristic = {
        name: event[2],
        text: event[3],
      };
    },
    setYouAnswerCard(title) {
      this.youAnswerCard = constants.cards[title];
    },
    setCollegAnswerCard(title) {
      this.collegAnswerCard = constants.cards[title];
    },
    chartOptionsBar() {
      Object.values(constants.cards).forEach((value) => {
        this.data.push({
          value: [],
          type: 'GUESS',
          data: [...value.value, value.title, value.showText],
        });
      });
      if ((this.SelfCoordinate[0] || this.SelfCoordinate[1])) {
        this.data.push(
          {
            value: [],
            type: 'YOU_ARE',
            data: [this.SelfCoordinate[0], this.SelfCoordinate[1], `You scored yourself as - \n${this.youAnswerCard.title.toUpperCase()}`],
          },
        );
      }

      if (!this.showReportModal && this.OtherCoordinate) {
        this.data.push({
          value: [],
          type: 'COLLEAGUE',
          data: [this.OtherCoordinate[0], this.OtherCoordinate[1], `Your contacts say - \n${this.collegAnswerCard.title.toUpperCase()}`],
        });
      }
    },
    refreshData() {
      return this.data;
    },
    setRadar(data, name) {
      const average = this.radarData.find(item => item.name === name);
      average.value = Object.values(data);
    },
    fetchPersonalityTypeReport() {
      if (this.isFreeVersionWebSite) {
        const uniqueId = localStorage.getItem('uniqueId');

        this.$api.personalityTypeReport.fetchPersonalityTypeReportFreeVersion(uniqueId)
          .then((res) => {
            this.respondentsCount = res.othersAmount;

            this.setRadar(res.selfResult.split(/(?=[-+])/), 'Me');

            this.showFeedBackModalByParams(res.othersAmount);

            this.tag = res.selfResult;
            this.tagOthersAverage = res.othersAverageResult;
            this.SelfCoordinate = this.Coordinates(res.selfResult);

            this.setYouAnswerCard(this.SelfCoordinate[2]);

            this.chartOptionsBar();
          });
      } else {
        this.$api.personalityTypeReport.fetchPersonalityTypeReport().then((res) => {
          this.respondentsCount = res.othersAmount;

          this.setRadar(res.selfResult.split(/(?=[-+])/), 'Me');

          if (this.isOthersAmount) {
            this.setRadar(res.othersAverageResult.split(/(?=[-+])/), 'Contacts');
            this.OtherCoordinate = this.Coordinates(res.othersAverageResult);
            this.setCollegAnswerCard(this.OtherCoordinate[2]);
          }

          this.showFeedBackModalByParams(res.othersAmount);

          this.tag = res.selfResult;
          this.tagOthersAverage = res.othersAverageResult;
          this.SelfCoordinate = this.Coordinates(res.selfResult);

          this.setYouAnswerCard(this.SelfCoordinate[2]);
          this.shareLink = `${window.location.protocol}//${window.location.host}${res.invitationLink}`;

          const [youAreX, youAreY] = this.SelfCoordinate;

          const mostLikelyCharacters = {
            left: {},
            right: {},
            bottom: {},
            top: {},
          };

          const allDirections = [{
            key: 'left',
            isRightDirection: (sourceX, sourceY, x) => sourceX <= x,
          },
          {
            key: 'right',
            isRightDirection: (sourceX, sourceY, x) => sourceX > x,
          },
          {
            key: 'bottom',
            isRightDirection: (sourceX, sourceY, x, y) => sourceY <= y,
          },
          {
            key: 'top',
            isRightDirection: (sourceX, sourceY, x, y) => sourceY > y,
          },
          ];

          allDirections.forEach((direction) => {
            const currentCards = Object.values(constants.cards);
            currentCards
              .filter(({ title }) => {
                const allValues = Object.values(mostLikelyCharacters);
                return !allValues.filter(d => title === d.title).length;
              })
              .forEach(({ value, title }) => {
                const coordinateX = value[0];
                const coordinateY = value[1];
                const distance = Math.sqrt(((coordinateX - youAreX) ** 2)
                  + ((coordinateY - youAreY) ** 2));

                const rightDirection = direction.isRightDirection(coordinateX, coordinateY,
                  youAreX, youAreY);

                const lastDistance = mostLikelyCharacters[direction.key].distance
                  || Number.MAX_VALUE;

                if (rightDirection && lastDistance > distance) {
                  mostLikelyCharacters[direction.key].distance = distance;
                  mostLikelyCharacters[direction.key].title = title;
                  mostLikelyCharacters[direction.key].value = value;
                }
              });
          });

          Object.values(mostLikelyCharacters).filter(v => v.value).forEach(({ title, value }) => {
            this.nearPoints.push({
              value: [],
              type: 'NEAREST',
              data: [...value, title],

            });
          });

          this.chartOptionsBar();
        });
      }
    },
    Coordinates(Res) {
      const finalCategoryFormula = Res.split(/(?=[-+])/);

      const currentCards = Object.values(constants.cards);

      const matchScore = [];

      currentCards.forEach((x) => {
        const openess = x.categories.OPENESS;
        const conscientiousness = x.categories.CONSCIENTIOUSNESS;
        const extraversion = x.categories.EXTRAVERSION;
        const agreeableness = x.categories.AGREEABLENESS;
        const neuroticism = x.categories.NEUROTICISM;

        const score = ((finalCategoryFormula[0] - openess) ** 2)
          + ((finalCategoryFormula[1] - conscientiousness) ** 2)
          + ((finalCategoryFormula[2] - extraversion) ** 2)
          + ((finalCategoryFormula[3] - agreeableness) ** 2)
          + ((finalCategoryFormula[4] - neuroticism) ** 2);

        matchScore.push({
          matchScore: score,
          title: x.title,
          value: [x.value[0], x.value[1]],
        });
      });

      matchScore.sort((a, b) => a.matchScore - b.matchScore);
      const [x, y] = matchScore[0].value;
      const character = matchScore[0].title;

      return [x, y, character];
    },
    showFeedBackModalByParams() {
      const { isOthersAmount } = this;
      if (isOthersAmount) {
        const { completedFeedbacks } = this.getProfile;
        if (!completedFeedbacks.includes(process.env.FEEDBACK_ID)) {
          setTimeout(() => this.setShowReportModal(true), 60000);
        }
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
    padding: 0 24px;
    position: relative;
    margin-bottom: 0;
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
    padding-top: 6px;
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
    text-align: center;
    padding: 16px;
    border: 1px solid #ddd;
    font-family: $defaultFont;
    font-size: 16px;
    line-height: 16px;
    color: $txtColor2;
    border-radius: 4px;
    margin-bottom: 30px;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
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

  .first_report {
    font-size: 16px;
    margin-bottom: 5px;
  }
  .name-label-chart-bottom {
    text-align: center;
    margin-bottom: 1px;
  }
  .name-label-chart-top {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
  }

  .name-label-chart-left {
    text-align: left;
    position: absolute;
    top: 185px;
    left: 40px;
  }

  .name-label-chart-right {
    text-align: right;
    position: absolute;
    top: 185px;
    right: 40px;
  }

  .chart-label {
    @media (max-height: $xxsMaxHeight) {
      font-size: 10px;
    }
    font-size: 12px;
  }

  .button-left {
    width: 45%;
  }

  .ask-contacts .modal-content {
    background: $bgColor1;
    @media (max-height: $xxsMaxHeight) {
      max-height: 100vh;
      overflow: auto;
    }

  }

  .button-right {
    float: right;
    width: 45%;
  }

  .block {
    border: 1px solid #ccc;
    padding: 0 7px 0 7px;
    margin: 20px 5px 0 5px;
  }
  .buttons-report .block {
    padding: 6px 7px 6px 7px;
  }
  #modal-1 {
    & .modal-dialog{
      width: auto;
      position: relative;
      max-width: 490px !important;
      margin: auto auto;
  }
}
</style>
