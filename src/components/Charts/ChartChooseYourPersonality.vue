<template>
  <div>
    <ECharts
      :options="getChartData"
      autoresize="true"
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
      getChartData: {
        grid: {
          left: 1,
          bottom: '3%',
          width: '470px',
          containLabel: true,
        },
        xAxis: {
          nameTextStyle: {
            padding: [0, 0, -16, 200],
            fontWeight: 'bold',
            fontSize: 15,
          },
          min: 2,
          offset: -138,
          axisLabel: false,
          max: '10',
          nameGap: 10,
          nameLocation: 'end',
          nameRotate: 270,
          name: 'Flexibility',
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          nameTextStyle: {
            padding: [0, 390, 0, 0],
            fontWeight: 'bold',
            fontSize: 15,
          },
          max: '10',
          axisLabel: false,
          offset: -235,
          name: 'Stability',
          nameLocation: 'end',
          splitLine: {
            show: false,
          },
        },
        series: [{
          id: 'point',
          symbolSize: 15,
          symbol: 'diamond',
          color: '#009dce',
          itemStyle: {
            normal: {
              borderWidth: 0,
              label: {
                show: true,
                position: 'top',
                formatter(data) {
                  return data.name;
                },
              },
            },
          },
          emphasis: {
            label: {
              formatter(param) {
                let res = `${param.data.name}:\n`;

                param.data.detailedCharacteristics.forEach((data) => {
                  res += `${data}\n`;
                });

                return res;
              },
              color: '#ce7c2c',
              distance: 5,
              fontWeight: 'bold',
              backgroundColor: 'white',
            },
            itemStyle: {
              color: '#ce7c2c',
              borderColor: '#ce1602',
              borderWidth: 2,
            },
          },
          data: (this.data[0]).data,
          type: 'scatter',
        }],
      },
    };
  },
  props: {
    data: {
      type: Array,
    },
  },
  computed: {

  },
  methods: {
    choose(dataObject) {
      const b = this.data[0].data.map((d) => {
        if (dataObject.name === d.name) {
          return {
            name: d.name,
            value: d.value,
            detailedCharacteristics: d.detailedCharacteristics,
            label: {
              color: '#CE001D',
            },
            itemStyle: {
              color: '#CE001D',
            },
          };
        }
        return {
          ...d,
        };
      });

      this.getChartData.series[0].data = b;


      this.$forceUpdate();
      this.$emit('choose', {
        yourChoose: (dataObject.name),
      });
    },
  },
};
</script>

<style lang="scss">
</style>
