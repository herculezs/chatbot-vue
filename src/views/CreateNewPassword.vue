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
      getSecurityCode: 'auth/getSecurityCode',
      getRedirectAuth: 'auth/getRedirectAuth',
    }),
  },
  methods: {
    changePassword(formData) {
      const dataForRequest = {
        password: formData.password,
        code: this.getSecurityCode,
      };

      // eslint-disable-next-line no-underscore-dangle
      this.$store.dispatch('auth/newPassword',
        { formData: dataForRequest, userId: this.getProfile.id })
        .then(() => {
          if (this.getProfile.completedQuestionnaires.includes(process.env.QUESTIONNAIRE_ID)) {
            this.$router.replace('report');
          } else {
            this.$router.replace(this.getRedirectAuth);
          }
        });
    },
  },
};
</script>
