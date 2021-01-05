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

import { mapGetters } from 'vuex';

export default {
  components: {
    FeedbackModal,
    Content,
    Radar,
  },
  name: 'InvintationReport',
  data: () => ({
    showReportModal: true,
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
