<template>
  <div>
    <ECharts
      :options="{...getChartData, series}"
      autoresize="true"
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
  data: () => ({
    getChartData: {
      xAxis: {
        max: '10',
        offset: -58,
        axisLabel: false,
        nameGap: 10,
        nameLocation: 'end',
        nameRotate: 270,
        name: 'Flexibility',
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        max: '10',
        axisLabel: false,
        name: 'Stability',
        nameLocation: 'end',
        offset: -256,
        splitLine: {
          show: false,
        },
        axisLine: {
          symbolOffset: [6, 3],
        },
      },
    },
  }),
  computed: {
    series() {
      if (!this.data.length) {
        return [];
      }

      if (this.data[2] !== undefined) {
        return [{
          type: 'scatter',
          symbolSize: 12,
          symbol: 'diamond',
          itemStyle: {
            normal: {
              color: '#CE2900',
              borderWidth: 0,
              label: {
                show: true,
                position: 'bottom',
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
          symbolSize: 12,
          symbol: 'diamond',
          itemStyle: {
            normal: {
              color: '#0077a2',
              borderWidth: 0,
              label: {
                show: true,
                position: 'bottom',
                formatter(data) {
                  const v = data.value;
                  return v[2];
                },
              },
            },
          },
          color: ['#0077a2'],
          data: [(this.data[1]).data],
        }, {
          type: 'scatter',
          symbolSize: 12,
          symbol: 'diamond',
          itemStyle: {
            normal: {
              color: '#dda100',
              borderWidth: 0,
              label: {
                show: true,
                position: 'bottom',
                formatter(data) {
                  const v = data.value;
                  return v[2];
                },
              },
            },
          },
          color: ['#0011dd'],
          data: [(this.data[2]).data],
        }, {
          type: 'scatter',
          symbolSize: 12,
          symbol: 'diamond',
          itemStyle: {
            normal: {
              color: '#0011dd',
              borderWidth: 0,
              label: {
                show: true,
                position: 'bottom',
                formatter(data) {
                  const v = data.value;
                  return v[2];
                },
              },
            },
          },
          color: ['#0011dd'],
          data: [(this.data[3]).data],
        }, {
          type: 'scatter',
          symbolSize: 12,
          symbol: 'diamond',
          itemStyle: {
            normal: {
              color: '#0011dd',
              borderWidth: 0,
              label: {
                show: true,
                position: 'bottom',
                formatter(data) {
                  const v = data.value;
                  return v[2];
                },
              },
            },
          },
          color: ['#dda100'],
          data: [(this.data[4]).data],
        }, {
          type: 'scatter',
          symbolSize: 12,
          symbol: 'diamond',
          itemStyle: {
            normal: {
              color: '#0011dd',
              borderWidth: 0,
              label: {
                show: true,
                position: 'bottom',
                formatter(data) {
                  const v = data.value;
                  return v[2];
                },
              },
            },
          },
          color: ['#0011dd'],
          data: [(this.data[5]).data],
        },
        ];
      }
      return [{
        type: 'scatter',
        symbolSize: 10,
        symbol: 'diamond',
        itemStyle: {
          normal: {
            color: '#CE2900',
            borderWidth: 0,
            label: {
              show: true,
              position: 'bottom',
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
            color: '#0077a2',
            borderWidth: 0,
            label: {
              show: true,
              position: 'bottom',
              formatter(data) {
                const v = data.value;
                return v[2];
              },
            },
          },
        },
        color: ['#0077a2'],
        data: [(this.data[1]).data],
      },
      ];
    },
  },
};
</script>

<style lang="scss">
</style>
