<template>
  <div class="reset-password">
    <Content>
      <h1 class="h4 text-center mb-6">Login</h1>
      <form class="form">
        <TelInput
          v-model="formData.phone"
          :diaCode="diaCode"
          :validPhone="$v.formData.phone"
          @onDiaCode="countryChanged"
          :placeHolder="configEnv.onboarding.placeholderPhone"
          :defaultCountry="configEnv.onboarding.defaultStatePhone"
        />

        <div
          class="form-group"
          :class="{'form-group-error': $v.formData.password.$error}"
        >
          <input
            class="form__input"
            placeholder="Password"
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
        <div class="form-group form-group_link">
          <router-link to="/reset-password" class="link">Forgot password?</router-link>
        </div>
        <div class="form-group form-group_submit">
          <button
            class="form button button_w-100 button_theme-default button_size-m"
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
import TelInput from '@components/InputTel/TelInput.vue';
import { mapGetters } from 'vuex';
import configEnv from '@configEnv';

const { required } = require('vuelidate/lib/validators');

export default {
  components: {
    Content,
    TelInput,
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
    }),
    getClassByLengthCountryCode() {
      return `code-length-${this.diaCode.length}`;
    },
  },
  methods: {
    prepareDataForRequest() {
      const phone = `+${this.diaCode}${this.formData.phone}`
        .replace(/\s/g, '');

      return {
        password: this.formData.password,
        phone,
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
          this.$router.replace(this.getRedirectAuth);
        });
      }
    },
  },
};

</script>
