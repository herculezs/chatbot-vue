<template>
  <div class="create-password">
    <Content>
      <h1 class="h4 text-center mb-6">Create new password</h1>
      <CreatePassword @submit="changePassword" />
    </Content>
  </div>
</template>

<script>
import CreatePassword from '@components/CreatePassword/CreatePassword.vue';
import Content from '@components/Content/Content.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    CreatePassword,
    Content,
  },
  computed: {
    ...mapGetters({
      getProfile: 'auth/getProfile',
    }),
  },
  methods: {
    changePassword(formData) {
      // eslint-disable-next-line no-underscore-dangle
      this.$api.auth.newPassword(formData, this.getProfile.id);
    },
  },
};
</script>
