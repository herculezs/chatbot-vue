<template>
  <div class="main">
    <Header/>
    <router-view class="main__content" />
    <notifications position="top center" :speed="500" />
  </div>
</template>

<script>
import Header from '@components/Header/Header.vue';

export default {
  name: 'App',
  components: {
    Header,
  },
  methods: {},
};
</script>

<style lang="scss">
  @import "./styles/style.scss";

</style>
