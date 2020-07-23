<template>
  <div class="report">
    <h1 class="h4 text-center mb-1">Well done John!</h1>
    <h2 class="text mb-5 text-center">Here’s your first report</h2>

    <div class="report-notifications">
      To keep respones private (and honest), I will wait until I have recieved at
      least 4 responses, I will send you their answers and update you as I receive more.
    </div>
    <div class="diagram__title-with-respondents mb-3">
      <h3 class="h5 m-0">Report</h3>
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
        Respondents:  {{ respondentsCount }}
      </div>
    </div>

    <div class="diagram">
      <ECharts
        :options="pie"
        ref="pie"
        autoresize
      />
    </div>

    <div class="h5 mb-4">
      You think you are
    </div>
    <Card
      :title="cardData.debator.title"
      :img="cardData.debator.img"
      :showText="cardData.debator.showText"
      :hideText="cardData.debator.hideText"
    />

    <div class="h5 mb-4">
      Based on your answers you are
    </div>
    <Card
      :title="cardData.debator.title"
      :showText="cardData.debator.showText"
      :hideText="cardData.debator.hideText"
      :img="cardData.debator.img"
      :defaultOpen="true"
    />

    <b-modal
      id="modal-multi-1"
      hide-footer
      >
      <template v-slot:modal-title>
        Share with friends
      </template>
      <p class="text mb-3">
        Well John, it’s time to find out what your friends think about your personality.
      </p>
      <p class="text mb-4">
        Send this link to as many people as you like.
        Remember the wisdom of crowd; the more people you send it to the wiser the result!
      </p>
      <InputCopy class="mb-4" />
      <p class="text mb-5">
        or you can share on your social networks
      </p>
      <Share />
    </b-modal>

    <button v-b-modal.modal-multi-1 class="button button_w-100 button_theme-default button_size-m">
      Share With Friends
    </button>

  </div>
</template>

<script>
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/map';
import 'echarts/lib/component/legend';
import ECharts from 'vue-echarts';
import Card from '@components/Card/Card.vue';
import InputCopy from '@components/InputCopy/InputCopy.vue';
import Share from '@components/Share/Share.vue';

export default {
  components: {
    ECharts,
    Card,
    InputCopy,
    Share,
  },
  name: 'Report',
  data: () => ({
    respondentsCount: 6,
    cardData: {
      debator: {
        title: 'Debator',
        img: '/img/defender.svg',
        showText: 'Flexible and charming '
          + 'artists, always ready to explore and experience something new.\n'
          + '          Flexible and charming artists, always ready '
          + 'to explore and experience something new.',
        hideText: 'Flexible and charming artists, '
          + 'always ready to explore and experience something new.\n'
          + '            Flexible and charming artists, '
          + 'always ready to explore and experience something new.\n'
          + '            Flexible and charming artists.',
      },
    },
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
    margin: 0 -24px 16px;
    background-color: #fff;
    padding: 0 24px;
    position: relative;
    /*&:after{*/
    /*  content: '';*/
    /*  display: block;*/
    /*  width: 100%;*/
    /*  height: 1px;*/
    /*  background-color: #e9eaf0;*/
    /*  position: absolute;*/
    /*  left: 0;*/
    /*  top: 245px;*/
    /*}*/
    .echarts{
      width: 100%;
      height: 310px;
    }
  }
  .report__respondents{
    color: $txtColor3;
    font-family: $defaultFont;
    font-size: 14px;
    letter-spacing: 0;
    line-height: 17px;
    display: flex;
    align-items: center;
  }
  .report__respondents-icon{
    width: 14px;
    height: 17px;
    margin-right: 5px;
  }
  .diagram__title-with-respondents{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .report-notifications{
    padding: 16px;
    border: 1px solid #ddd;
    font-family: $defaultFont;
    font-size: 14px;
    line-height: 16px;
    color: $txtColor2;
    border-radius: 4px;
    margin-bottom: 30px;
  }
</style>
