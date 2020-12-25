<template>
  <div>
    <ECharts
      :options="getChartData"
      autoresize
    />
  </div>
</template>

<script>
import 'echarts/lib/chart/scatter';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/map';
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
    getChartData() {
      return {
        grid: {
          left: '3%',
          right: '7%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          min: '-15',
          max: '15',
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          min: '-15',
          max: '15',
          splitLine: {
            show: false,
          },
        },
        series: [{
          symbolSize: 8,
          symbol: 'diamond',
          color: ['#009dce'],
          itemStyle: {
            normal: {
              color: 'black',
              borderWidth: 0,
              label: {
                show: true,
                position: 'right',
                formatter(data) {
                  const v = data.value;
                  return v[2];
                },
              },
            },
          },
          data: (this.data[0]).data,
          type: 'scatter',
        }],
      };
    },
  },
};
</script>

<style lang="scss">
</style>
