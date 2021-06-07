<template>
  <div class="barChart">
<!--    <span class=shadow1></span>-->
<!--    <span class=shadow2></span>-->
<!--    <span class=shadow3></span>-->
<!--    <span class=shadow4></span>-->
<!--    <span class=shadow5></span>-->

<!--    <span class=shadow6></span>-->
<!--    <span class=shadow7></span>-->
<!--    <span class=shadow8></span>-->
<!--    <span class=shadow9></span>-->
<!--    <span class=shadow10></span>-->

    <span class="character-name character-open" :class="{lowPositionOpen: !twoChart}">Open</span>
    <span class="character-name character-conscientious"
          :class="{lowPositionConscientious: !twoChart}">
      Conscientious
    </span>
    <span class="character-name character-extraverted" :class="{lowPositionExtraverted: !twoChart}">
      Extraverted
    </span>
    <span class="character-name character-agreeable" :class="{lowPositionAgreeable: !twoChart}">
      Agreeable
    </span>
    <span class="character-name character-neurotic" :class="{lowPositionNeurotic: !twoChart}">
      Neurotic
    </span>

    <VueECharts
      :option="getChartData"
      autoresize
      @click="choose"
      ref="chart"
    />
    <div class="radar-legend">
      <div class="radar-legend-list">
        <template v-if="getDataForLegends.length >= 2">
          <div
            class="radar-legend-item"
            v-for="(item, index) in getDataForLegends"
            :key="index"
            :class="'label-bubble-chart-' + (index + 1)"
          >
            <div class="radar-legend-item-text" :style="{color: item.itemColor.color}">
              {{ item.name }}
            </div>
          </div>
        </template>
        <template v-else>
          <div
            class="radar-legend-item label-bubble-chart"
            v-for="(item, index) in getDataForLegends"
            :key="index"
          >
            <div  class="radar-legend-item-text"
                 :style="{color: item.itemColor.color}">
              {{ item.name }}
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
  },
  data: () => ({
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
  .radar-legend-item-text{
    font-family: $defaultFont;
    color: $txtColor2;
    font-size: 20px;
    font-weight: bold;
  }
  .character-name {
    display: inline-block;
    position: relative;
    transform: rotate(-35deg);
    color: #7811C9;
    font-weight: bold;
    font-size: 17px;
  }
  .character-open {
    left: 35px;
    top: 20px
  }
  .character-conscientious {
    left: 35px;
  }
  .character-extraverted {
    left: 15px;
    top: 5px;
   }
  .character-agreeable {
    left: 10px;
    top: 8px;
  }
  .character-neurotic {
    left: 20px;
    top: 12px;
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
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
  }

  .label-bubble-chart-1 {
    position: absolute;
    bottom: 30px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    align-items: center;
    width: 30px;
  }

  .label-bubble-chart-2 {
    position: absolute;
    bottom: 140px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    align-items: center;
    width: 80px;
  }
  @media (max-width: 490px) and (min-width: 470px) {
    .character-name {
      font-size: 16px;
    }
    .character-open {
      left: 20px;
      top: 20px
    }
    .character-conscientious {
      left: 20px;
    }
    .character-extraverted {
      left: 1%;
      top: 5px;
    }
    .character-agreeable {
      left: 1px;
      top: 8px;
    }
    .character-neurotic {
      left: -5px;
      top: 12px;
    }
  }
  @media (max-width: 470px) and (min-width: 450px) {
    .character-name {
      font-size: 15px;
    }
    .character-open {
      left: 20px;
      top: 20px
    }
    .character-conscientious {
      left: 20px;
    }
    .character-extraverted {
      left: 1%;
      top: 5px;
    }
    .character-agreeable {
      left: 1px;
      top: 8px;
    }
    .character-neurotic {
      left: -5px;
      top: 12px;
    }
  }
  @media (max-width: 450px) and (min-width: 415px) {
    .character-name {
      font-size: 14px;
    }
    .character-open {
      left: 20px;
      top: 20px
    }
    .character-conscientious {
      left: 20px;
    }
    .character-extraverted {
      left: 1%;
      top: 5px;
    }
    .character-agreeable {
      left: 1px;
      top: 8px;
    }
    .character-neurotic {
      left: -5px;
      top: 12px;
    }
  }
  @media (max-width: 415px) and (min-width: 405px) {
    .character-name {
      font-size: 13px;
    }
    .character-open {
      left: 25px;
      top: 20px
    }
    .character-conscientious {
      left: 20px;
    }
    .character-extraverted {
      left: 1%;
      top: 5px;
    }
    .character-agreeable {
      left: 0;
      top: 8px;
    }
    .character-neurotic {
      left: 0;
      top: 12px;
    }
  }
  @media (max-width: 450px) and (min-width: 450px) {
    .character-name {
      font-size: 14px;
    }
    .character-open {
      left: 28px;
      top: 20px
    }
    .character-conscientious {
      left: 31px;
    }
    .character-extraverted {
      left: 3%;
      top: 5px;
    }
    .character-agreeable {
      left: 4px;
      top: 8px;
    }
    .character-neurotic {
      left: 10px;
      top: 12px;
    }
  }
  @media (max-width: 375px) and (min-width: 375px) {
    .character-name {
      font-size: 12px;
    }
    .character-open {
      left: 25px;
      top: 20px
    }
    .character-conscientious {
      left: 20px;
      top: 5px;
    }
    .character-extraverted {
      left: 1%;
      top: 7px;
    }
    .character-agreeable {
      left: 0;
      top: 9px;
    }
    .character-neurotic {
      left: 0;
      top: 12px;
    }
  }
  @media (max-width: 405px) and (min-width: 380px) {
    .character-name {
      font-size: 12px;
    }
    .character-open {
      left: 25px;
      top: 20px
    }
    .character-conscientious {
      left: 20px;
      top: 5px;
    }
    .character-extraverted {
      left: 1%;
      top: 7px;
    }
    .character-agreeable {
      left: 0;
      top: 9px;
    }
    .character-neurotic {
      left: 0;
      top: 12px;
    }
  }
  @media (max-width: 380px) and (min-width: 360px) {
    .character-name {
      font-size: 11px;
    }
    .character-open {
      left: 25px;
      top: 20px
    }
    .character-conscientious {
      left: 20px;
      top: 5px;
    }
    .character-extraverted {
      left: 1%;
      top: 7px;
    }
    .character-agreeable {
      left: 0;
      top: 9px;
    }
    .character-neurotic {
      left: 0;
      top: 12px;
    }
  }
  @media (max-width: 359px) and (min-width: 330px) {
    .character-name {
      font-size: 10px;
    }
    .character-open {
      left: 17px;
      top: 20px
    }
    .character-conscientious {
      left: 20px;
      top: 5px;
    }
    .character-extraverted {
      left: 1%;
      top: 7px;
    }
    .character-agreeable {
      left: 0;
      top: 9px;
    }
    .character-neurotic {
      left: 0;
      top: 12px;
    }
  }
  @media (max-width: 330px) and (min-width: 305px) {
    .character-name {
      font-size: 9px;
    }
    .character-open {
      left: 25px;
      top: 20px
    }
    .character-conscientious {
      left: 20px;
      top: 5px;
    }
    .character-extraverted {
      left: 1%;
      top: 7px;
    }
    .character-agreeable {
      left: 0;
      top: 9px;
    }
    .character-neurotic {
      left: 0;
      top: 12px;
    }
  }
  @media (max-width: 305px) and (min-width: 0px) {
    .character-name {
      font-size: 9px;
    }
    .character-open {
      left: 14px;
      top: 20px
    }
    .character-conscientious {
      left: 11px;
      top: 5px;
    }
    .character-extraverted {
      left: -4px;
      top: 7px;
    }
    .character-agreeable {
      left: -9px;
      top: 9px;
    }
    .character-neurotic {
      left: -15px;
      top: 12px;
    }
  }
</style>
