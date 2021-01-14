<template>
  <div class="personality-type">
    <Content >
      <h1 class="h5">
        Which personality type do you think best represents how you see yourself?
      </h1>

      <h1 class="h5">
        Stability
      </h1>
      <ChartChooseYourPersonality :data="chartOptionsBar" @choose="ChartOptionBarData"
      ></ChartChooseYourPersonality>
      <button
        @click.prevent="choose"
        class="button button_w-100 button_theme-default button_size-m"
      >
        Choose
      </button>
    </Content>
  </div>
</template>

<script>
// import PersonalityCarousel from '@components/PersonalityCarousel/PersonalityCarousel.vue';
import Content from '@components/Content/Content.vue';
import ChartChooseYourPersonality from '@components/Charts/ChartChooseYourPersonality.vue';


export default {
  components: {
    ChartChooseYourPersonality,
    Content,
  },
  data: () => ({

    chartOptionsBar: [
      {
        value: [],
        data: [
          {
            name: 'Insensitive',
            value: [3, 0],
            label: {
              color: '#009dce',
            },
            itemStyle: {
              color: '#009dce',
            },
          },
          {
            name: 'Aloof',
            value: [3, 2],
            label: {
              color: '#009dce',
            },
            itemStyle: {
              color: '#009dce',
            },
          },
          {
            name: 'Apathetic',
            value: [3, 4.15],
            label: {
              color: '#009dce',
            },
            itemStyle: {
              color: '#009dce',
            },
          },
          {
            name: 'Discreet',
            value: [3.15, 6.15],
            label: {
              color: '#009dce',
            },
            itemStyle: {
              color: '#009dce',
            },
          },
          {
            name: 'Compassionate',
            value: [2.85, 5.85],
            label: {
              color: '#009dce',
            },
            itemStyle: {
              color: '#009dce',
            },
          },
          {
            name: 'Eccentric',
            value: [4, 0],
            label: {
              color: '#009dce',
            },
            itemStyle: {
              color: '#009dce',
            },
          },
          {
            name: 'Suspicious',
            value: [4, 1],
            label: {
              color: '#009dce',
            },
            itemStyle: {
              color: '#009dce',
            },
          },
          {
            name: 'Self-critical',
            value: [4, 3.15],
            label: {
              color: '#009dce',
            },
            itemStyle: {
              color: '#009dce',
            },
          },
          {
            name: 'Anxious',
            value: [4.15, 4.15],
            label: {
              color: '#009dce',
            },
            itemStyle: {
              color: '#009dce',
            },
          },
          {
            name: 'Perfectionist',
            value: [3.85, 3.85],
            label: {
              color: '#009dce',
            },
            itemStyle: {
              color: '#009dce',
            },
          },
          {
            name: 'Determined',
            value: [4, 7],
            label: {
              color: '#009dce',
            },
            itemStyle: {
              color: '#009dce',
            },
          },
          {
            name: 'Procrastinator',
            value: [5, -1],
            label: {
              color: '#009dce',
            },
            itemStyle: {
              color: '#009dce',
            },
          },
          {
            name: 'Isolated',
            value: [5, 2.85],
            label: {
              color: '#009dce',
            },
            itemStyle: {
              color: '#009dce',
            },
          },
          {
            name: 'Humble',
            value: [5, 5],
            label: {
              color: '#009dce',
            },
            itemStyle: {
              color: '#009dce',
            },
          },
          {
            name: 'Responsible',
            value: [5, 6],
            label: {
              color: '#009dce',
            },
            itemStyle: {
              color: '#009dce',
            },
          },
          {
            name: 'Active',
            value: [6, -2],
            label: {
              color: '#009dce',
            },
            itemStyle: {
              color: '#009dce',
            },
          },
          {
            name: 'Unsatisfied',
            value: [6, 2],
            label: {
              color: '#009dce',
            },
            itemStyle: {
              color: '#009dce',
            },
          },
          {
            name: 'Neutral',
            value: [6, 3],
            label: {
              color: '#009dce',
            },
            itemStyle: {
              color: '#009dce',
            },
          },
          {
            name: 'Productive',
            value: [6, 4],
            label: {
              color: '#009dce',
            },
            itemStyle: {
              color: '#009dce',
            },
          },
          {
            name: 'Calm',
            value: [6, 8],
            label: {
              color: '#009dce',
            },
            itemStyle: {
              color: '#009dce',
            },
          },
          {
            name: 'Unemotional',
            value: [7, 0],
            label: {
              color: '#009dce',
            },
            itemStyle: {
              color: '#009dce',
            },
          },
          {
            name: 'Self-centred',
            value: [7, 1],
            label: {
              color: '#009dce',
            },
            itemStyle: {
              color: '#009dce',
            },
          },
          {
            name: 'Positive',
            value: [7, 7],
            label: {
              color: '#009dce',
            },
            itemStyle: {
              color: '#009dce',
            },
          },
          {
            name: 'Impulsive',
            value: [8, -1],
            label: {
              color: '#009dce',
            },
            itemStyle: {
              color: '#009dce',
            },
          },
          {
            name: 'Autonomous',
            value: [8.15, 2.15],
            label: {
              color: '#009dce',
            },
            itemStyle: {
              color: '#009dce',
            },
          },
          {
            name: 'Patient',
            value: [7.85, 1.85],
            label: {
              color: '#009dce',
            },
            itemStyle: {
              color: '#009dce',
            },
          },
          {
            name: 'Optimistic',
            value: [8, 3.85],
            label: {
              color: '#009dce',
            },
            itemStyle: {
              color: '#009dce',
            },
          },
          {
            name: 'Trusting',
            value: [8, 5],
            label: {
              color: '#009dce',
            },
            itemStyle: {
              color: '#009dce',
            },
          },
          {
            name: 'Practical',
            value: [8, 6],
            label: {
              color: '#009dce',
            },
            itemStyle: {
              color: '#009dce',
            },
          },
          {
            name: 'Lively',
            value: [9.15, 0.15],
            label: {
              color: '#009dce',
            },
            itemStyle: {
              color: '#009dce',
            },
          },
          {
            name: 'Harsh',
            value: [8.85, -0.2],
            label: {
              color: '#009dce',
            },
            itemStyle: {
              color: '#009dce',
            },
          },
          {
            name: 'Uninhibited',
            value: [9, 1.85],
            label: {
              color: '#009dce',
            },
            itemStyle: {
              color: '#009dce',
            },
          },
          {
            name: 'Engaged',
            value: [9, 2.85],
            label: {
              color: '#009dce',
            },
            itemStyle: {
              color: '#009dce',
            },
          },
          {
            name: 'Sociable',
            value: [9, 4],
            label: {
              color: '#009dce',
            },
            itemStyle: {
              color: '#009dce',
            },
          },
          {
            name: 'Outgoing',
            value: [9, 5],
            label: {
              color: '#009dce',
            },
            itemStyle: {
              color: '#009dce',
            },
          },
        ],
      },
    ],
  }),
  methods: {
    choose() {
      const formData = {
        selfPersonalityType: this.chartOptionsBarData,
      };
      console.log(formData);

      this.$store.dispatch('auth/setSelfPersonalityTypeRequest', formData)
        .then(() => {
          this.$router.push('report');
        });
    },
    ChartOptionBarData(data) {
      console.log('CHOOOOSEEE', data.yourChoose);
      this.chartOptionsBarData = data.yourChoose;
    },
    // changeSlide(numberSlide) {
    //   this.currentSlide = numberSlide;
    // },
  },
};
</script>


<style lang="scss">
</style>
