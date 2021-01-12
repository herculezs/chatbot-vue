<template>
  <div>
    <ECharts
      :options="getChartData"
      autoresize
      @click="choose"
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
  data() {
    return {
      yourChoose: '',
      color: '',
    };
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
          max: '10',
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          max: '10',
          splitLine: {
            show: false,
          },
        },
        series: [{
          id: 'point',
          symbolSize: 8,
          symbol: 'diamond',
          color: '#009dce',
          itemStyle: {
            normal: {
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
  methods: {
    choose(data) {
      // eslint-disable-next-line no-undef,eqeqeq,no-param-reassign
      console.log(this.getChartData.series[0].color);
      // eslint-disable-next-line no-param-reassign
      this.getChartData.series.color = 'green';
      this.$emit('choose', {
        yourChoose: (data.value[2]).toLowerCase(),
      });
    },
  },
};
</script>

<style lang="scss">
</style>
