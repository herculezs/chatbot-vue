<template>
  <div class="barChartConsistency">
    <div class="consistencyData">{{this.data.open}}%</div>
    <div class="consistencyData">{{this.data.conscientious}}%</div>
    <div class="consistencyData">{{this.data.extraverted}}%</div>
    <div class="consistencyData">{{this.data.agreeable}}%</div>
    <div class="consistencyData">{{this.data.neuotic}}%</div>
    <VueECharts
      :option="getChartData"
      autoresize
    />
  </div>
</template>

<script>
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/map';
import 'echarts/lib/component/legend';
import VueECharts from 'vue-echarts';

export default {
  components: {
    VueECharts,
  },
  props: {
    data: {
      type: Object,
    },
  },
  computed: {
    series() {
      const formatResult = [this.data.open, this.data.conscientious, this.data.extraverted,
        this.data.agreeable, this.data.neuotic];

      return [{
        type: 'bar',
        name: '(this.data[0]).name',
        data: formatResult,
        color: '#a111ff',
        barGap: 0,
        emphasis: {
          itemStyle: {
            color: '#7811c9',
          },
        },
      }];
    },
    getChartData() {
      return {
        toolbox: {
          show: false,
          feature: {
            magicType: {
              type: ['stack', 'tiled'],
            },
            dataView: {},
            saveAsImage: {
              pixelRatio: 2,
            },
          },
        },
        grid: {
          left: '1%',
          right: '1%',
          bottom: '3%',
          top: '35%',
        },
        tooltip: {
          show: false,
        },
        xAxis: {
          data: ['Open', 'Conscientious', 'Extraverted', 'Agreeable', 'Neurotic'],
          position: 'top',
          nameRotate: 20,
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
            },
          },
          axisLabel: {
            rotate: 90,
            showMaxLabel: true,
            fontSize: 15,
          },
          axisLine: {
            length: 6,
            lineStyle: {
              width: 2,
            },
          },
          axisTick: {
            lineStyle: {
              width: 2,
            },
          },
        },
        yAxis: {
          maxInterval: 100,
          minInterval: 100,
          min: 0,
          max: 100,
          nameLocation: 'end',
          position: 'right',
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: ['#000'],
              width: 2,
            },
          },
          axisLabel: {
            backgroundColor: 'white',
            inside: true,
            showMaxLabel: true,
            fontWeight: 'bold',
            formatter: (value) => {
              let temp;
              if (value === 0) {
                temp = ' ';
              } else if (value === 100) {
                temp = 'max';
              } else if (value === -2) {
                temp = 'min';
              }
              return temp;
            },
          },
          axisLine: {
            show: false,
          },
        },
        series: this.series,
        animationEasing: 'elasticOut',
      };
    },
  },
};
</script>

<style lang="scss">
  .radar-legend{
    display: flex;
    justify-content: center;
    margin-bottom: 7px;
  }
  .radar-legend-list{
    display: flex;
  }
  .radar-legend-item{
    display: flex;
    padding: 0 25px;
    align-items: center;
    width: 50%;
  }
  .radar-legend-item-indicator{
    min-width: 22px;
    height: 22px;
    background-color: gray;
    border-color: darkgray;
    border-width: 4px;
    border-style: solid;
    margin-right: 5px;
  }
  .radar-legend-item-text{
    font-family: $defaultFont;
    color: $txtColor2;
    font-size: 16px;
  }
  .barChartConsistency {
    height: 300px;
    width: 300px;
  }
  .firstConsistencyData{
    margin-left: 5px;
  }
  .consistencyData {
    width: 34px;
    display: inline-block;
    margin-left: 24px;
    font-weight: bold;
    color: $lnkColor2;
  }
</style>
