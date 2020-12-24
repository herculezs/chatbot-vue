<template>
  <div class="card" :class="{card_hide: !show.card}" @click.prevent="toggleShowCard">
    <div
      class="h5 card__title"
      :class="{'animation-hide-show': animations.cardShow,
     'animation-show-hide': animations.cardHide}"
      v-if="!show.card"
    >
      {{ title }}
      <div class="card__title-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 256 256" class="arrow_icon"
          style="enable-background:new 0 0 256 256;" xml:space="preserve"
        >
          <g>
            <g>
              <polygon points="79.093,0 48.907,30.187 146.72,
              128 48.907,225.813 79.093,256 207.093,128"/>
            </g>
          </g>
        </svg>
      </div>
    </div>
    <img
      :src="img"
      :alt="title"
      class="card__title-img"
      :class="{'animation-hide-show': animations.cardShow,
     'animation-show-hide': animations.cardHide}"
      v-if="!show.card"
    >

    <b-collapse v-model="show.card">
      <div class="card-content-caption">
        <img
          :src="img"
          :alt="title"
          class="card-content-caption__img"
        >
        <div class="h5 card-content-caption__title">
          {{ title }}
        </div>
        <div class="h5 card-content-caption__sub-title">
          Search online for "{{ tag }}"
        </div>
      </div>
      <div class="card-info">
        <div class="card-info__text ">
          {{ showText }}
        </div>
        <b-collapse v-model="show.content">
          <div class="card-info__text mt-3">
            {{ hideText }}
          </div>
        </b-collapse>
      </div>
      <button
        class="card__button-show-more button button_w-100 button_size-m button_theme-transparent"
        v-b-toggle.debator-more
        @click.stop="show.content = !show.content"
      >
        Show {{ show.content ? 'Less' : 'More' }}
      </button>
    </b-collapse>
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
    },
    showText: {
      type: String,
    },
    hideText: {
      type: String,
    },
    img: {
      type: String,
    },
    defaultOpen: {
      type: Boolean,
      value: false,
    },
    tag: {
      type: String,
    },
  },
  data: () => ({
    show: {
      card: false,
      content: false,
    },
    animations: {
      cardShow: false,
      cardHide: false,
    },
    transition: 350,
  }),
  mounted() {
    this.show.card = this.defaultOpen;
  },
  methods: {
    toggleShowCard() {
      if (this.show.card) return this.showCard();

      return this.hideCard();
    },
    showCard() {
      this.animations.cardHide = false;
      this.animations.cardShow = true;
      this.show.card = !this.show.card;

      this.resolveByTimeOut(() => {
        this.animations.cardShow = false;
      });
    },
    hideCard() {
      this.animations.cardHide = true;
      this.animations.cardShow = false;

      this.resolveByTimeOut(() => {
        this.show.card = !this.show.card;
      });
    },
    resolveByTimeOut(callback) {
      setTimeout(() => callback(), this.transition);
    },
  },
};
</script>

<style lang="scss">
  .card{
    padding: 20px;
    min-height: 72px;
    border-radius: 8px;
    background: linear-gradient(0deg, #EEFBF4 100%, rgba(238,251,244,0) 0);
    box-shadow: 0 8px 24px 0 rgba(140,180,160,0.48);
    margin-bottom: 32px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
  }
  .card__title{
    transition: opacity .3s;
    margin: 0;
    opacity: 1;
    display: flex;
    align-items: center;
    color: $txtColor5;
  }
  .card-info__text{
    text-align: center;
    color: $txtColor2;
    font-family: $defaultFont;
    font-size: 16px;
    letter-spacing: 0;
    line-height: 24px;
  }
  .card__button-show-more{
    padding-bottom: 0;
  }
  .card_hide{
    background: $bgCardColor1;
    transition: background 0.3s;
    &:hover, &:focus{
      background: $bgCardHoverColor1;
    }
  }

  .card-chip{
    position: relative;
  }
  .card__title-img{
    position: absolute;
    height: 100%;
    width: auto;
    right: 0;
    top: 0;
    transition: opacity .3s;
    opacity: 1;
  }

  .card__title.animation-hide-show,
  .card__title-img.animation-hide-show{
    opacity: 0;
    display: none;
  }
  .card__title.animation-show-hide,
  .card__title-img.animation-show-hide{
    opacity: 0;
  }

  .card-content-caption{
    position: relative;
    margin-bottom: 24px;
  }
  .card-content-caption__title{
    width: 100%;
    text-align: center;
  }
  .card-content-caption__sub-title{
    font-size: 16px;
    margin-top: -10px;
    text-align: center;
  }
  .card-content-caption__img{
    width: 70%;
    display: block;
    margin: 0 auto;
  }
  .card__title-icon{
    width: 24px;
    padding: 6px;
    height: 24px;
    position: relative;
    top: 1px;
    margin-left: 5px;
    svg{
      display: block;
    }
  }
  .arrow_icon{
    fill: $txtColor5;
  }
</style>
