<template>
  <div class="personality-type">
    <Content>
      <h1 class="h5">
        Which personality type do you think you are
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
        id: 1,
        src: '/img/defender.svg',
        title: 'Defender',
        desc: 'Flexible and charming artists,\n'
          + '            always ready to explore and experience something new.',
        bgColor: 'bg-3',
        tag: 'ISFJ',
      },
      {
        id: 2,
        src: '/img/defender.svg',
        title: 'Adventurer',
        desc: 'Flexible and charming artists,\n'
          + '            always ready to explore and experience something new.',
        bgColor: 'bg-5',
        tag: 'ISFP',
      },
      {
        id: 3,
        src: '/img/defender.svg',
        title: 'Logistician',
        desc: 'Flexible and charming artists,\n'
          + '            always ready to explore and experience something new.',
        bgColor: 'bg-4',
        tag: 'ISTJ',
      },
    ],
    currentSlide: 1,
  }),
  methods: {
    choose() {
      const formData = {
        selfPersonalityType: this.slides[this.currentSlide].tag,
      };

      this.$api.personalityTypeReport.setPersonalityType(formData).then(() => {
        this.$router.push('report');
      });
    },
    changeSlide(numberSlide) {
      this.currentSlide = numberSlide;
    },
  },
};
</script>
