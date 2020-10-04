<template>
  <div class="personality-type-carousel-wrapper">
    <VueSlickCarousel
      class="personality-type-carousel"
      v-bind="settings" ref="carousel"
      @afterChange="changeSlide"
    >
      <div class="personality-type-carousel__item" v-for="slide in slides" :key="slide.id">
        <div class="personality-type-carousel__content" :class="slide.bgColor">
          <img class="personality-type-carousel__img" :src="slide.src" alt="carousel__img">
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
      <button class="personality-type-carousel__button" @click="showPrev">
        <svg xmlns="http://www.w3.org/2000/svg"
             xmlns:xlink="http://www.w3.org/1999/xlink"
             version="1.1"
             x="0px" y="0px"
             viewBox="0 0 256 256"
             style="enable-background:new 0 0 256 256;" xml:space="preserve"
        >
          <g>
            <g>
              <polygon
                points="207.093,30.187 176.907,0 48.907,128 176.907,
                256 207.093,225.813 109.28,128"/>
            </g>
          </g>
        </svg>
      </button>
      <div class="personality-type-carousel__controls-text">
        Swipe left or right to select personality
      </div>
      <button class="personality-type-carousel__button" @click="showNext">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 256 256"
          style="enable-background:new 0 0 256 256;" xml:space="preserve"
        >
          <g>
            <g>
              <polygon points="79.093,0 48.907,30.187 146.72,
              128 48.907,225.813 79.093,256 207.093,128"/>
            </g>
          </g>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel';

export default {
  components: {
    VueSlickCarousel,
  },
  props: {
    slides: {
      type: Array,
    },
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
  }),
  methods: {
    showNext() {
      this.$refs.carousel.next();
    },
    showPrev() {
      this.$refs.carousel.prev();
    },
    changeSlide(numberSlide) {
      this.$emit('change', numberSlide);
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
    height: 426px;
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
    height: 210px;
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
    font-size: 16px;
    letter-spacing: 0;
    line-height: 16px;
    text-align: center;
  }
  .personality-type-carousel__button{
    padding: 0;
    background-color: transparent;
    border: none;
    color: $txtColor2;
    font-size: 32px;
    line-height: 8px;
    width: 24px;
    height: 24px;
    svg{
      fill: $txtColor2;
    }
    &:hover, &:focus{
      outline: none;
    }
  }
</style>
