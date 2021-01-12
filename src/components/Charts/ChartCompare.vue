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
    series() {
      let ser;
      if (this.data[2] !== undefined) {
        ser = [{
          type: 'scatter',
          symbolSize: 10,
          symbol: 'diamond',
          itemStyle: {
            normal: {
              color: '#CE2900',
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
          color: ['#CE2900'],
          data: [(this.data[0]).data],
        }, {
          type: 'scatter',
          symbolSize: 10,
          symbol: 'diamond',
          itemStyle: {
            normal: {
              color: '#009dce',
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
          color: ['#009dce'],
          data: [(this.data[1]).data],
        }, {
          type: 'scatter',
          symbolSize: 10,
          symbol: 'diamond',
          itemStyle: {
            normal: {
              color: '#ffc000',
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
          color: ['#ffc000'],
          data: [(this.data[2]).data],
        },
        ];
      } else {
        ser = [{
          type: 'scatter',
          symbolSize: 10,
          symbol: 'diamond',
          itemStyle: {
            normal: {
              color: '#CE2900',
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
          color: ['#CE2900'],
          data: [(this.data[0]).data],
        }, {
          type: 'scatter',
          symbolSize: 10,
          symbol: 'diamond',
          itemStyle: {
            normal: {
              color: '#009dce',
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
          color: ['#009dce'],
          data: [(this.data[1]).data],
        },
        ];
      }
      return ser;
    },
    getChartData() {
      return {
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
        series: this.series,
      };
    },
  },
};
</script>

<style lang="scss">
</style>
