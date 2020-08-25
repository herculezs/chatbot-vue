<template>
  <ECharts
    :options="getRadarData"
    autoresize
  />
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
