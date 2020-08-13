<template>
  <div class="main">
    <Header/>
    <router-view class="main__content" />
    <Notification />
  </div>
</template>

<script>
import Header from '@components/Header/Header.vue';
import Notification from '@components/Notification/Notification.vue';

export default {
  name: 'App',
  components: {
    Header,
    Notification,
  },
};
</script>

<style lang="scss">
  @import "./styles/style.scss";
</style>
