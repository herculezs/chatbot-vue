<template>
  <div class="personality-type">
    <Content>
      <h1 class="h5">
        Which personality type do you think best represents how you see yourself?
      </h1>
<!--      <PersonalityCarousel :slides="slides" @change="changeSlide" />-->
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
// import entertainer from '../assets/entertainer.svg';
// import enterpreneur from '../assets/enterpreneur.svg';
// import logistican from '../assets/logistican.svg';
// import virtuoso from '../assets/virtuoso.svg';
// import executive from '../assets/executive.svg';
// import consul from '../assets/consul.svg';
// import architect from '../assets/architect.svg';
// import logician from '../assets/logician.svg';
// import campaigner from '../assets/campaigner.svg';
// import commander from '../assets/commander.svg';
// import debater from '../assets/debater.svg';
// import protagonist from '../assets/protagonist.svg';
// import defender from '../assets/defender.svg';
// import adventurer from '../assets/adventurer.svg';
// import advocate from '../assets/advocate.svg';
// import mediator from '../assets/mediator.svg';

// PersonalityCarousel,
export default {
  components: {
    ChartChooseYourPersonality,
    Content,
  },
  data: () => ({
    // slides: [
    //   {
    //     src: entertainer,
    //     title: 'Entertainer',
    // eslint-disable-next-line max-len
    //     desc: 'Spontaneous, energetic and enthusiastic people - life is never boring around them.',
    //     bgColor: 'bg-6',
    //     tag: 'ESFP',
    //   },
    //   {
    //     src: enterpreneur,
    //     title: 'Entrepreneur',
    //     desc: 'Smart, energetic and very perceptive people, who truly enjoy living on the edge.',
    //     bgColor: 'bg-7',
    //     tag: 'ESTP',
    //   },
    //   {
    //     src: logistican,
    //     title: 'Logistician',
    //     desc: 'Practical and fact-minded individuals, whose reliability cannot be doubted.',
    //     bgColor: 'bg-3',
    //     tag: 'ISTJ',
    //   },
    //   {
    //     src: virtuoso,
    //     title: 'Virtuoso',
    //     desc: 'Bold and practical experimenters, masters of all kinds of tools.',
    //     bgColor: 'bg-8',
    //     tag: 'ISTP',
    //   },
    //   {
    //     src: executive,
    //     title: 'Executive',
    //     desc: 'Excellent administrators unsurpassed at managing things - or people.',
    //     bgColor: 'bg-3',
    //     tag: 'ESTJ',
    //   },
    //   {
    //     src: consul,
    //     title: 'Consul',
    //     desc: 'Extraordinary caring, social and popular people, always eager to help.',
    //     bgColor: 'bg-7',
    //     tag: 'ESFJ',
    //   },
    //   {
    //     src: architect,
    //     title: 'Architect',
    //     desc: 'Imaginative and strategic thinker, with a plan for everything.',
    //     bgColor: 'bg-6',
    //     tag: 'INTJ',
    //   },
    //   {
    //     src: logician,
    //     title: 'Logician',
    //     desc: 'Innovative inventors with an unquenchable thirst for knowledge.',
    //     bgColor: 'bg-8',
    //     tag: 'INTP',
    //   },
    //   {
    //     src: campaigner,
    //     title: 'Campaigner',
    // eslint-disable-next-line max-len
    //     desc: 'Enthusiastic, creative and sociable free spirits, who can always find a reason to smile.',
    //     bgColor: 'bg-6',
    //     tag: 'ENFP',
    //   },
    //   {
    //     src: commander,
    //     title: 'Commander',
    // eslint-disable-next-line max-len
    //     desc: 'Bold, imaginative and strong-willed leaders, always finding a way - or making one.',
    //     bgColor: 'bg-6',
    //     tag: 'ENTJ',
    //   },
    //   {
    //     src: debater,
    //     title: 'Debater',
    //     desc: 'Smart and curious thinkers whi cannot resist and intellectual challenge.',
    //     bgColor: 'bg-8',
    //     tag: 'ENTP',
    //   },
    //   {
    //     src: protagonist,
    //     title: 'Protagonist',
    //     desc: 'Charismatic and inspiring leaders, able to mesmerize thier listeners.',
    //     bgColor: 'bg-6',
    //     tag: 'ENFJ',
    //   },
    //   {
    //     src: defender,
    //     title: 'Defender',
    //     desc: 'Very dedicated and warm protectors, always ready to defend their loved ones.',
    //     bgColor: 'bg-9',
    //     tag: 'ISFJ',
    //   },
    //   {
    //     src: adventurer,
    //     title: 'Adventurer',
    // eslint-disable-next-line max-len
    //     desc: 'Flexible and charming artists, always ready to explore and experience something new.',
    //     bgColor: 'bg-7',
    //     tag: 'ISFP',
    //   },
    //   {
    //     src: advocate,
    //     title: 'Advocate',
    //     desc: 'Quiet and mystical, yet very inspiring and tireless idealists.',
    //     bgColor: 'bg-8',
    //     tag: 'INFJ',
    //   },
    //   {
    //     src: mediator,
    //     title: 'Mediator',
    //     desc: 'Poetic, kind and altruistic people, always eager to help a good cause.',
    //     bgColor: 'bg-7',
    //     tag: 'INFP',
    //   },
    // ],
    // currentSlide: 0,
    chartOptionsBar: [
      {
        value: [],
        data: [
          [3, 0, 'Insensitive'],
          [3, 2, 'Loner'],
          [3, 4.15, 'Apathetic'],
          [3.15, 6.15, 'Discreet'],
          [2.85, 5.85, 'Compassionate'],
          [4, 0, 'Anxious'],
          [4, 1, 'Suspicious'],
          [4, 3.15, 'Self-critical'],
          [4.15, 4.15, 'Anxious'],
          [3.85, 3.85, 'Perfectionist'],
          [4, 7, 'Determined'],
          [5, -1, 'Procrastinator'],
          [5, 2.85, 'Isolated'],
          [5, 5, 'Humble'],
          [5, 6, 'Responsible'],
          [6, -2, 'Active'],
          [6, 2, 'Unsatisfied'],
          [6, 3, 'Neutral'],
          [6, 4, 'Productive'],
          [6, 8, 'Calm'],
          [7, 0, 'Unemotional'],
          [7, 1, 'Self-centred'],
          [7, 7, 'Positive'],
          [8, -1, 'Impulsive'],
          [8.15, 2.15, 'Autonomous'],
          [7.85, 1.85, 'Patient'],
          [8, 3.15, 'Optimistic'],
          [8, 5, 'Trusting'],
          [8, 6, 'Practical'],
          [9.15, 0.15, 'Lively'],
          [8.85, -0.2, 'Harsh'],
          [9, 1.85, 'Uninhibited'],
          [9, 2.85, 'Engaged'],
          [9, 4, 'Sociable'],
          [9, 5, 'Outgoing'],
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
      this.chartOptionsBarData = data.yourChoose;
    },
    // changeSlide(numberSlide) {
    //   this.currentSlide = numberSlide;
    // },
  },
};
</script>
