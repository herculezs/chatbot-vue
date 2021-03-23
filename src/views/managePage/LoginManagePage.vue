<template>
  <div class="login-admin-page">
    <Content>
      <h1 class="h4 text-center mb-6">Admin Login</h1>
      <form class="form">
        <div
          class="form-group"
          :class="{'form-group-error': $v.formData.password.$error}"
        >
          <input
            class="form__input"
            placeholder="User name"
            type="text"
            v-model="formData.phone"
          />
          <template v-if="$v.formData.phone.$error">
            <div
              class="form__input-error"
              v-if="!$v.formData.phone.required"
            >
              Field is required
            </div>
          </template>
        </div>
        <div
          class="form-group"
          :class="{'form-group-error': $v.formData.password.$error}"
        >
          <input
            class="form__input"
            placeholder="Admin Password"
            type="password"
            v-model="formData.password"
          />
          <template v-if="$v.formData.password.$error">
            <div
              class="form__input-error"
              v-if="!$v.formData.password.required"
            >
              Field is required
            </div>
          </template>
        </div>
        <div class="form-group form-group_submit">
          <button
            class="form button button_w-100 button_theme-default button_size-m button_theme"
            @click.prevent="login"
          >
            Log in
          </button>
        </div>
      </form>
    </Content>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import Content from '@components/Content/Content.vue';
import { mapGetters } from 'vuex';
import configEnv from '@configEnv';

const { required } = require('vuelidate/lib/validators');

export default {
  components: {
    Content,
  },
  mixins: [validationMixin],
  validations: {
    formData: {
      phone: {
        required,
      },
      password: {
        required,
      },
    },
  },
  data: () => ({
    configEnv,
    formData: {
      phone: null,
      password: null,
    },
    diaCode: '',
  }),
  computed: {
    ...mapGetters({
      getRedirectAuth: 'auth/getRedirectAuth',
      getProfile: 'auth/getProfile',
    }),
    getClassByLengthCountryCode() {
      return `code-length-${this.diaCode.length}`;
    },
  },
  methods: {
    prepareDataForRequest() {
      return {
        password: this.formData.password,
        phone: `+${this.formData.phone}`,
      };
    },
    countryChanged(data) {
      this.diaCode = data.dialCode;
    },
    login() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const data = this.prepareDataForRequest();
        this.$store.dispatch('auth/loginRequest', data).then(() => {
          this.$router.push({
            name: 'adminPanel',
          });
        }).catch(() => {
          this.$router.push({
            name: 'manageLogin',
          });
        });
      }
    },
  },
};

</script>

<style lang="scss">
  input {
    background-color: white;
  }
</style>
