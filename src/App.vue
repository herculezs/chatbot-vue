<template>
  <div class="main">
    <Header /> <!--v-if="mainPageHeader"-->
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
    // mainPageHeader() {
    //   const route = this.$route.path.split('/').filter(x => x !== '');
    //   return route[0] !== 'admin';
    // },
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
