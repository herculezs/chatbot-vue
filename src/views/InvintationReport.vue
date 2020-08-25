<template>
  <div class="report">
    <Content>
      <h1 class="h4 mb-1">Report</h1>

      <div class="diagram mb-5">
        <Radar :data="getRadarData" />
      </div>

      <div class="h5 mb-4">
        Based on your answers {{ getPersonalityTest.name }} is
      </div>
      <Card
        v-if="getCard"
        :title="getCard.title"
        :showText="getCard.showText"
        :hideText="getCard.hideText"
        :tag="getCard.tag"
        :img="getCard.src"
        :defaultOpen="true"
      />

      <button
        class="button button_w-100 button_theme-default button_size-m"
        @click="redirectToQuestions"
      >
        Start Your Quiz
      </button>
    </Content>
  </div>
</template>

<script>
import Card from '@components/Card/Card.vue';
import Content from '@components/Content/Content.vue';
import Radar from '@components/Radar/Radar.vue';
import constants from '@constants';

import { mapGetters } from 'vuex';

export default {
  components: {
    Card,
    Content,
    Radar,
  },
  name: 'InvintationReport',
  data: () => ({}),
  computed: {
    ...mapGetters({
      getPersonalityTest: 'invitation/getPersonalityTest',
      getProfile: 'auth/getProfile',

    }),
    getCard() {
      if (!this.getPersonalityTest.result) return null;

      return constants.cards[this.getPersonalityTest.result];
    },
    getRadarData() {
      return [
        {
          value: Object.values(this.getPersonalityTest.answers),
          areaStyle: {
            color: 'rgba(255, 0, 0, 0.5)',
          },
          itemStyle: {
            color: 'rgba(255, 0, 0, 0.8)',
          },
          symbol: 'none',
          name: 'user',
        },
      ];
    },
  },
  created() {

  },
  methods: {
    redirectToQuestions() {
      if (this.getProfile.selfPersonalityType) {
        this.$notify({
          type: 'error',
          title: 'error',
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
