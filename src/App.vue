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
      meta: [
        { name: 'description', content: 'A Simple and Fun way to find Your TRUE Personality' },
        {
          name: 'keywords',
          content: 'personality,psychology,assessment,crowd source,big 5,16 personalities,disc,'
            + 'network,adaptive,psychological,inventory,temperament,myers-briggs,psychometrics,compatibility',
        },
      ],
    };
  },
};
</script>

<style lang="scss">
  @import "./styles/style.scss";
</style>
