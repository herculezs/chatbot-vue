<template>
  <star-rating
    ref="rating"
    v-touch:swipe.right="swipeSelectedRating"
    @rating-selected="selectedRating"
    :increment="0.5"
    :rating="getRating"
    :border-color="starBorderColor"
    :active-color="starActiveColor"
    inactive-color="#fff"
    :border-width="6"
    :star-size="40"
  />
</template>

<script>
import StarRating from './StarRating.vue';
import variablesWellment from '../../styles/variables-wellment.scss';
import variables from '../../styles/variables.scss';

export default {
  components: {
    StarRating,
  },
  props: {
    value: {
      type: Number,
    },
  },
  computed: {
    getRating: {
      // eslint-disable-next-line
      get: function () {
        return this.value;
      },
      // eslint-disable-next-line
      set: function (newValue) {
        this.$emit('input', newValue);
      },
    },
    starActiveColor: {
      // eslint-disable-next-line
      get: () => {
        if (process.env.VUE_APP_BUILD === 'wellment') {
          return variablesWellment.starActiveColor;
        }

        return variables.starActiveColor;
      },
    },
    starBorderColor: {
      get: () => {
        if (process.env.VUE_APP_BUILD === 'wellment') {
          return variablesWellment.starBorderColor;
        }

        return variables.starActiveColor;
      },
    },
  },
  methods: {
    selectedRating(data) {
      this.getRating = data;
    },
    swipeSelectedRating() {
      this.getRating = this.$refs.rating.currentRating;
    },
  },
};
</script>

<style lang="scss">
  .vue-star-rating-rating-text{
    display: none;
  }
  .vue-star-rating{
    width: 100%;
    justify-content: space-between;
  }
</style>
