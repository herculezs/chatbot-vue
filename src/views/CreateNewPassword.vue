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

export default {
  components: {
    CreatePassword,
    Content,
  },

  computed: {},
  methods: {
    changePassword(formData) {
      this.$store.dispatch('auth/newPasswordRequest', formData);
    },
  },
};
</script>
