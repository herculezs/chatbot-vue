<template>
  <div class="chartCompare chartCompareType">
    <div class="diagram__title-with-respondents">
      <div class="report__respondents">
        <svg class="report__respondents-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.42 15.93">
          <circle
            fill="none"
            stroke="#999"
            stroke-miterlimit="10"
            cx="6.21"
            cy="4"
            r="3.91"/>
          <path
            fill="none" stroke="#999" stroke-miterlimit="10"
            d="M2.29,16a5.71,5.71,0,0,1,11.34-.92,5.62,5.62,0,0,1,.08.92"
            transform="translate(-1.79 -0.07)"
          />
        </svg>
        <b>Sales:
          <span v-if="respondentsCount">{{ respondentsCount }}</span><span v-else> 0</span>
        </b>
      </div>
    </div>
    <div class="name-label-chart-top-d"><b class="chart-label">More Flexible</b></div>
    <div class="name-label-chart-left-d"><b class="chart-label">Less Stable</b></div>
    <div class="name-label-chart-right-d"><b class="chart-label">More Stable</b></div>
    <div class="name-label-chart-bottom-d"><b class="chart-label">Less Flexible</b></div>
    <ECharts
      :option="{...getChartData, series}"
      ref="chart"
      autoresize
    />
    <div class="padding"><br/></div>
  </div>
</template>

<script>
import 'echarts/lib/chart/scatter';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/map';
import ECharts from 'vue-echarts';
import configEnv from '@configEnv';
import constant from '@constants/index';

export default {
  components: {
    ECharts,
  },
  props: {
    data: {
      type: Array,
    },
    respondentsCount: {
      type: Number,
    },
  },
  data: () => ({
    selectedCharateristic: [],
    colorsByType: {
      GUESS: {
        label: configEnv.charts.pointColor,
        border: configEnv.charts.pointColor,
        color: configEnv.charts.pointColor,
        pointColor: configEnv.charts.pointColor,
      },
      EACH_COLLEAGUES: {
        label: '#7811c9',
        border: '#54109a',
        color: '#FF0100',
        colorPoint: configEnv.charts.pointColor,
      },
    },
    getChartData: {
      grid: {
        left: 1,
        bottom: '10%',
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
  beforeUpdate() {
    this.$refs.chart.clear();
  },
  methods: {
    checkPosition(data) {
      let positionResult;
      if (data[1] >= 0 && (data[0] >= -2.16 && data[0] <= 0)) {
        positionResult = {
          position: ['10', '20'],
        };
      }

      if (data[1] <= 0 && (data[0] >= -2.16 && data[0] <= 0)) {
        positionResult = {
          position: ['10', '-60'],
        };
      }

      if (data[1] >= 0 && (data[0] <= 2.16 && data[0] >= 0)) {
        positionResult = {
          position: ['10', '20'],
        };
      }
      if ((data[1] <= 0 && (data[0] <= 2.16 && data[0] >= 0))
        || (data[1] === 0 && data[0] === 0)) {
        positionResult = {
          position: ['10', '-60'],
        };
      }
      if (data[0] >= 2.16) {
        positionResult = {
          position: ['-36', '-10'],
        };
      } else if (data[0] <= -2.16) {
        positionResult = {
          position: ['65', '-10'],
        };
      }
      return positionResult;
    },
  },
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
        if (type === 'EACH_COLLEAGUES') {
          filter.push({
            data,
            type,
          });
        }
      });
      alignedData.forEach(({ data, type }) => {
        const filter1 = filter.filter(({ data: dataInner }) => data[0] === dataInner[0] && data[1] === dataInner[1] && type === 'GUESS');
        if (filter1.length === 0) {
          filterResult.push({
            data,
            type,
          });
        }
      });
      filter = [];
      return filterResult.map(({ data, type }) => {
        let positionResult;
        const choseColor = configEnv.charts.chosePointColor;
        const color = data[2] === this.selectedCharateristic[2] ? choseColor
          : this.colorsByType[type].pointColor;

        let labelByPoint;
        if (type === 'EACH_COLLEAGUES' || type === 'COLLEAGUE') {
          labelByPoint = {
            show: true,
            position: 'inside',
            align: 'center',
            fontSize: 16,
            fontWeight: 'bold',
            color,
            formatter(d) {
              const v = d.value;
              return v[3];
            },
          };
          positionResult = this.checkPosition(data);
        } else {
          positionResult = this.checkPosition(data);
          labelByPoint = {
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
          emphasis: {
            label: {
              show: true,
              formatter(param) {
                let res = `${param.data[2]}`;
                const oneCharacter = Object.values(constant.cards)
                  .filter(x => x.title === param.value[2]);

                if (oneCharacter[0]) {
                  res += ':';
                  oneCharacter[0].detailedCharacteristics.forEach((d) => {
                    res += `\n${d}`;
                  });
                }

                return res;
              },
              color: configEnv.charts.pointColor,
              fontWeight: 'bold',
              backgroundColor: configEnv.charts.backGroundColorLabel,
              fontSize: 12,
              align: 'center',
              ...positionResult,
            },
          },
          itemStyle: {
            normal: {
              color: this.colorsByType[type].color,
              borderWidth: 0,
            },
          },
          data: [data],
        });
      });
    },
  },
};
</script>

<style lang="scss">
  .name-label-chart-bottom-d {
    position: absolute;
    text-align: center;
    top: 299px;
    left: 0;
    right: 0;
  }
  .name-label-chart-top-d {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    top: 5px;
    text-align: center;
  }

  .name-label-chart-left-d {
    text-align: left;
    position: absolute;
    top: 146px;
    left: 5px;
  }

  .name-label-chart-right-d {
    text-align: right;
    position: absolute;
    top: 146px;
    right: 5px;
  }

  .chartCompare {
    margin-top: 30px;
  }
  .diagram__title-with-respondents{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .report__respondents{
    color: $txtColor3;
    font-family: $defaultFont;
    font-size: 14px;
    letter-spacing: 0;
    line-height: 17px;
    display: flex;
    align-items: center;
    margin-left: auto;
    padding-top: 6px;
    float: right;
    padding-right: 10px;
  }

  .report__respondents-icon{
    width: 14px;
    height: 17px;
    margin-right: 5px;
  }
  .padding {
    margin-top: 15px;
  }
</style>
