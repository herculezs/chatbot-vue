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
  created() {
    document.title = 'innerworks';
    if (process.env.VUE_APP_BUILD !== undefined) {
      document.title = 'Wellment';
    }
  },
};
</script>

<style lang="scss">
  @import "./styles/style.scss";
</style>
