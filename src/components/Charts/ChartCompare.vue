<template>
  <div>
    <ECharts
      :options="{...getChartData, series}"
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
  data: () => ({
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
        bottom: '3%',
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

      filter = [];
      return filterResult.map(({ data, type }) => {
        const choseColor = '#0077a2';
        const color = data[2] === this.selectedCharateristic[2] ? choseColor
          : this.colorsByType[type].color;
        let labelByPoint;

        if (type === 'YOU_ARE' || type === 'COLLEAGUE'
          || type === 'YOU_THINK_ABOUT' || type === 'GROUP') {
          labelByPoint = {
            show: true,
            position: 'top',
            formatter(d) {
              const v = d.value;
              return v[2];
            },
          };
        } else {
          labelByPoint = {
            show: false,
            position: 'top',
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
              backgroundColor: 'white',
            },
            itemStyle: {
              color,
              borderColor: this.colorsByType[type].border,
              borderWidth: 2,
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
      if (dataObject.value[3]) {
        this.selectedCharateristic = dataObject.value;
        this.$forceUpdate();
        this.$emit('charateristic-click', dataObject.value);
      }
    },
  },
};
</script>

<style lang="scss">
</style>
