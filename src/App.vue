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
  computed: {
    title() {
      if (process.env.VUE_APP_TITLE) {
        return process.env.VUE_APP_TITLE;
      }
      return 'InnerWorks';
    },
  },
  created() {
  },
  metaInfo() {
    return {
      title: this.title,
    };
  },
};
</script>

<style lang="scss">
  @import "./styles/style.scss";
</style>
