<template>
  <div class="personality-type">
    <h1 class="h5">
      Which personality type do you think you are
    </h1>
    <div class="personality-type-carousel-wrapper">
      <VueSlickCarousel
        class="personality-type-carousel"
        v-bind="settings" ref="carousel"
        @afterChange="changeSlide"
      >
        <div class="personality-type-carousel__item" v-for="slide in slides" :key="slide.id">
          <div class="personality-type-carousel__content" :class="slide.bgColor">
            <img class="personality-type-carousel__img" :src="slide.src" alt="defender">
            <div class="h5 text-center mb-3">
              {{ slide.title }}
            </div>
            <div class="text text-center">
              {{ slide.desc }}
            </div>
          </div>
        </div>
      </VueSlickCarousel>
      <div class="personality-type-carousel__controls">
        <button class="personality-type-carousel__button" @click="showPrev">‹</button>
        <div class="personality-type-carousel__controls-text">
          Swipe left or right to select personality
        </div>
        <button class="personality-type-carousel__button" @click="showNext">›</button>
      </div>
    </div>


    <button class="button button_w-100 button_theme-default button_size-m">
      Choose
    </button>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';

export default {
  components: {
    VueSlickCarousel,
  },
  data: () => ({
    settings: {
      centerMode: true,
      centerPadding: '30px',
      focusOnSelect: true,
      infinite: true,
      slidesToShow: 1,
      speed: 500,
    },
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
  methods: {
    showNext() {
      this.$refs.carousel.next();
    },
    showPrev() {
      this.$refs.carousel.prev();
    },
    changeSlide(numberSlide) {
      console.log(numberSlide);
    },
  },
};
</script>

<style lang="scss">
  .personality-type-carousel__item{
    padding: 10px 10px 24px;
  }
  .personality-type-carousel__content{
    padding: 24px;
    border-radius: 8px;
    height: 436px;
    box-shadow: 0 8px 16px 0 rgba(144,161,186,0.32);
    transition: transform .3s;
  }
  .personality-type-carousel-wrapper{
    margin-top: 24px;
    margin-bottom: 24px;
  }
  .personality-type-carousel{
    margin: 0 -24px 20px;
    overflow: hidden;
    .slick-active{
      .personality-type-carousel__content{
        transform: scale(1.05);
      }
    }
  }
  .personality-type-carousel__img{
    height: 220px;
    margin: 0 auto 24px
  }
  .personality-type-carousel__controls{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .personality-type-carousel__controls-text{
    color: $txtColor2;
    font-family: $defaultFont;
    font-size: 14px;
    letter-spacing: 0;
    line-height: 16px;
    text-align: center;
  }
  .personality-type-carousel__button{
    padding: 0;
    background-color: transparent;
    border: none;
    color: $txtColor2;
    font-size: 18px;
    line-height: 8px;
    &:hover, &:focus{
      outline: none;
    }
  }
</style>
