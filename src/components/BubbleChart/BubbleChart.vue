<template>
  <div class="bubbleChart">
    <div class="character" v-if="showLabels">
      <span class="character-name character-open" :class="{lowPositionOpen: !twoChart}">Open</span>
      <span class="character-name character-conscientious"
            :class="{lowPositionConscientious: !twoChart}">
        Conscientious
      </span>
      <span class="character-name character-extraverted"
            :class="{lowPositionExtraverted: !twoChart}">
        Extraverted
      </span>
      <span class="character-name character-agreeable" :class="{lowPositionAgreeable: !twoChart}">
        Agreeable
      </span>
      <span class="character-name character-neurotic" :class="{lowPositionNeurotic: !twoChart}">
        Neurotic
      </span>
    </div>
    <VueECharts
      :option="getChartData"
      autoresize
      @click="choose"
      ref="chart"
    />
    <div class="bubble-legend">
      <div class="bubble-legend-list">
        <template v-if="getDataForLegends.length >= 2">
          <div
            class="bubble-legend-item"
            v-for="(item, index) in getDataForLegends"
            :key="index"
            :class="'label-bubble-chart-' + (index + 1)"
          >
            <div class="bubble-legend-item-text" :style="{color: item.itemColor.color}">
              {{ item.name.charAt(0).toUpperCase() + item.name.slice(1) }}
            </div>
          </div>
        </template>
        <template v-else>
          <div
            class="radar-legend-item label-bubble-chart"
            v-for="(item, index) in getDataForLegends"
            :key="index"
          >
            <div  class="bubble-legend-item-text"
                 :style="{color: item.itemColor.color}">
              {{ item.name.charAt(0).toUpperCase() + item.name.slice(1) }}
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/map';
import 'echarts/lib/component/legend';
import VueECharts from 'vue-echarts';
// import * as echarts from 'echarts';

export default {
  components: {
    VueECharts,
  },
  props: {
    data: {
      type: Array,
    },
    subGroup: {
      type: Boolean,
    },
    showLabels: {
      type: Boolean,
      default: true,
    },
  },
  beforeUpdate() {
    if (this.updatedChart) {
      this.$refs.chart.clear();
    }
    this.updatedChart = true;
  },
  data: () => ({
    updatedChart: true,
    label: {
      show: true,
      formatter(param) {
        return param.data[3];
      },
      minMargin: 10,
      fontSize: 20,
      fontWeight: 'bold',
    },
    showShadow: {
      // shadowColor: '#404040',
      // shadowOffsetY: 15,
      // shadowBlur: 13,
      borderWidth: 2,
      opacity: 1,
    },
    typeChart: ['Open', 'Conscientious', 'Extraverted', 'Agreeable', 'Neurotic'],
  }),
  computed: {
    twoChart() {
      return this.data[1] !== undefined && (this.data[1]).value.length > 0;
    },
    getDataForLegends() {
      return this.data.filter(item => item.value.length);
    },
    series() {
      let ser;
      let positionX = 20;

      const formatResult = this.data.map((x) => {
        let i = 5;
        let countType = 0;
        if (this.data[1] !== undefined && (this.data[1]).value.length > 0) {
          const resultArrays = x.value.map((u) => {
            // eslint-disable-next-line no-plusplus
            const result = [i, positionX, +u, +u, this.typeChart[countType++]];
            i += 10;
            return result;
          });
          positionX += 50;
          return resultArrays;
        }
        return x.value.map((u) => {
          // eslint-disable-next-line no-plusplus
          const result = [i, 50, +u, +u, this.typeChart[countType++]];
          i += 10;
          return result;
        });
      });

      if (this.data[1] !== undefined && (this.data[1]).value.length > 0) {
        ser = [{
          name: 'bubbleChart',
          data: formatResult[0],
          type: 'scatter',
          symbol: this.data[0].symbol,
          symbolSize(data) {
            return data[2] * 20;
          },
          itemStyle: {
            ...this.showShadow,
            borderColor: this.data[0].itemColor.borderColor,
            color: this.data[0].itemColor.color,
            colorHover: this.data[0].itemColor.colorHover,
          },
          label: {
            ...this.label,
            position: 'inside',
            color: '#ffffff',
          },
        }, {
          name: 'bubbleChart',
          data: formatResult[1],
          type: 'scatter',
          symbol: this.data[1].symbol,
          symbolSize(data) {
            return data[2] * 20;
          },
          itemStyle: {
            ...this.showShadow,
            borderColor: this.data[1].itemColor.borderColor,
            color: this.data[1].itemColor.color,
            colorHover: this.data[1].itemColor.colorHover,
          },
          label: {
            ...this.label,
            position: 'inside',
            color: '#ffffff',
          },
        }];
      } else {
        ser = [{
          name: 'bubbleChart',
          data: formatResult[0],
          type: 'scatter',
          symbol: this.data[0].symbol,
          symbolSize(data) {
            return data[2] * 20;
          },
          itemStyle: {
            ...this.showShadow,
            borderColor: this.data[0].itemColor.borderColor,
            color: this.data[0].itemColor.color,
            colorHover: this.data[0].colorHover,
          },
          label: {
            ...this.label,
            position: 'inside',
            color: '#ffffff',
          },
        }];
      }
      return ser;
    },
    getChartData() {
      return {
        grid: {
          left: '5%',
          right: '5%',
          bottom: '8%',
        },
        xAxis: {
          show: false,
          max: 50,
        },
        yAxis: {
          show: false,
          max: 80,
        },
        series: this.series,
      };
    },
  },
  methods: {
    choose(dataObject) {
      // return data only if text is available
      if (this.subGroup) {
        this.$emit('click-to-character', 'General');
      } else {
        this.$emit('click-to-character', dataObject.data[4]);
      }
    },
  },
};
</script>

<style lang="scss">
  .barChart {
    width: 100%;
  }
  .bubble-legend {
    position: relative;
  }
  .radar-legend{
    display: flex;
    justify-content: center;
  }
  .radar-legend-list{
    display: flex;
  }
  .radar-legend-item{
    display: flex;
    align-items: center;
    width: 25px;
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
  .bubble-legend-item-text{
    font-family: $defaultFont;
    color: $txtColor2;
    font-size: 20px;
    font-weight: bold;
    position: absolute;
    /*left: 91%;*/
  }
  .character-name {
    display: inline-block;
    position: absolute;
    transform: rotate(-35deg);
    color: #7811C9;
    font-weight: bold;
    font-size: 17px;
  }
  .character-open {
    left: 7%;
    top: 10px
  }
  .character-conscientious {
    left: 19%;
    top: -15px;
  }
  .character-extraverted {
    left: 38%;
    top: -10px;
   }
  .character-agreeable {
    left: 57%;
    top: -10px;
  }
  .character-neurotic {
    left: 76%;
    top: -5px;
  }
  .lowPositionOpen {
    top: 70px;
  }
  .lowPositionConscientious {
    top: 50px;
  }
  .lowPositionExtraverted {
    top: 55px;
  }
  .lowPositionAgreeable {
    top: 57px;
  }
  .lowPositionNeurotic {
    top: 59px;
  }
  .shadow-main-position {
    left: 70px;
  }
  .label-bubble-chart {
    position: absolute;
    bottom: 75px;
    left: 46%;
    right: 0;
  }

  .label-bubble-chart-1 {
    position: absolute;
    bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 50%;
  }

  .label-bubble-chart-2 {
    position: absolute;
    bottom: 155px;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 50%;
  }
  .character {
    position: relative;
  }

  .bubble-legend-list {
    position: relative;
  }

</style>
