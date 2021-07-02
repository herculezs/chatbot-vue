<template>
  <div class="change-user-details">
    <div v-if="!pagePhoneConfirm">
      <h1 class="h4 text-center mb-6">Change details</h1>
      <div class="selects-data">
        <div class="select-phone">
          <v-checkbox
            v-model="showPhone"
            label="New Phone number"
            hide-details
            input-value="1"
          >
          </v-checkbox>
        </div>
        <div class="select-email">
          <v-checkbox
            v-model="showEmail"
            label="New email"
            hide-details
          ></v-checkbox>
        </div>
      </div>
      <br/>
      <div class="form-change-details">
        <form class="form">
          <TelInput
            v-if="showPhone"
            v-model="formData.phone"
            :diaCode="formData.diaCode"
            :validPhone="$v.formData.phone"
            @onDiaCode="countryChanged"
            :placeHolder="configEnv.onboarding.placeholderPhoneRegistration"
            :defaultCountry="getCountryCode"
            :autoDefaultCountry="true"
            :enableCountryCode="false"
          ></TelInput>
          <div>
            <input
              v-if="showEmail"
              class="form__input"
              placeholder="Email"
              type="text"
              v-model="formData.email"
            />
          </div>
          <div class="form-group form-group_submit" v-if="showEmail || showPhone">
            <button
              class="button button_w-100 button_theme-default button_size-m"
              @click.prevent="updateUserData"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
    <PhoneNumberConfirmation v-else :objectRequest="objectRequest"
    ></PhoneNumberConfirmation>
  </div>
</template>

<script>
import configEnv from '@configEnv';
import { validationMixin } from 'vuelidate';
import TelInput from '@components/InputTel/TelInput.vue';
import PhoneNumberConfirmation from '@components/UserDetailsComponents/PhoneNumberConfirmation.vue';

const { required } = require('vuelidate/lib/validators');


const mustBeCool = (emailValid) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(emailValid).toLowerCase());
};


export default {
  name: 'ChangeUserDetailsForm',
  mixins: [validationMixin],
  components: {
    PhoneNumberConfirmation,
    TelInput,
  },
  props: {
    oldPhoneNumber: {
      types: String,
    },
  },
  data: () => ({
    configEnv,
    showEmail: false,
    showPhone: true,
    updatedTimeOut: false,
    smsCode: null,
    pagePhoneConfirm: false,
    objectRequest: null,
    formData: {
      phone: '',
      email: null,
      diaCode: '',
      isoCountryCode: '',
    },
  }),
  validations: {
    formData: {
      phone: {
        required,
      },
      email: {
        required,
        mustBeCool,
      },
    },
  },
  watch: {
    formData: {
      // eslint-disable-next-line no-unused-vars
      handler() {
        if (this.formData.phone.length > 5) {
          this.updatePhoneData();
        }
      },
      deep: true,
    },
  },
  computed: {
    getCountryCode() {
      return configEnv.onboarding.defaultStatePhone;
    },
  },
  methods: {
    countryChanged(data) {
      this.formData.isoCountryCode = data.iso2;
      this.formData.diaCode = data.dialCode;
    },
    updatePhoneData() {
      clearTimeout(this.updatedTimeOut);
      this.updatedTimeOut = setTimeout(() => {
        if (this.formData.phone && this.formData.diaCode) {
          this.formData.phone = this.formData.phone.replace(`+${this.formData.diaCode}`, '');
        }
      }, 50);
    },
    updateUserData() {
      if (!this.showPhone) {
        this.formData.phone = '';
      }

      if (!this.showEmail) {
        this.formData.email = '';
      }
      const formPhone = this.formData.phone;

      let data = {
        oldPhoneNumber: this.oldPhoneNumber,
      };
      const s = this.formData.phone.replace(`+${this.formData.diaCode}`, '');

      const newPhoneNumber = `+${this.formData.diaCode}${formPhone.charAt(0) === '0' ? formPhone.substring(1) : formPhone}`.replace(/\s/g, '');

      if (s && this.formData.email) {
        data = {
          oldPhoneNumber: this.oldPhoneNumber,
          newEmail: this.formData.email.toLowerCase(),
          newPhoneNumber,
          codeCountry: `+${this.formData.diaCode}`,
          isoCountryCode: this.formData.isoCountryCode,
        };
        this.$api.auth.sendSmsToCheckPhoneNumber(data).then(() => {
          this.pagePhoneConfirm = true;
          this.objectRequest = data;
        });
      } else if (this.formData.email) {
        data.newEmail = this.formData.email.toLowerCase();

        this.$api.auth.updateUserDetails(data).then(() => {
          this.$router.push({ path: '/login' });
        });
      } else if (s) {
        data.codeCountry = `+${this.formData.diaCode}`;
        data.isoCountryCode = this.formData.isoCountryCode;
        data.newPhoneNumber = newPhoneNumber;

        this.$api.auth.sendSmsToCheckPhoneNumber(data).then(() => {
          this.pagePhoneConfirm = true;
          this.objectRequest = data;
        });
      }
    },
  },
};
</script>

<style lang="scss">
  .change-user-details .v-label {
    margin: 0;
  }

  .change-user-details .v-input--selection-controls__input .v-icon {
    color: $bgCardColor1;
  }

  .change-user-details .v-input--selection-controls__ripple {
    color: $bgCardColor1 !important;
  }

  .select-phone {
    display: inline-block;
    margin-right: 10%;
  }
  .select-email {
    display: inline-block;
  }
  .form-change-details {
    width: 100%;
  }
  .selects-data {
    height: 100%;
    width: 100%;
  }
</style>
