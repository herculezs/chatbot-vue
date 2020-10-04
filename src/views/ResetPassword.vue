<template>
  <div class="reset-password">
    <Content>
      <h1 class="h4 text-center mb-6">Reset your password</h1>
      <form class="form">
        <TelInput
          v-model="formData.phone"
          :diaCode="diaCode"
          :validPhone="$v.formData.phone"
          @onDiaCode="countryChanged"
        />

        <div class="form-group form-group_submit">
          <button
            class="button button_w-100 button_theme-default button_size-m"
            @click.prevent="resetPassword"
          >
            Continue
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
    },
  },
  data: () => ({
    formData: {
      phone: null,
    },
    diaCode: '',
  }),
  computed: {
    getClassByLengthCountryCode() {
      return `code-length-${this.diaCode.length}`;
    },
  },
  methods: {
    prepareDataForRequest() {
      const phone = `+${this.diaCode}${this.formData.phone}`
        .replace(/\s/g, '');

      return { phone };
    },
    countryChanged(data) {
      this.diaCode = data.dialCode;
    },
    resetPassword() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const data = this.prepareDataForRequest();

        this.$store.dispatch('auth/resetPasswordRequest', data).then(() => {
          this.$router.push('enter-security-code');
        });
      }
    },
  },
};
</script>
