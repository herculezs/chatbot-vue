<template>
  <div>
    <ECharts
      :options="getRadarData"
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
import 'echarts/lib/chart/radar';
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
    getRadarData() {
      return {
        tooltip: {},
        radar: {
          name: {
            textStyle: {
              color: '#838585',
              fontSize: '12px',
            },
          },
          indicator: [
            { text: 'Empathy', max: 5 },
            { text: 'Self-sufficience', max: 5 },
            { text: 'Stability', max: 5 },
            { text: 'Dominance', max: 5 },
            { text: 'Spontaneity', max: 5 },
            { text: 'Conformity', max: 5 },
            { text: 'Audacity', max: 5 },
            { text: 'Sensitivity', max: 5 },
            { text: 'Trust', max: 5 },
            { text: 'Originality', max: 5 },
            { text: 'Warmth', max: 5 },
            { text: 'Confidence', max: 5 },
            { text: 'Logic', max: 5 },
            { text: 'Privacy', max: 5 },
            { text: 'Perfectionism', max: 5 },
            { text: 'Patience', max: 5 },
          ],
          splitArea: {
            areaStyle: {
              color: '#d2aeed',
            },
          },
          axisLine: {
            lineStyle: {
              color: '#dac9e6',
            },
          },
          splitLine: {
            lineStyle: {
              color: '#d2aeed',
            },
          },
        },
        series: [{
          type: 'radar',
          data: this.data,
        }],
      };
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
