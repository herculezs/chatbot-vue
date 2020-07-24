<template>
  <div class="create-password">
    <h1 class="h4 text-center mb-6">Create new password</h1>
    <CreatePassword @submit="changePassword" />
  </div>
</template>

<script>
import CreatePassword from '@components/CreatePassword/CreatePassword.vue';

export default {
  components: {
    CreatePassword,
  },

  computed: {},
  methods: {
    changePassword() {
      console.log('some api');
    },
  },
};
</script>
