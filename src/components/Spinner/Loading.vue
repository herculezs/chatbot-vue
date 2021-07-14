<template>
  <div>
    <loading :active.sync="isLoading"
             :color="'#7811C9'"
             :lock-scroll="scrollLock"
             :height="128"
             :width="128"
             :background-color="'#ccccc'"
             :is-full-page="fullPage"></loading>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  data() {
    return {
      fullPage: true,
    };
  },
  components: {
    Loading,
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    scrollLock: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped>

</style>
