<template>
  <star-rating
    ref="rating"
    v-touch:swipe.right="swipeSelectedRating"
    @rating-selected="selectedRating"
    :increment="0.5"
    :rating="getRating"
    :border-color="configEnv.starRatingReport.starBorderColor"
    :active-color="configEnv.starRatingReport.starActiveColor"
    inactive-color="#fff"
    :border-width="6"
    :star-size="40"
  />
</template>

<script>
import configEnv from '@configEnv';
import StarRating from './StarRating.vue';

export default {
  components: {
    StarRating,
  },
  props: {
    value: {
      type: Number,
    },
  },
  data: () => ({
    configEnv,
  }),
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
