<template>
  <div class="personality-type">
    <Content >
      <h1 class="h5">
        Which personality type do you think best represents how you see yourself?
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
            detailedCharacteristics: ['Reserved', 'Unsociable', 'Acquisitive'],
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
            detailedCharacteristics: ['Loner', 'Distant', 'Reserved'],
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
            detailedCharacteristics: ['Passive', 'Indifferent', 'Quiet'],
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
            detailedCharacteristics: ['Unassuming', 'Hard-working', 'Humble'],
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
            detailedCharacteristics: ['Sympathetic', 'Principled', 'Disciplined'],
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
            detailedCharacteristics: ['Detached', 'Unconventional', 'Closed'],
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
            detailedCharacteristics: ['Anxious', 'Skeptical', 'Disconnected'],
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
            detailedCharacteristics: ['Pessimistic', 'Judgemental', 'Cynical'],
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
            detailedCharacteristics: ['Reliant', 'Compliant', 'Fearful'],
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
            detailedCharacteristics: ['Focussed', 'Rule-following', 'Possessive'],
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
            detailedCharacteristics: ['Resolute', 'Logical', 'Grounded'],
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
            detailedCharacteristics: ['Deferrer', 'Stubborn', 'Obstructive'],
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
            detailedCharacteristics: ['Shy', 'Anxious', 'Sensitive'],
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
            detailedCharacteristics: ['Trusting', 'Forgiving', 'Modest'],
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
            detailedCharacteristics: ['Diligent', 'Trustworthy', 'Self-conscious'],
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
            detailedCharacteristics: ['Inattentive', 'Impulsive', 'Uncontrolled'],
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
            detailedCharacteristics: ['Disappointed', 'Selfless', 'Puritannical'],
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
            detailedCharacteristics: ['Balanced', 'Centred', 'Even'],
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
            detailedCharacteristics: ['Creative', 'Mysterious', 'Deliberate'],
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
            detailedCharacteristics: ['Imperturbable', 'Serene', 'Composed'],
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
            detailedCharacteristics: ['Irritable', 'Combative', 'Calculating'],
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
            detailedCharacteristics: ['Self-absorbed', 'Indifference', 'Overly proud'],
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
            detailedCharacteristics: ['Resilient', 'Straightforward', 'Diligent'],
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
            detailedCharacteristics: ['Detached', 'Fiery', 'Frustrated'],
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
            detailedCharacteristics: ['Confident', 'Bold', 'Decisive'],
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
            detailedCharacteristics: ['Relaxed', 'Creative', 'Free-Spirited'],
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
            detailedCharacteristics: ['Encouraging', 'Friendly', 'Cheerful'],
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
            detailedCharacteristics: ['Unsuspecting', 'Warm', 'Direct'],
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
            detailedCharacteristics: ['Level-Headed', 'Charismatic', 'Certain'],
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
            detailedCharacteristics: ['Enthusiastic', 'Vivacious', 'Expressive'],
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
            detailedCharacteristics: ['Ruthless', 'Forceful', 'Calculating'],
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
            detailedCharacteristics: ['Energetic', 'Daredevil', 'Euphoric'],
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
            detailedCharacteristics: ['Outgoing', 'Assertive', 'Eager'],
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
            detailedCharacteristics: ['Amiable', 'Adventurous', 'Bold'],
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
            detailedCharacteristics: ['Thougthful', 'Inquisitive', 'Cerebral'],
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

      this.$store.dispatch('auth/setSelfPersonalityTypeRequest', formData)
        .then(() => {
          this.$router.push('report');
        });
    },
    ChartOptionBarData(data) {
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
