<template>
  <div class="personality-type">
    <Content>
      <h1 class="h5 title-content">
        {{ configEnv.personalityType.title }}
      </h1>
      <b class="stability-label">Stability</b>
      <ChartChooseYourPersonality :data="chartOptionsBar"
      ></ChartChooseYourPersonality>
      <button
        @click.prevent="choose"
        class="button button_w-100 button_theme-default button_size-m"
      >
        Show Results
      </button>
    </Content>
  </div>
</template>

<script>
import Content from '@components/Content/Content.vue';
import ChartChooseYourPersonality from '@components/Charts/ChartChooseYourPersonality.vue';
import constants from '@constants';
import configEnv from '@configEnv';

export default {
  components: {
    ChartChooseYourPersonality,
    Content,
  },
  data: () => ({
    configEnv,
    chartOptionsBar: [
      {
        value: [],
        data: Object.values(constants.cards).map(card => ({
          name: card.title,
          value: card.value,
          detailedCharacteristics: card.detailedCharacteristics,
          label: {
            color: configEnv.charts.pointColor,
          },
          itemStyle: {
            color: configEnv.charts.pointColor,
          },
        })),
      },
    ],
  }),
  methods: {
    choose() {
      this.$router.push('report');
    },
  },
};
</script>


<style lang="scss">
  .stability-label {
    position: relative;
    top: 70px
  }
  .personality-type {
    .echarts{
      width: 100%;
      height: 350px;
      margin-bottom: 24px;
    }
  }
  .title-content {
    text-align: center;
  }

</style>
