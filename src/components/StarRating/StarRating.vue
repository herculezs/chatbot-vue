<template>
  <star-rating
    ref="rating"
    v-touch:swipe.right="swipeSelectedRatign"
    v-touch:swipe.left="swipeSelectedRatign"
    @rating-selected="selectedRating"
    :increment="0.5"
    :rating="rating"
    border-color="#7811C9"
    active-color="#7811C9"
    inactive-color="#fff"
    :border-width="6"
    :star-size="28"
  />
</template>

<script>
import StarRating from 'vue-star-rating';

export default {
  components: {
    StarRating,
  },
  data: () => ({
    rating: 0,
  }),
  methods: {
    selectedRating(data) {
      this.rating = data;
    },
    swipeSelectedRatign() {
      this.rating = this.$refs.rating.currentRating;
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
