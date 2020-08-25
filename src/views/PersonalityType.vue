<template>
  <div class="personality-type">
    <Content>
      <h1 class="h5">
        Which type best represents how you appear at work?
      </h1>
      <PersonalityCarousel :slides="slides" @change="changeSlide" />
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

export default {
  components: {
    PersonalityCarousel,
    Content,
  },
  data: () => ({
    slides: [
      {
        src: '/img/entertainer.svg',
        title: 'Entertainer',
        desc: 'Spontaneous, energetic and enthusiastic people - life is never boring around them.',
        bgColor: 'bg-6',
        tag: 'ESFP',
      },
      {
        src: '/img/enterpreneur.svg',
        title: 'Entrepreneur',
        desc: 'Smart, energetic and very perceptive people, who truly enjoy living on the edge.',
        bgColor: 'bg-7',
        tag: 'ESTP',
      },
      {
        src: '/img/logistican.svg',
        title: 'Logistician',
        desc: 'Practical and fact-minded individuals, whose reliability cannot be doubted.',
        bgColor: 'bg-3',
        tag: 'ISTJ',
      },
      {
        src: '/img/virtuoso.svg',
        title: 'Virtuoso',
        desc: 'Bold and practical experimenters, masters of all kinds of tools.',
        bgColor: 'bg-8',
        tag: 'ISTP',
      },
      {
        src: '/img/executive.svg',
        title: 'Executive',
        desc: 'Excellent administrators unsurpassed at managing things - or people.',
        bgColor: 'bg-3',
        tag: 'ESTJ',
      },
      {
        src: '/img/consul.svg',
        title: 'Consul',
        desc: 'Extraordinary caring, social and popular people, always eager to help.',
        bgColor: 'bg-7',
        tag: 'ESFJ',
      },
      {
        src: '/img/architect.svg',
        title: 'Architect',
        desc: 'Imaginative and strategic thinker, with a plan for everything.',
        bgColor: 'bg-6',
        tag: 'INTJ',
      },
      {
        src: '/img/logician.svg',
        title: 'Logician',
        desc: 'Innovative inventors with an unquenchable thirst for knowledge.',
        bgColor: 'bg-8',
        tag: 'INTP',
      },
      {
        src: '/img/campaigner.svg',
        title: 'Campaigner',
        desc: 'Enthusiastic, creative and sociable free spirits, who can always find a reason to smile.',
        bgColor: 'bg-6',
        tag: 'ENFP',
      },
      {
        src: '/img/commander.svg',
        title: 'Commander',
        desc: 'Bold, imaginative and strong-willed leaders, always finding a way - or making one.',
        bgColor: 'bg-6',
        tag: 'ENTJ',
      },
      {
        src: '/img/debater.svg',
        title: 'Debater',
        desc: 'Smart and curious thinkers whi cannot resist and intellectual challenge.',
        bgColor: 'bg-8',
        tag: 'ENTP',
      },
      {
        src: '/img/protagonist.svg',
        title: 'Protagonist',
        desc: 'Charismatic and inspiring leaders, able to mesmerize thier listeners.',
        bgColor: 'bg-6',
        tag: 'ENFJ',
      },
      {
        src: '/img/defender.svg',
        title: 'Defender',
        desc: 'Very dedicated and warm protectors, always ready to defend their loved ones.',
        bgColor: 'bg-9',
        tag: 'ISFJ',
      },
      {
        src: '/img/adventurer.svg',
        title: 'Adventurer',
        desc: 'Flexible and charming artists, always ready to explore and experience something new.',
        bgColor: 'bg-7',
        tag: 'ISFP',
      },
      {
        src: '/img/advocate.svg',
        title: 'Advocate',
        desc: 'Quiet and mystical, yet very inspiring and tireless idealists.',
        bgColor: 'bg-8',
        tag: 'INFJ',
      },
      {
        src: '/img/mediator.svg',
        title: 'Mediator',
        desc: 'Poetic, kind and altruistic people, always eager to help a good cause.',
        bgColor: 'bg-7',
        tag: 'INFP',
      },
    ],
    currentSlide: 0,
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
