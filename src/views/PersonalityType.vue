<template>
  <div class="personality-type">
    <Content>
      <h1 class="h5">
        Which personality type do you think best represents how you see yourself?
      </h1>
      <PersonalityCarousel :slides="slides" @change="changeSlide" />
      <ChartChooseYourPersonality :data="chartOptionsBar"></ChartChooseYourPersonality>
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
import PersonalityCarousel from '@components/PersonalityCarousel/PersonalityCarousel.vue';
import Content from '@components/Content/Content.vue';
import ChartChooseYourPersonality from '@components/Charts/ChartChooseYourPersonality.vue';
import entertainer from '../assets/entertainer.svg';
import enterpreneur from '../assets/enterpreneur.svg';
import logistican from '../assets/logistican.svg';
import virtuoso from '../assets/virtuoso.svg';
import executive from '../assets/executive.svg';
import consul from '../assets/consul.svg';
import architect from '../assets/architect.svg';
import logician from '../assets/logician.svg';
import campaigner from '../assets/campaigner.svg';
import commander from '../assets/commander.svg';
import debater from '../assets/debater.svg';
import protagonist from '../assets/protagonist.svg';
import defender from '../assets/defender.svg';
import adventurer from '../assets/adventurer.svg';
import advocate from '../assets/advocate.svg';
import mediator from '../assets/mediator.svg';


export default {
  components: {
    ChartChooseYourPersonality,
    PersonalityCarousel,
    Content,
  },
  data: () => ({
    slides: [
      {
        src: entertainer,
        title: 'Entertainer',
        desc: 'Spontaneous, energetic and enthusiastic people - life is never boring around them.',
        bgColor: 'bg-6',
        tag: 'ESFP',
      },
      {
        src: enterpreneur,
        title: 'Entrepreneur',
        desc: 'Smart, energetic and very perceptive people, who truly enjoy living on the edge.',
        bgColor: 'bg-7',
        tag: 'ESTP',
      },
      {
        src: logistican,
        title: 'Logistician',
        desc: 'Practical and fact-minded individuals, whose reliability cannot be doubted.',
        bgColor: 'bg-3',
        tag: 'ISTJ',
      },
      {
        src: virtuoso,
        title: 'Virtuoso',
        desc: 'Bold and practical experimenters, masters of all kinds of tools.',
        bgColor: 'bg-8',
        tag: 'ISTP',
      },
      {
        src: executive,
        title: 'Executive',
        desc: 'Excellent administrators unsurpassed at managing things - or people.',
        bgColor: 'bg-3',
        tag: 'ESTJ',
      },
      {
        src: consul,
        title: 'Consul',
        desc: 'Extraordinary caring, social and popular people, always eager to help.',
        bgColor: 'bg-7',
        tag: 'ESFJ',
      },
      {
        src: architect,
        title: 'Architect',
        desc: 'Imaginative and strategic thinker, with a plan for everything.',
        bgColor: 'bg-6',
        tag: 'INTJ',
      },
      {
        src: logician,
        title: 'Logician',
        desc: 'Innovative inventors with an unquenchable thirst for knowledge.',
        bgColor: 'bg-8',
        tag: 'INTP',
      },
      {
        src: campaigner,
        title: 'Campaigner',
        desc: 'Enthusiastic, creative and sociable free spirits, who can always find a reason to smile.',
        bgColor: 'bg-6',
        tag: 'ENFP',
      },
      {
        src: commander,
        title: 'Commander',
        desc: 'Bold, imaginative and strong-willed leaders, always finding a way - or making one.',
        bgColor: 'bg-6',
        tag: 'ENTJ',
      },
      {
        src: debater,
        title: 'Debater',
        desc: 'Smart and curious thinkers whi cannot resist and intellectual challenge.',
        bgColor: 'bg-8',
        tag: 'ENTP',
      },
      {
        src: protagonist,
        title: 'Protagonist',
        desc: 'Charismatic and inspiring leaders, able to mesmerize thier listeners.',
        bgColor: 'bg-6',
        tag: 'ENFJ',
      },
      {
        src: defender,
        title: 'Defender',
        desc: 'Very dedicated and warm protectors, always ready to defend their loved ones.',
        bgColor: 'bg-9',
        tag: 'ISFJ',
      },
      {
        src: adventurer,
        title: 'Adventurer',
        desc: 'Flexible and charming artists, always ready to explore and experience something new.',
        bgColor: 'bg-7',
        tag: 'ISFP',
      },
      {
        src: advocate,
        title: 'Advocate',
        desc: 'Quiet and mystical, yet very inspiring and tireless idealists.',
        bgColor: 'bg-8',
        tag: 'INFJ',
      },
      {
        src: mediator,
        title: 'Mediator',
        desc: 'Poetic, kind and altruistic people, always eager to help a good cause.',
        bgColor: 'bg-7',
        tag: 'INFP',
      },
    ],
    currentSlide: 0,
    chartOptionsBar: [
      {
        value: [],
        data: [
          [10.0, 8.04, 'Imperturable'],
          [8.0, 6.95, 'Positivistic'],
          [13.0, 9.58, 'Progmatic'],
          [9.0, 8.81, 'Commercing'],
          [-6.0, -7.24, 'Shizoid'],
          [-4.0, -4.26, 'Paranoid'],
          [5.0, -5.68, 'Antisocial'],
          [7.0, -4.82, 'Narcissistic'],
          [-2.0, 6.95, 'Responsible'],
          [-13.0, 2.58, 'Inert'],
          [-9.0, 8.81, 'Determined'],
        ],
      },
    ],
  }),
  methods: {
    choose() {
      const formData = {
        selfPersonalityType: this.slides[this.currentSlide].tag,
      };

      this.$store.dispatch('auth/setSelfPersonalityTypeRequest', formData)
        .then(() => {
          this.$router.push('report');
        });
    },
    changeSlide(numberSlide) {
      this.currentSlide = numberSlide;
    },
  },
};
</script>
