<template>
  <div class="report">
    <Content>
      <h1 class="h4 mb-1">Report</h1>
      <div class="h5 mb-4" v-if="getPersonalityTest.othersAmount >= 3">
        Based on your {{ getPersonalityTest.othersAmount }}
        respondents, {{ getPersonalityTest.name }} ...
      </div>
      <div class="h5 mb-4" v-else>
        When at least 3 others have completed their questionnaires,
        you will see what they think here as well!
      </div>
      <ChartCompare :data="refreshData()"></ChartCompare>

      <div class="diagram mb-5">
        <Radar :data="getChartBarData" />
      </div>


      <FeedbackModal v-model="showReportModal" />
      <button
        class="button button_w-100 button_theme-default button_size-m"
        @click="redirectToQuestions"
      >
        Find Out How Others See You
      </button>
    </Content>
  </div>
</template>

<script>
import Content from '@components/Content/Content.vue';
import Radar from '@components/Radar/Radar.vue';
import constants from '@constants';
import FeedbackModal from '@components/Modals/FeedbackModal.vue';
import ChartCompare from '@components/Charts/ChartCompare.vue';


import { mapGetters } from 'vuex';

export default {
  components: {
    FeedbackModal,
    Content,
    Radar,
    ChartCompare,
  },
  name: 'InvintationReport',
  data: () => ({
    showReportModal: true,
    SelfCoordinate: null,
    OtherCoordinate: null,
    data: [],
    nearPoints: [],
  }),
  computed: {
    ...mapGetters({
      getPersonalityTest: 'invitation/getPersonalityTest',
      getProfile: 'auth/getProfile',

    }),
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
              color: '#ffc000',
              colorHover: 'rgba(255,192,0,0.83)',
            },
            name: 'You',
          },
          {
            value: this.getPersonalityTest.othersAverageResult.split(/(?=[-+])/),
            areaStyle: {
              color: '#e46c0a',
              colorHover: 'rgba(228,108,10,0.82)',
            },
            name: 'Average',
          },
        ];
      } else { // eslint-disable-line
        return [
          {
            value: this.getPersonalityTest.result.split(/(?=[-+])/),
            areaStyle: {
              color: '#ffc000',
              colorHover: 'rgba(255,192,0,0.83)',
            },
            name: 'You',
          },
        ];
      }
    },
  },
  created() {

  },
  methods: {
    refreshData() {
      return this.data;
    },
    coordinates(Res) {
      const arr = Res.split(/(?=[-+])/);
      // eslint-disable-next-line no-eval
      const x = eval(arr[0] + arr[2]);
      // eslint-disable-next-line no-eval
      const y = eval(arr[3] - arr[4] + arr[1]);

      return [x, y];
    },
    chartOptionsBar() {
      const resYouThink = this.coordinates(this.getPersonalityTest.result);
      const resColleguag = this.coordinates(this.getPersonalityTest.othersAverageResult);

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


      this.data.push(
        {
          value: [],
          type: 'YOU_THINK_ABOUT',
          data: [resYouThink[0], resYouThink[1], `You think ${this.getPersonalityTest.name} \n is here`],
        },
        ...this.nearPoints,
      );

      if (this.getPersonalityTest.othersAmount >= 3) {
        this.data.push({
          value: [],
          type: 'GROUP',
          data: [resColleguag[0], resColleguag[1], 'The GROUP \n answered'],
        });
      }
    },
    redirectToQuestions() {
      if (this.getProfile.selfPersonalityType) {
        this.$notify({
          type: 'error',
          text: 'User has already completed the personality test',
        });
        return;
      }

      this.$router.push('questionnaire');
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
</style>
