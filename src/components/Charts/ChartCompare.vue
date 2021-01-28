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
        label: '#0077a2',
        border: '#00658a',
        color: '#00bbff',
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
        label: '#e46c0a',
        border: '#ff5600',
        color: '#e46c0a',
      },
      YOU_THINK_ABOUT: {
        label: '#ff5151',
        border: '#ff0008',
        color: 'rgba(255,81,81,0.73)',
      },
    },
    getChartData: {
      grid: {
        left: 1,
        bottom: '3%',
        containLabel: true,
        width: '100%',
      },
      xAxis: {
        max: 4.5,
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
          padding: [0, 0, -30, 150],
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
        if (type === 'YOU_ARE' || type === 'COLLEAGUE') {
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

        return ({
          type: 'scatter',
          symbolSize: 15,
          symbol: 'diamond',
          itemStyle: {
            normal: {
              color,
              borderWidth: 0,
              label: {
                show: true,
                position: 'top',
                formatter(d) {
                  const v = d.value;
                  return v[2];
                },
              },
            },
          },
          emphasis: {
            label: {
              formatter(param) {
                return `${param.value[2]}${param.value[3] ? '\nClick for more details' : ''}`;
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
