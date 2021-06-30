<template>
  <div class="chartCompare">
    <span class="dashboard-chart-padding"></span>
    <div class="name-label-chart-top"><b class="chart-label">More Flexible</b></div>
    <div class="name-label-chart-left"><b class="chart-label">Less Stable</b></div>
    <div class="name-label-chart-right"><b class="chart-label">More Stable</b></div>
    <div class="name-label-chart-bottom"><b class="chart-label">Less Flexible</b></div>
    <ECharts
      :option="{...getChartData, series}"
      autoresize
      @click="choose"
      ref="chart"
    />
    <span class="dashboard-chart-padding-bottom"></span>
    </div>
</template>

<script>
import 'echarts/lib/chart/scatter';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/map';
import ECharts from 'vue-echarts';
import configEnv from '@configEnv';
import constant from '@constants';

export default {
  components: {
    ECharts,
  },
  props: {
    data: {
      type: Array,
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
    selectedCharateristic: [],
    colorsByType: {
      YOU_ARE: {
        label: '#7811c9',
        border: '#54109a',
        color: 'rgba(90,16,147,0.89)',
      },
      GUESS: {
        label: configEnv.charts.pointColor,
        border: configEnv.charts.pointColor,
        color: configEnv.charts.pointColor,
      },
      NEAREST: {
        label: '#007ea7',
        border: '#00658a',
        color: '#0011dd',
      },
      COLLEAGUE: {
        label: '#ff5151',
        border: '#b43e3e',
        color: '#ff5151',
      },
      GROUP: {
        label: '#ff5151',
        border: '#b43e3e',
        color: '#ff5151',
      },
      YOU_THINK_ABOUT: {
        label: '#7811c9',
        border: '#54109a',
        color: 'rgba(90,16,147,0.89)',
      },
    },
    getChartData: {
      grid: {
        left: 1,
        bottom: '10%',
        top: '13%',
        containLabel: true,
        width: '100%',
        height: '240px',
      },
      xAxis: {
        max: 4.3,
        min: -4.3,
        axisLabel: false,
        nameLocation: 'end',
        nameTextStyle: {
          fontWeight: 'bold',
          fontSize: 15,
        },
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        max: 6,
        min: -6,
        nameTextStyle: {
          fontWeight: 'bold',
          fontSize: 15,
        },
        axisLabel: false,
        nameLocation: 'end',
        splitLine: {
          show: false,
        },
      },
    },
  }),
  computed: {
    series() {
      const xNeutralOffset = 6;
      const yNeutralOffset = 3;

      if (!this.data.length) {
        return [];
      }

      let filter = [];
      const filterResult = [];

      const alignedData = (this.data || []).map(({ data: arr, type }) => ({
        data: [arr[0] - xNeutralOffset, arr[1] - yNeutralOffset, arr[2], arr[3]],
        type,
      }));

      alignedData.forEach(({ data, type }) => {
        if (type === 'YOU_ARE' || type === 'COLLEAGUE'
          || type === 'YOU_THINK_ABOUT' || type === 'GROUP') {
          filter.push({
            data,
            type,
          });
        }
      });
      alignedData.forEach(({ data, type }) => {
        const filter1 = filter.filter(({ data: dataInner }) => {
          // eslint-disable-next-line no-empty
          if (data[0] === dataInner[0] && data[1] === dataInner[1] && type === 'GUESS') {
            return true;
          }
          return false;
        });
        if (filter1.length === 0) {
          filterResult.push({
            data,
            type,
          });
        }
      });
      const chartWidth = Math.min(window.innerWidth - 62, 470);
      let fontSizeLabel = 12;
      let fontSizeLabelFocus = 12;
      if (chartWidth <= 400) {
        fontSizeLabel = 11;
        fontSizeLabelFocus = 11;
      }

      filter = [];
      return filterResult.map(({ data, type }) => {
        const choseColor = configEnv.charts.chosePointColor;
        const color = data[2] === this.selectedCharateristic[2] ? choseColor
          : this.colorsByType[type].color;
        let labelByPoint;
        let positionResult = {};
        let y = '10%';
        let dx = -10;
        if (type === 'YOU_ARE' || type === 'COLLEAGUE'
          || type === 'YOU_THINK_ABOUT' || type === 'GROUP') {
          if (data[1] > 0) {
            y = '10%';
            dx = -10;
          } else if (data[1] < 0) {
            y = '100%';
            dx = 10;
          }

          labelByPoint = {
            show: true,
            position: [8, -28],
            align: 'center',
            color,
            fontSize: fontSizeLabel,
            formatter(d) {
              const v = d.value;
              return v[2];
            },
          };
        } else {
          if (data[1] >= 0 && (data[0] >= -2.16 && data[0] <= 0)) {
            positionResult = {
              position: ['23', '85'],
            };
          }

          if (data[1] <= 0 && (data[0] >= -2.16 && data[0] <= 0)) {
            positionResult = {
              position: ['23', '0'],
            };
          }

          if (data[1] >= 0 && (data[0] <= 2.16 && data[0] >= 0)) {
            positionResult = {
              position: ['23', '85'],
            };
          }
          if ((data[1] <= 0 && (data[0] <= 2.16 && data[0] >= 0))
            || (data[1] === 0 && data[0] === 0)) {
            positionResult = {
              position: ['23', '0'],
            };
          }
          if (data[0] >= 2.16) {
            positionResult = {
              position: ['-50', '33'],
            };
          } else if (data[0] <= -2.16) {
            positionResult = {
              position: ['100', '33'],
            };
          }
          labelByPoint = {
            fontSize: fontSizeLabel,
            show: false,
            position: 'top',
            backgroundColor: configEnv.charts.backGroundColorLabel,
          };
        }

        return ({
          type: 'scatter',
          symbolSize: 15,
          symbol: 'diamond',
          label: labelByPoint,
          itemStyle: {
            normal: {
              color,
              borderWidth: 0,
            },
          },
          emphasis: {
            label: {
              show: true,
              formatter(param) {
                let res = `${param.data[2]}`;
                // eslint-disable-next-line no-unused-expressions
                const oneCharacter = Object.values(constant.cards)
                  .filter(x => x.title === param.value[2]);

                if (oneCharacter[0]) {
                  res += ':\n';
                  oneCharacter[0].detailedCharacteristics.forEach((d) => {
                    res += `${d}\n`;
                  });
                  return `${res}Click for more details`;
                }

                return res;
              },
              color: data[2] === this.selectedCharateristic[2] ? choseColor
                : this.colorsByType[type].label,
              distance: 5,
              fontWeight: 'bold',
              fontSize: fontSizeLabelFocus,
              ...positionResult,
            },
            labelLine: {
              show: false,
            },
            itemStyle: {
              color,
              borderColor: this.colorsByType[type].border,
              borderWidth: 2,
            },
          },
          labelLayout: {
            y,
            dx,
            align: 'center',
            verticalAlign: 'bottom',
            showAbove: true,
            hideOverlap: true,
            moveOverlap: 'shiftX',
          },
          labelLine: {
            show: true,
            smooth: true,
            length2: 23,
            lineStyle: {
              color,
              width: 2,
              type: 'dashed',
            },
          },
          color: [this.colorsByType[type].color],
          data: [data],
        });
      });
    },
  },
  methods: {
    choose(dataObject) {
      // return data only if text is available
      this.updatedChart = false;
      if (!this.updatedChart) {
        if (dataObject.value[3]) {
          this.selectedCharateristic = dataObject.value;
          this.$forceUpdate();
          this.$emit('charateristic-click', dataObject.value);
        }
      }
    },
  },
};
</script>

<style lang="scss">
  .name-label-chart-bottom {
    position: absolute;
    text-align: center;
    bottom: -15px;
    left: 0;
    right: 0;
  }
  .name-label-chart-top {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    top: -18px;
    text-align: center;
  }

  .name-label-chart-left {
    text-align: left;
    position: absolute;
    top: 160px;
  }

  .name-label-chart-right {
    text-align: right;
    position: absolute;
    top: 160px;
    right: 0;
  }

  .chartCompare {
    position: relative;
    margin-top: 20px;
    margin-bottom: 19px;
  }
</style>
