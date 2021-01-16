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
      grid: {
        left: 1,
        bottom: '3%',
        width: '480px',
      },
      xAxis: {
        max: 10,
        min: -4.5,
        axisLabel: false,
        nameLocation: 'end',
        nameRotate: 270,
        name: 'Flexibility',
        nameGap: 10,
        boundaryGap: true,
        nameTextStyle: {
          fontWeight: 'bold',
          fontSize: 15,
          padding: [0, 0, -30, 100],
        },
        offset: -150,
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        max: 8,
        min: -5,
        nameTextStyle: {
          fontWeight: 'bold',
          fontSize: 15,
          padding: [0, 615, 0, 0],
        },
        axisLabel: false,
        name: 'Stability',
        nameLocation: 'end',
        offset: -347,
        splitLine: {
          show: false,
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
          emphasis: {
            label: {
              color: '#ff132e',
              distance: 5,
              fontWeight: 'bold',
              backgroundColor: 'white',
            },
            itemStyle: {
              color: '#ff132e',
              borderColor: '#ce1602',
              borderWidth: 2,
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
          emphasis: {
            label: {
              color: '#007ea7',
              distance: 5,
              fontWeight: 'bold',
              backgroundColor: 'white',
            },
            itemStyle: {
              color: '#00bbff',
              borderColor: '#00658a',
              borderWidth: 2,
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
          emphasis: {
            label: {
              color: '#ffb900',
              distance: 5,
              fontWeight: 'bold',
              backgroundColor: 'white',
            },
            itemStyle: {
              color: '#ffb900',
              borderColor: '#976e00',
              borderWidth: 2,
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
        emphasis: {
          label: {
            color: '#ff132e',
            distance: 5,
            fontWeight: 'bold',
            backgroundColor: 'white',
          },
          itemStyle: {
            color: '#ff132e',
            borderColor: '#ce1602',
            borderWidth: 2,
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
        emphasis: {
          label: {
            color: '#007ea7',
            distance: 5,
            fontWeight: 'bold',
            backgroundColor: 'white',
          },
          itemStyle: {
            color: '#00bbff',
            borderColor: '#00658a',
            borderWidth: 2,
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
