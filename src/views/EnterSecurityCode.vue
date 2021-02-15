<template>
  <div class="enter-security-code">
    <Content>
      <h1 class="h4 text-center mb-3">Enter security code</h1>
      <div class="text text-center mb-4">
        Please check your phone for SMS with your security code
      </div>
      <form class="form">
        <div v-if="resentCode" class="form-group form-group_submit">
          <TelInput
            v-model="formDataPhone.phone"
            :diaCode="formDataPhone.diaCode"
            :validPhone="$v.formDataPhone.phone"
            @onDiaCode="countryChanged"
            :placeHolder="configEnv.onboarding.placeholderPhone"
            :defaultCountry="configEnv.onboarding.defaultStatePhone"
          >
          </TelInput>
        </div>
        <div
          class="form-group input_enter_code"
          :class="{'form-group-error': $v.formData.code.$error}"
          v-else
        >
          <input
            class="form__input"
            placeholder="Enter code"
            v-model="formData.code"
          />
          <template v-if="$v.formData.code.$error">
            <div
              class="form__input-error"
              v-if="!$v.formData.code.required"
            >
              Field is required
            </div>
          </template>
        </div>
        <div class="resent-code">
<!--       <span class="resent-code-text" @click.prevent="sendNewSmsCode" v-if="countDown === 0">-->
<!--            Resend code?-->
<!--          </span>-->
<!--          <span class="resent-code-text-timer" v-else>-->
<!--            Resend code will be available in {{countDown}} seconds-->
<!--          </span>-->
          <span class="resent-code-text" @click.prevent="redirectToMainPage">
            {{labelResentCode}}
          </span>
        </div>
        <div class="form-group form-group_submit">
          <button v-if="resentCode"
            class="form button button_w-100 button_theme-default button_size-m"
            @click.prevent="updatePhoneNumberSubmit"
          >
            Continue
          </button>
          <button v-else
            class="form button button_w-100 button_theme-default button_size-m"
            @click.prevent="submit"
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
import { mapGetters } from 'vuex';
import Content from '@components/Content/Content.vue';
import configEnv from '@configEnv';
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
      code: {
        required,
      },
    },
    formDataPhone: {
      phone: {
        required,
      },
    },
  },
  data: () => ({
    configEnv,
    formData: {
      code: null,
    },
    formDataPhone: {
      diaCode: '',
      phone: '',
    },
    countDown: 0,
    firstTime: true,
    resentCode: false,
    labelResentCode: 'Not received code?',
  }),
  computed: {
    ...mapGetters({
      getProfile: 'auth/getProfile',
    }),
  },
  methods: {
    countryChanged(data) {
      this.formDataPhone.diaCode = data.dialCode;
    },
    submit() {
      this.$v.formData.$touch();
      if (!this.$v.formData.$invalid) {
        // eslint-disable-next-line no-underscore-dangle
        this.$store.dispatch('auth/setSecurityCode', this.formData)
          .then(() => {
            this.$router.push('create-new-password');
          });
        // this.$api.auth.validateCode(this.formData, this.getProfile.id).then(() => {
        //   this.$router.push('create-new-password');
        // });
      }
    },
    updatePhoneNumberSubmit() {
      this.$v.formDataPhone.$touch();
      if (!this.$v.formDataPhone.$invalid) {
        const formPhone = this.formDataPhone.phone;
        const phone = `+${this.formDataPhone.diaCode}${formPhone.charAt(0) === '0' ? formPhone.substring(1) : formPhone}`
          .replace(/\s/g, '');
        // eslint-disable-next-line no-underscore-dangle
        this.$store.dispatch('auth/updatePhoneNumber', phone)
          .then(() => {
            this.resentCode = false;
          })
          .catch(() => {
            this.$router.push('enter-security-code');
          });
      }
    },
    redirectToMainPage() {
      this.resentCode = !this.resentCode;
      if (this.resentCode) {
        this.labelResentCode = 'Resend Code';
      } else {
        this.labelResentCode = 'Not received code?';
      }
    },
  },
};
</script>

<!--// resent code-->
<!--// sendNewSmsCode() {-->
<!--//   if (this.countDown === 0) {-->
<!--//     this.$api.auth.newCode(this.getProfile.id);-->
<!--//     this.countDown = 60;-->
<!--//     this.countDownTimer();-->
<!--//   }-->
<!--// },-->
<!--// countDownTimer() {-->
<!--//   if (this.countDown > 0) {-->
<!--//     setTimeout(() => {-->
<!--//       this.countDown -= 1;-->
<!--//       this.countDownTimer();-->
<!--//     }, 1000);-->
<!--//   }-->
<!--// },-->

<style lang="scss">
  .resent-code {
    float: right;
    margin-bottom: 15px;
  }
  .resent-code-text {
    cursor: pointer;
    color: $lnkColor2;
    font-family: Montserrat,sans-serif;
  }
  .resent-code-text-timer {
    color: $lnkColor2;
    font-family: Montserrat,sans-serif;
  }
  .resent-code-text:active {
    cursor: pointer;
    color: $activeLnkColor2;
  }
  .input_enter_code {
    margin-top: 32px;
  }
</style>
