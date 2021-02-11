<template>
  <div class="report">
    <Content>
      <h1 class="h4 mb-1">Report</h1>
      <h1 class="h6 mb-1 first_report">
        This report shows what personality type you think {{getPersonalityTest.name}}
        is and how your answers compare to the other people asked.
      </h1>
      <div class="h5 mb-4" v-if="getPersonalityTest.othersAmount > 3">
        Based on {{getPersonalityTest.othersAmount}}
        respondents, {{getPersonalityTest.name}}'s persona is ...
      </div>
      <div class="h5 mb-4" v-else>
        When at least 3 others have completed their questionnaires,
        you will see what they think here as well!
      </div>
      <template v-if="isOthersAmount">
        <Card
          :title="collegAnswerCard.title"
          :showText="collegAnswerCard.showText"
          :tag="collegAnswerCard.tag"
          :img="collegAnswerCard.src"
          :typeCard="'Guessed'"
        />
      </template>
      <div class="diagram">
        <div class="name-label-chart-top"><b class="chart-label">More Flexible</b></div>
        <div class="name-label-chart-left"><b class="chart-label">Less Stable</b></div>
        <div class="name-label-chart-right"><b class="chart-label">More Stable</b></div>
        <ChartCompare :data="refreshData()" @charateristic-click="setChosenCharacteristic($event)">
        </ChartCompare>
        <div class="name-label-chart-bottom"><b class="chart-label">Less Flexible</b></div>
        <template v-if="selectedCharateristic">
          <Card
            class="mt-5"
            :title="selectedCharateristic.name"
            :showText="selectedCharateristic.text"
            :typeCard="'Based'"
            default-open
          />
        </template>
      </div>
      <div class="h5 mb-4">
        Personality trait comparison, by category
      </div>
      <div class="diagram mb-5">
        <Radar :data="getChartBarData" />
      </div>


      <FeedbackModal v-model="showReportModal" />
      <div v-if="checkCompletedTest()" class="buttons-report">
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
      <div v-else>
        <button
          @click="redirectToQuestionnaireManagement"
          class="button button_w-100 button_theme-default button_size-m">
          See Surveys
        </button>
      </div>

    </Content>
  </div>
</template>

<script>
import Content from '@components/Content/Content.vue';
import Radar from '@components/Radar/Radar.vue';
import constants from '@constants';
import FeedbackModal from '@components/Modals/FeedbackModal.vue';
import ChartCompare from '@components/Charts/ChartCompare.vue';
import Card from '@components/Card/Card.vue';


import { mapGetters } from 'vuex';

export default {
  components: {
    FeedbackModal,
    Content,
    Radar,
    ChartCompare,
    Card,
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
    getChartBarData() {
      this.chartOptionsBar();
      if (this.getPersonalityTest.othersAmount >= 3) {
        return [
          {
            value: this.getPersonalityTest.result.split(/(?=[-+])/),
            areaStyle: {
              color: '#7811c9',
              colorHover: '#a111ff',
            },
            name: 'You',
          },
          {
            value: this.getPersonalityTest.othersAverageResult.split(/(?=[-+])/),
            areaStyle: {
              color: '#ff5151',
              colorHover: 'rgba(255,81,81,0.73)',
            },
            name: 'Average',
          },
        ];
      } else { // eslint-disable-line
        return [
          {
            value: this.getPersonalityTest.result.split(/(?=[-+])/),
            areaStyle: {
              color: '#7811c9',
              colorHover: '#a111ff',
            },
            name: 'You',
          },
        ];
      }
    },
  },
  created() {
    // eslint-disable-next-line no-return-assign
    this.showFeedBackModalByParams();
  },
  methods: {
    refreshData() {
      return this.data;
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
    chartOptionsBar() {
      let resYouThink;
      let resColleguag;

      if (this.getPersonalityTest.result) {
        resYouThink = this.coordinates(this.getPersonalityTest.result);
        this.setYourAnswerCard(resYouThink[2]);
      }
      if (this.getPersonalityTest.othersAverageResult) {
        resColleguag = this.coordinates(this.getPersonalityTest.othersAverageResult);
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
          data: [resYouThink[0], resYouThink[1], `You score ${this.getPersonalityTest.name} as - \n${this.yourAnswerCard.title.toUpperCase()}${(this.getPersonalityTest.othersAmount >= 3 && (resYouThink[0] === resColleguag[0] && resYouThink[1] === resColleguag[1])) ? '\nthe GROUP answered' : ''}`],
        },
      );

      if (this.getPersonalityTest.othersAmount >= 3
        && (resYouThink[0] !== resColleguag[0]
        || resYouThink[1] !== resColleguag[1])) {
        this.data.push({
          value: [],
          type: 'GROUP',
          data: [resColleguag[0], resColleguag[1], 'The GROUP answered'],
        });
      }
    },
    redirectToQuestions() {
      if (this.getProfile.selfPersonalityType) {
        this.$notify({
          type: 'error',
          text: 'User has already completed the personality test',
        });
        this.$router.push('report');
      }

      this.$router.push('questionnaire');
    },
    redirectToQuestionnaireManagement() {
      this.$router.push('questionnaire-management');
    },

    showFeedBackModalByParams() {
      // eslint-disable-next-line no-plusplus
      console.log(this.getProfile);
      const { completedFeedbacks } = this.getProfile;

      if (!completedFeedbacks.includes(process.env.FEEDBACK_ID)) {
        setTimeout(() => this.setShowReportModal(true), 60000);
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
    .echarts{
      width: 100%;
      height: 310px;
    }
  }
  .first_report {
    text-align: center;
  }
  .name-label-chart-bottom {
    text-align: center;
  }
  .name-label-chart-top {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
    top: 35px;
  }

  .name-label-chart-left {
    text-align: left;
    position: absolute;
    top: 178px;
    left: 0;
  }

  .name-label-chart-right {
    text-align: right;
    position: absolute;
    top: 178px;
    right: 0;
  }

  .chart-label {
    background-color: $chartLabel;
    font-size: 14px;
  }

  .button-left {
    float: left;
    width: 45%;
  }

  .button-right {
    float: right;
    width: 45%;
  }

  .buttons-report {
    margin-bottom: 110px;
  }
</style>
