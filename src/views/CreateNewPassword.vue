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
import checkRole from '@helpers/adminFunction';

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
    savePhoto(res) {
      if (res.trim().startsWith('document')) {
        const srcStart = res.indexOf('src') + 5;
        const titleStart = res.indexOf('title') + 7;
        const result = {
          link: res.substring(srcStart, res.indexOf("'", srcStart)),
          title: res.substring(titleStart, res.indexOf("'", titleStart)),
        };
        this.$api.auth.saveUserPhoto(result, this.getProfile.id);
      } else {
        this.$api.auth.saveUserPhoto({ link: '', title: '' }, this.getProfile.id);
      }
    },
    changePassword(formData) {
      const dataForRequest = {
        password: formData.password,
        code: this.getSecurityCode,
      };

      // eslint-disable-next-line no-underscore-dangle
      this.$store.dispatch('auth/newPassword',
        { formData: dataForRequest, userId: this.getProfile.id })
        .then(() => {
          this.$api.apiRequest.getAvatarApi(this.getProfile.email).then((x) => {
            this.savePhoto(x);
          });

          if (checkRole.isAdmin()) {
            this.$router.push({
              name: 'adminMenu',
            });
          } else if (this.getProfile.completedQuestionnaires
            .includes(process.env.QUESTIONNAIRE_ID)) {
            this.$router.replace('report');
          } else {
            this.$router.replace(this.getRedirectAuth);
          }
        });
    },
  },
};
</script>
