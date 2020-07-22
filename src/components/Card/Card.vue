<template>
  <div class="card" :class="{card_hide: !show.card}" @click.prevent="toggleShowCard">
    <div
      class="h5 card__title"
      :class="{'animation-hide-show': animations.cardShow,
       'animation-show-hide': animations.cardHide}"
      v-if="!show.card"
    >
      {{ title }}
    </div>
    <b-collapse v-model="show.card">
        <div class="h5 text-center" style="margin-top: 0;">
          {{ title }}
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
    defaultOpen: {
      type: Boolean,
      value: false,
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
  }
  .card__title{
    transition: opacity .3s;
    margin: 0;
    opacity: 1;
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
    background: #D6E7FF;
    transition: background 0.3s;
    &:hover, &:focus{
      background: #EEFBF4;
    }
  }

  .card__title.animation-hide-show{
    opacity: 0;
    display: none;
  }
  .card__title.animation-show-hide{
    opacity: 0;
  }

</style>
