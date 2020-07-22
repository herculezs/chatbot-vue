<template>
  <div class="report">
    <div class="report__header">
      <h1 class="h4 report__title">Well done John!</h1>
      <h2 class="text text-center">Here’s your first report</h2>
    </div>

    <h3 class="h5">Report</h3>
    <div class="diagram">
      <ECharts
        :options="pie"
        ref="pie"
        autoresize
      />
    </div>

    <div class="h5">
      You think you are
    </div>
    <Card
      :title="cardData.debator.title"
      :showText="cardData.debator.showText"
      :hideText="cardData.debator.hideText"
    />

    <div class="h5">
      Based on your answers you are
    </div>
    <Card
      :title="cardData.debator.title"
      :showText="cardData.debator.showText"
      :hideText="cardData.debator.hideText"
      :defaultOpen="true"
    />

    <button class="button button_w-100 button_theme-default button_size-m">
      Share With Friends
    </button>
  </div>
</template>

<script>
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/map';
import 'echarts/lib/component/legend';
import ECharts from 'vue-echarts';
import Card from '@components/Card/Card.vue';

export default {
  components: {
    ECharts,
    Card,
  },
  name: 'Report',
  data: () => ({
    cardData: {
      debator: {
        title: 'Debator',
        showText: 'Flexible and charming '
          + 'artists, always ready to explore and experience something new.\n'
          + '          Flexible and charming artists, always ready '
          + 'to explore and experience something new.',
        hideText: 'Flexible and charming artists, '
          + 'always ready to explore and experience something new.\n'
          + '            Flexible and charming artists, '
          + 'always ready to explore and experience something new.\n'
          + '            Flexible and charming artists.',
      },
    },
    pie: {
      legend: {
        type: 'plain',
        bottom: 10,
        icon: 'circle',
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 12,
        left: 0,
      },
      series: [
        {
          type: 'pie',
          radius: '70%',
          center: ['50%', '44%'],
          selectedMode: 'single',
          data: [
            {
              value: 335,
              name: 'Stability',
              itemStyle: {
                color: '#009AF0',
              },
            },
            {
              value: 310,
              name: 'Privacy',
              itemStyle: {
                color: '#16F8DA',
              },
            },
            {
              value: 274,
              name: 'Logic',
              itemStyle: {
                color: '#506977',
              },
            },
            {
              value: 150,
              name: 'Patience',
              itemStyle: {
                color: '#5F23FD',
              },
            },
            {
              value: 500,
              name: 'Yellow',
              itemStyle: {
                color: '#F5D30A',
              },
            },
          ].sort((a, b) => a.value - b.value),
          roseType: 'radius',
          label: false,
        },
      ],
    },
  }),
  computed: {},
  methods: {},
};
</script>

<style lang="scss">
  .diagram{
    margin: 0 -24px 16px;
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

  .report__title{
    margin-bottom: 8px;
    text-align: center;
    margin-top: 0;
  }
  .report__header{
    margin-bottom: 32px;
  }
</style>
