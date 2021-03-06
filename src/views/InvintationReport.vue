<template>
  <div class="invitation-report">
    <Content>
      <div class="block">
        <h1 class="h4 mb-1">Report</h1>
        <h1 class="h6 mb-1 first_report">
          This report shows what personality type you think {{getPersonalityTest.name}}
          is and how your answers compare to the other people asked.
        </h1>
      </div>
      <div class="block">
        <template v-if="yourAnswerCard">
          <div class="h5">
            You think {{getPersonalityTest.name}}'s personality is closest to ...
          </div>
          <Card
            :title="yourAnswerCard.title"
            :showText="yourAnswerCard.showText"
            :tag="yourAnswerCard.tag"
            :img="yourAnswerCard.src"
            :typeCard="'Guessed'"
        />
        </template>
      </div>
      <div class="h5 mb-4 block" v-if="!this.isOthersAmount">
        When at least {{ 4 - respondentsCount }} others have completed their questionnaires,
        you will see what they think here as well!
      </div>
      <template v-if="this.isOthersAmount">
        <div class="block">
          <div class="h5">
            Based on {{getPersonalityTest.othersAmount}}
            respondents, {{getPersonalityTest.name}}'s personality is closest to ...
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
      <div class="diagram mb-5 block">
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
        <br v-else/>
        <ChartCompare :data="refreshData()" @charateristic-click="setChosenCharacteristic($event)">
        </ChartCompare>
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
        <div class="diagram mb-5" v-if="barChart !== null">
          <BubbleChart :data="barChart" :subGroup="subGroup"
                       @click-to-character="setChosenGroupCharacteristic($event)"/>
        </div>
      </div>

      <FeedbackModal v-model="showReportModal" />
        <div v-if="checkCompletedTest()" class="buttons-report">
          <div class="block">
            <button
              class="button button_theme-default button_size-m button-left"
              @click="redirectToQuestions">
              Find Out How Others See You
            </button>
            <button
              @click="redirectToQuestionnaireManagement"
              class="button button_theme-default button_size-m button-right">
              See Surveys
            </button>
          </div>
        </div>
        <div class="buttons-report" v-else>
          <div class="block">
            <button
              @click="redirectToQuestionnaireManagement"
              class="button button_w-100 button_theme-default button_size-m">
              See Surveys
            </button>
          </div>
        </div>
    </Content>
  </div>
</template>

<script>
import Content from '@components/Content/Content.vue';
import BubbleChart from '@components/BubbleChart/BubbleChart.vue';
import constants from '@constants';
import FeedbackModal from '@components/Modals/FeedbackModal.vue';
import ChartCompare from '@components/Charts/ChartCompare.vue';
import Card from '@components/Card/Card.vue';
import { mapGetters } from 'vuex';
import api from '@api/index';

export default {
  components: {
    FeedbackModal,
    Content,
    BubbleChart,
    ChartCompare,
    Card,
  },
  props: {
    userId: {
      type: String,
    },
  },
  name: 'InvintationReport',
  data: () => ({
    showReportModal: false,
    SelfCoordinate: null,
    OtherCoordinate: null,
    data: [],
    nearPoints: [],
    collegAnswerCard: {},
    yourAnswerCard: {},
    selectedCharateristic: null,
    ready: false,
    barChart: null,
    respondentsCount: null,
    subGroup: false,
  }),
  computed: {
    ...mapGetters({
      getPersonalityTest: 'invitation/getPersonalityTest',
      getProfile: 'auth/getProfile',
    }),
    isOthersAmount() {
      return this.getPersonalityTest.othersAmount > 3;
    },
    getCard() {
      if (!this.getPersonalityTest.result) return null;

      return constants.cards[this.getPersonalityTest.result];
    },
  },
  created() {
    api.questionnaire.getInvitationAnswer(this.userId).then((answer) => {
      this.$store.dispatch('invitation/setPersonalityTestForManager',
        {
          formData: answer,
        }).then(() => {
        this.getChartBarData();
        this.chartOptionsBar();
      });
    }).catch(() => {
      this.$router.push({ name: 'questionnaire-management' });
    });
    // eslint-disable-next-line no-return-assign
    this.showFeedBackModalByParams();
  },
  methods: {
    refreshData() {
      return this.data;
    },
    // eslint-disable-next-line no-unused-vars
    getChartBarData(selectCategory = 'mainResult', colorU1 = '#9C11F2', colorU2 = '#ff5151',
      borderColorU1 = '#5e119f', borderColorU2 = '#bf4545') {
      if (this.getPersonalityTest.othersAmount >= 4) {
        this.barChart = [
          {
            value: this.getPersonalityTest.result[selectCategory].split(/(?=[-+])/),
            name: 'You',
            itemColor: {
              borderColor: borderColorU1,
              color: colorU1,
            },
          },
          {
            itemColor: {
              borderColor: borderColorU2,
              color: colorU2,
            },
            value: this.getPersonalityTest.othersAverageResult[selectCategory].split(/(?=[-+])/),
            name: 'Average',
          },
        ];
      } else { // eslint-disable-line
        this.barChart = [
          {
            value: this.getPersonalityTest.result[selectCategory].split(/(?=[-+])/),
            itemColor: {
              borderColor: borderColorU1,
              color: colorU1,
            },
            name: 'You',
          },
        ];
      }
    },
    setChosenGroupCharacteristic(event) {
      if (event === 'Open' && (this.getPersonalityTest.result.opensResult
        || this.getPersonalityTest.othersAverageResult.opensResult)) {
        this.chooseOtherResult(event, 'opensResult', true,
          '#FC6F4D', '#B15771', '#c85e3f', '#88444e');
      } else if (event === 'Conscientious' && (this.getPersonalityTest.result.conscientiousResult
        || this.getPersonalityTest.othersAverageResult.conscientiousResult)) {
        this.chooseOtherResult(event, 'conscientiousResult', true,
          '#FD7c49', '#BE6867', '#be5f3c', '#974c4c');
      } else if (event === 'Extraverted' && (this.getPersonalityTest.result.extravertedResult
        || this.getPersonalityTest.othersAverageResult.extravertedResult)) {
        this.chooseOtherResult(event, 'extravertedResult', true,
          '#FD8945', '#CB795D', '#d27037', '#99534d');
      } else if (event === 'Agreeable' && (this.getPersonalityTest.result.agreeableResult
        || this.getPersonalityTest.othersAverageResult.agreeableResult)) {
        this.chooseOtherResult(event, 'agreeableResult', true,
          '#FE9741', '#D88B53', '#9d542b', '#ba744c');
      } else if (event === 'Neurotic' && (this.getPersonalityTest.result.neuroticResult
        || this.getPersonalityTest.othersAverageResult.neuroticResult)) {
        this.chooseOtherResult(event, 'neuroticResult', true,
          '#FEA43D', '#E59C49', '#9d5828', '#ae6a49');
      } else if (event === 'General' && (this.getPersonalityTest.result.mainResult
        || this.getPersonalityTest.othersAverageResult.mainResult)) {
        this.chooseOtherResult(event, 'mainResult', false,
          '#9C11F2', '#ff5151', '#5e119f', '#bf4545');
      }
    },
    chooseOtherResult(event, nameResult, subGroup, colorU1, colorU2, borderColorU1, borderColorU2) {
      if (this.getPersonalityTest.result[nameResult]) {
        this.getChartBarData(nameResult, colorU1, colorU2, borderColorU1, borderColorU2);
      }
      if (this.getPersonalityTest.othersAverageResult[nameResult]) {
        this.getChartBarData(nameResult, colorU1, colorU2, borderColorU1, borderColorU2);
      }
      this.subGroup = subGroup;
    },
    setChosenCharacteristic(event) {
      this.selectedCharateristic = {
        name: event[2],
        text: event[3],
      };
    },
    setCollegeAnswerCard(title) {
      this.collegAnswerCard = constants.cards[title];
    },
    setYourAnswerCard(title) {
      this.yourAnswerCard = constants.cards[title];
    },
    checkCompletedTest() {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i <= this.getProfile.completedQuestionnaires.length; i++) {
        if (this.getProfile.completedQuestionnaires[i] === process.env.QUESTIONNAIRE_ID) {
          return false;
        }
      }
      return true;
    },
    coordinates(Res) {
      const finalCategoryFormula = Res.split(/(?=[-+])/);

      const currentCards = Object.values(constants.cards);

      const matchScore = [];

      currentCards.forEach((x) => {
        const xAxis = x.alphaBetaScore.x;
        const yAxis = x.alphaBetaScore.y;

        const betaY = (+finalCategoryFormula[3]
          + +finalCategoryFormula[1] - +finalCategoryFormula[4]);
        const alphaX = (+finalCategoryFormula[0] + +finalCategoryFormula[2]);

        const score = ((xAxis - alphaX) ** 2)
          + ((yAxis - betaY) ** 2);


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
    chartOptionsBar() {
      let resYouThink;
      let resColleguag;
      if (this.getPersonalityTest.result) {
        this.respondentsCount = this.getPersonalityTest.othersAmount;
        resYouThink = this.coordinates(this.getPersonalityTest.result.mainResult);
        this.setYourAnswerCard(resYouThink[2]);
      }
      if (this.getPersonalityTest.othersAverageResult) {
        resColleguag = this.coordinates(this.getPersonalityTest.othersAverageResult.mainResult);
        this.setCollegeAnswerCard(resColleguag[2]);
      }

      const [youAreX, youAreY] = resYouThink;

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

            const lastDistance = mostLikelyCharacters[direction.key].distance || Number.MAX_VALUE;

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

      Object.values(constants.cards).forEach((value) => {
        this.data.push({
          value: [],
          type: 'GUESS',
          data: [...value.value, value.title, value.showText],
        });
      });


      this.data.push(
        {
          value: [],
          type: 'YOU_THINK_ABOUT',
          data: [resYouThink[0], resYouThink[1], `You score ${this.getPersonalityTest.name} as - \n${this.yourAnswerCard.title.toUpperCase()}`],
        },
      );

      if (this.getPersonalityTest.othersAmount > 3) {
        this.data.push({
          value: [],
          type: 'GROUP',
          data: [resColleguag[0], resColleguag[1], `The GROUP answered as - \n${this.collegAnswerCard.title.toUpperCase()}`],
        });
      }
    },
    redirectToQuestions() {
      const { completedQuestionnaires } = this.getProfile;

      if (completedQuestionnaires.includes(process.env.QUESTIONNAIRE_ID)) {
        this.$notify({
          type: 'error',
          text: 'User has already completed the personality test',
        });
        this.$router.push({ name: 'report' });
      }

      this.$router.push({ name: 'questionnaire' });
    },
    redirectToQuestionnaireManagement() {
      this.$router.push({ name: 'questionnaire-management' });
    },

    async showFeedBackModalByParams() {
      const { completedFeedbacks, completedQuestionnaires } = this.getProfile;

      const completeTest = await this.$api.personalityTypeReport.countOtherCompleteTestForU1();

      if ((completedQuestionnaires.includes(process.env.QUESTIONNAIRE_ID)
        && completeTest > 3) || (!completedQuestionnaires.includes(process.env.QUESTIONNAIRE_ID)
        && this.getPersonalityTest.othersAmount > 3)) {
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
  .first_report {
    text-align: center;
  }
  .chart-label {
    @media (max-height: $xxsMaxHeight) {
      font-size: 10px;
    }
    font-size: 12px;
  }

  .invitation-report .name-label-chart-left {
    left: 10px;
  }
  .invitation-report .name-label-chart-right {
    right: 10px;
  }
  .button-left {
    width: 45%;
  }

  .button-right {
    float: right;
    width: 45%;
  }

  .report__respondents-icon{
    width: 14px;
    height: 17px;
    margin-right: 5px;
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
    float: right;
    padding-top: 6px;
  }
  .button-report{
    padding-bottom: 7px;
    padding-top: 7px;
  }
  .block {
    border: 1px solid #ccc;
    padding: 0 7px 0 7px;
    margin: 20px 5px 0 5px;
  }
  .buttons-report .block {
    padding: 7px 7px 7px 7px;
  }
  .diagram__title-with-respondents{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
