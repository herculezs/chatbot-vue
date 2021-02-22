<template>
  <div>
    <ECharts
      :options="getChartData"
      autoresize
    />
    <div class="radar-legend">
      <div class="radar-legend-list">
        <div
          class="radar-legend-item"
          v-for="(item, index) in getDataForLegends"
          :key="index"
        >
          <div
            class="radar-legend-item-indicator"
            :style="{'background-color': item.areaStyle.color,
             'border-color': item.areaStyle.color}"
          >
          </div>
          <div class="radar-legend-item-text">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/map';
import 'echarts/lib/component/legend';
import ECharts from 'vue-echarts';

export default {
  components: {
    ECharts,
  },
  props: {
    data: {
      type: Array,
    },
  },
  computed: {
    getDataForLegends() {
      return this.data.filter(item => item.value.length);
    },
    series() {
      let ser;
      const formatResult = this.data.map(x => x.value.map(u => u - 3));

      if (this.data[1] !== undefined && (this.data[1]).value.length > 0) {
        ser = [{
          type: 'bar',
          name: (this.data[0]).name,
          data: formatResult[0],
          color: this.data[0].areaStyle.color,
          barGap: 0,
          emphasis: {
            itemStyle: {
              color: this.data[0].areaStyle.colorHover,
            },
          },
        }, {
          type: 'bar',
          name: (this.data[1]).name,
          data: formatResult[1],
          color: this.data[1].areaStyle.color,
          emphasis: {
            itemStyle: {
              color: this.data[1].areaStyle.colorHover,
            },
          },
        }];
      } else {
        ser = [{
          type: 'bar',
          name: (this.data[0]).name,
          data: formatResult[0],
          color: this.data[0].areaStyle.color,
          barGap: 0,
          emphasis: {
            itemStyle: {
              color: this.data[0].areaStyle.colorHover,
            },
          },
        }];
      }
      return ser;
    },
    getChartData() {
      return {
        toolbox: {
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
        tooltip: {},
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
          maxInterval: 2,
          minInterval: 2,
          min: -2,
          max: 2,
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
              } else if (value === 2) {
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
</style>
