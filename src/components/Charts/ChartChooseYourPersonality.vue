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
          width: '450px',
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
          symbolSize: 9,
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
            itemStyle: {
              color: '#ce7c2c',
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
