<template>
  <div class="main">
    <Header/>
    <router-view class="main__content" />
    <Notification />
    <SaveSecretDataModal v-if="showSecretDataModal" open-modal="showSecretDataModal">
    </SaveSecretDataModal>
  </div>
</template>

<script>
import Header from '@components/Header/Header.vue';
import Notification from '@components/Notification/Notification.vue';
import { mapGetters } from 'vuex';
import SaveSecretDataModal from '@components/Modals/SaveSecretDataModal.vue';

export default {
  name: 'App',
  components: {
    SaveSecretDataModal,
    Header,
    Notification,
  },
  computed: {
    ...mapGetters({
      getProfile: 'auth/getProfile',
    }),
    title() {
      if (process.env.VUE_APP_TITLE) {
        return process.env.VUE_APP_TITLE;
      }
      return 'InnerWorks';
    },
    showSecretDataModal() {
      return this.getProfile.userWithoutSecretAnswer === false;
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
