<template>
  <div class="chartCompare">
    <div class="diagram__title-with-respondents" v-if="respondentsCount">
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
        Sales:  {{ respondentsCount }}
      </div>
    </div>
    <div class="name-label-chart-top"><b class="chart-label">More Flexible</b></div>
    <div class="name-label-chart-left"><b class="chart-label">Less Stable</b></div>
    <div class="name-label-chart-right"><b class="chart-label">More Stable</b></div>
    <div class="name-label-chart-bottom"><b class="chart-label">Less Flexible</b></div>
    <ECharts
      :option="{...getChartData, series}"
      autoresize
    />
  </div>
</template>

<script>
import 'echarts/lib/chart/scatter';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/map';
import ECharts from 'vue-echarts';
import configEnv from '@configEnv';

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
        color: '#54109a',
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
        boundaryGap: true,
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
        const choseColor = configEnv.charts.chosePointColor;
        const color = data[2] === this.selectedCharateristic[2] ? choseColor
          : this.colorsByType[type].pointColor;

        let labelByPoint;
        if (type === 'EACH_COLLEAGUES' || type === 'COLLEAGUE') {
          labelByPoint = {
            show: true,
            position: 'inside',
            align: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            color,
            formatter(d) {
              const v = d.value;
              return v[2];
            },
          };
        } else {
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
  .name-label-chart-bottom {
    position: absolute;
    text-align: center;
    top: 342px;
    left: 0;
    right: 0;
  }
  .name-label-chart-top {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    top: 20px;
    text-align: center;
  }

  .name-label-chart-left {
    text-align: left;
    position: absolute;
    top: 190px;
    left: 38px;
  }

  .name-label-chart-right {
    text-align: right;
    position: absolute;
    top: 190px;
    right: 38px;
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
  }

  .report__respondents-icon{
    width: 14px;
    height: 17px;
    margin-right: 5px;
  }
</style>
