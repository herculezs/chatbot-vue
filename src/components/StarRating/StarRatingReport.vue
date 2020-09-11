<template>
  <star-rating
    ref="rating"
    v-touch:swipe.right="swipeSelectedRating"
    @rating-selected="selectedRating"
    :increment="0.5"
    :rating="getRating"
    border-color="#7811C9"
    active-color="#7811C9"
    inactive-color="#fff"
    :border-width="6"
    :star-size="30"
  />
</template>

<script>
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
