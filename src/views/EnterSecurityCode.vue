<template>
  <div class="enter-security-code">
    <Content>
      <h1 class="h4 text-center mb-3">Enter security code</h1>
      <div class="text text-center mb-4">
        Please check your phone for SMS with your security code
      </div>
      <form class="form">
        <div
          class="form-group input_enter_code"
          :class="{'form-group-error': $v.formData.code.$error}"
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
          <span class="resent-code-text" @click="redirectToRegistration">
            {{labelResentCode}}
          </span>
        </div>
        <div class="form-group form-group_submit">
          <button
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
import isFreeVersion from '@helpers/func';

const { required } = require('vuelidate/lib/validators');

export default {
  components: {
    Content,
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
    labelResentCode: 'Not received code',
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
    redirectToRegistration() {
      if (isFreeVersion()) {
        this.$router.push({
          name: 'registration',
        });
      } else {
        this.$router.push({
          name: 'main',
          params: {
            slide: 3,
          },
        });
      }
    },
  },
};
</script>


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
