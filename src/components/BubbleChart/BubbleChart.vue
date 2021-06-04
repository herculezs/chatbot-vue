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

    <span class="character-name character-open" :class="{lowPosition: !twoChart}">Open</span>
    <span class="character-name character-conscientious" :class="{lowPosition: !twoChart}">
      Conscientious
    </span>
    <span class="character-name character-extraverted" :class="{lowPosition: !twoChart}">
      Extraverted
    </span>
    <span class="character-name character-agreeable" :class="{lowPosition: !twoChart}">
      Agreeable
    </span>
    <span class="character-name character-neurotic" :class="{lowPosition: !twoChart}">
      Neurotic
    </span>

    <VueECharts
      :option="getChartData"
      autoresize
      @click="choose"
      ref="chart"
    />
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
  .character-name {
    display: inline-block;
    position: relative;
    top: 10px;
    transform: rotate(-35deg);
    color: #7811C9;
    font-weight: bold;
    font-size: 17px;
  }
  .character-open {
    left: 35px;
  }
  .character-conscientious {
    left: 35px;
  }
  .character-extraverted {
    left: 15px;
   }
  .character-agreeable {
    left: 10px;
  }
  .character-neurotic {
    left: 20px;
  }
  .lowPosition {
    top: 50px;
  }
  .shadow1 {
    background: #ccc;
    border-radius: 100px/50px;
    display: inline-block;
    width: 40px;
    height: 20px;
    bottom: 100px;
    right: 385px;
    position: absolute;
  }
  .shadow2 {
    background: #ccc;
    border-radius: 100px/50px;
    display: inline-block;
    width: 40px;
    height: 20px;
    right: 310px;
    bottom: 100px;
    position: absolute;
  }
  .shadow3 {
    background: #ccc;
    border-radius: 100px/50px;
    display: inline-block;
    width: 40px;
    height: 20px;
    right: 230px;
    bottom: 100px;
    position: absolute;
  }
  .shadow4 {
    background: #ccc;
    border-radius: 100px/50px;
    display: inline-block;
    width: 40px;
    height: 20px;
    right: 155px;
    bottom: 100px;
    position: absolute;
  }
  .shadow5 {
    background: #ccc;
    border-radius: 100px/50px;
    display: inline-block;
    width: 40px;
    height: 20px;
    right: 75px;
    bottom: 100px;
    position: absolute;
  }
  .shadow6 {
    background: #9CD6C0;
    border-radius: 100px/50px;
    display: inline-block;
    width: 40px;
    height: 20px;
    position: absolute;
  }
  .shadow7 {
    background: #9CD6C0;
    border-radius: 100px/50px;
    display: inline-block;
    width: 40px;
    height: 20px;
    position: absolute;
  }
  .shadow8 {
    background: #9CD6C0;
    border-radius: 100px/50px;
    display: inline-block;
    width: 40px;
    height: 20px;
    position: absolute;
  }
  .shadow9 {
    background: #9CD6C0;
    border-radius: 100px/50px;
    display: inline-block;
    width: 40px;
    height: 20px;
    position: absolute;
  }
  .shadow10 {
    background: #9CD6C0;
    border-radius: 100px/50px;
    display: inline-block;
    width: 40px;
    height: 20px;
    position: absolute;
  }
  .shadow-main-position {
    left: 70px;
  }
</style>
