<template>
  <div class="personality-type">
    <h1 class="h5">
      Which personality type do you think you are
    </h1>
    <PersonalityCarousel :slides="slides" />
    <button class="button button_w-100 button_theme-default button_size-m">
      Choose
    </button>
  </div>
</template>

<script>
import PersonalityCarousel from '@components/PersonalityCarousel/PersonalityCarousel.vue';

export default {
  components: {
    PersonalityCarousel,
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
      },
      {
        id: 2,
        src: '/img/defender.svg',
        title: 'Defender2',
        desc: 'Flexible and charming artists,\n'
          + '            always ready to explore and experience something new.',
        bgColor: 'bg-5',
      },
      {
        id: 3,
        src: '/img/defender.svg',
        title: 'Defender3',
        desc: 'Flexible and charming artists,\n'
          + '            always ready to explore and experience something new.',
        bgColor: 'bg-4',
      },
    ],
  }),
  methods: {},
};
</script>
