<template>
  <div class="report">
    <div class="h4 text-center">Well done John!</div>
    <div class="text text-center">Here’s your first report</div>
    <div class="h5">Report</div>
    <div class="diagram">
      <ECharts
        :options="pie"
        ref="pie"
        autoresize
      />
    </div>
    <div class="h5">
      You think you are
    </div>
    <div class="cart">
      <div class="h5 cart__title">
        Debator
      </div>
    </div>
    <div class="h5">
      Based on your answers you are
    </div>
    <div class="cart">
      <div class="h5 text-center">
        Debator
      </div>
      <div class="cart-info" ref="container">
        <div class="cart-info__text">
          Flexible and charming artists, always ready to explore and experience something new.
          Flexible and charming artists, always ready to explore and experience something new.
        </div>
        <div class="cart-info__text" v-show="showMore">
          Flexible and charming artists, always ready to explore and experience something new.
          Flexible and charming artists, always ready to explore and experience something new.
          Flexible and charming artists.
        </div>
      </div>
      <button
        class="cart__button-show-more button button_w-100 button_size-m button_theme-transparent"
        @click.prevent="showMore = !showMore"
      >
        Show {{ showMore ? 'Less' : 'More' }}
      </button>
    </div>
    <button class="button button_w-100 button_theme-default button_size-m">
      Share With Friends
    </button>
  </div>
</template>

<script>
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/map';
import 'echarts/lib/chart/radar';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/chart/effectScatter';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/polar';
import 'echarts/lib/component/geo';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/dataset';
import 'echarts/map/js/world';
import ECharts from 'vue-echarts';
import smoothHeight from 'vue-smooth-height';

export default {
  mixins: [smoothHeight],
  components: {
    ECharts,
  },
  name: 'Report',
  mounted() {
    this.$smoothElement({
      el: this.$refs.container,
      childTransitions: false,
    });
  },
  data: () => ({
    showMore: false,
    pie: {
      legend: {
        type: 'plain',
        bottom: 10,
        icon: 'circle',
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 12,
        left: 0,
      },
      series: [
        {
          type: 'pie',
          radius: '70%',
          center: ['50%', '44%'],
          selectedMode: 'single',
          data: [
            {
              value: 335,
              name: 'Stability',
              itemStyle: {
                color: '#009AF0',
              },
            },
            {
              value: 310,
              name: 'Privacy',
              itemStyle: {
                color: '#16F8DA',
              },
            },
            {
              value: 274,
              name: 'Logic',
              itemStyle: {
                color: '#506977',
              },
            },
            {
              value: 150,
              name: 'Patience',
              itemStyle: {
                color: '#5F23FD',
              },
            },
            {
              value: 500,
              name: 'Yellow',
              itemStyle: {
                color: '#F5D30A',
              },
            },
          ].sort((a, b) => a.value - b.value),
          roseType: 'radius',
          label: false,
        },
      ],
    },
  }),
  computed: {},
  methods: {},
};
</script>

<style lang="scss">
  .diagram{
    margin: 0 -24px;
    background-color: #fff;
    padding: 0 24px;
    position: relative;
    &:after{
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background-color: #e9eaf0;
      position: absolute;
      left: 0;
      bottom: 40px;
    }
    .echarts{
      width: 100%;
      height: 310px;
    }
  }

  .cart{
    padding: 24px;
    border-radius: 8px;
    background: linear-gradient(0deg, #EEFBF4 0%, rgba(238,251,244,0) 100%);
    box-shadow: 0 8px 24px 0 rgba(140,180,160,0.48);
    margin-bottom: 32px;
    overflow: hidden;
  }
  .cart__title{
    margin: 0;
  }
  .cart-info__text{
    text-align: center;
    color: $txtColor2;
    font-family: $defaultFont;
    font-size: 16px;
    letter-spacing: 0;
    line-height: 24px;
    padding-bottom: 24px;
    &:last-child{
      padding-bottom: 0;
    }
  }
  .cart__button-show-more{
    margin-bottom: -24px;
  }
</style>
