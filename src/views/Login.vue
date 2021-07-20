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
            id="login_password"
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
          <router-link to="/confirm-user-details" class="link change-details-link">
            Change details?
          </router-link>
        </div>
        <div class="form-group form-group_submit">
          <button
            class="form button button_w-100 button_theme-default button_size-m"
            @click.prevent="login"
            id="log_in"
          >
            Log in
          </button>
        </div>
      </form>
    </Content>
    <GeoLocationModal :show-window-modal="showInfoModalAboutGeolocation"></GeoLocationModal>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import Content from '@components/Content/Content.vue';
import TelInput from '@components/InputTel/TelInput.vue';
import { mapGetters } from 'vuex';
import configEnv from '@configEnv';
import checkRole from '@helpers/adminFunction';
import differentsServices from '@helpers/differentsServices';
import GeoLocationModal from '@components/Modals/GeoLocationModal.vue';
import isFreeVersion from '@helpers/func';

const { required } = require('vuelidate/lib/validators');

export default {
  components: {
    Content,
    TelInput,
    GeoLocationModal,
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
    showInfoModalAboutGeolocation: false,
    formData: {
      phone: null,
      password: null,
    },
    updatedTimeOut: null,
    countUpdate: 1,
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
  mounted() {
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
  methods: {
    updatePhoneData() {
      clearTimeout(this.updatedTimeOut);
      this.updatedTimeOut = setTimeout(() => {
        if (this.formData.phone && this.diaCode) {
          this.formData.phone = this.formData.phone.replace(`+${this.diaCode}`, '');
        }
      }, 50);
    },
    prepareDataForRequest() {
      const formPhone = this.formData.phone;
      const phone = `+${this.diaCode}${formPhone.charAt(0) === '0' ? formPhone.substring(1) : formPhone}`
        .replace(/\s/g, '');

      let uniqueId = null;
      if (localStorage.getItem('uniqueId') !== null) {
        uniqueId = localStorage.getItem('uniqueId');
      }

      return {
        password: this.formData.password,
        phone,
        uniqueId,
        questionId: process.env.QUESTIONNAIRE_ID,
        fingerPrintData: differentsServices.getClientData(),
      };
    },
    countryChanged(data) {
      this.diaCode = data.dialCode;
    },
    savePhoto(userWithoutPhoto, email, id) {
      if (userWithoutPhoto) {
        differentsServices.avatarPhotoService(email, id);
      }
    },
    async login() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const data = await this.prepareDataForRequest();

        this.$store.dispatch('auth/loginRequest', data).then(async () => {
          const {
            completedQuestionnaires, userWithoutPhoto, email, id,
          } = this.getProfile;

          const timeModel = setTimeout(() => {
            this.showInfoModalAboutGeolocation = true;
          }, 300);
          const geolocation = await differentsServices.getGeolocation();
          clearTimeout(timeModel);
          const getGeoData = await differentsServices.requestSearchGeoPosition(geolocation);

          if (getGeoData.allowGetGeolocation) {
            this.$api.auth.updateGeoLocationUsers(getGeoData, true, id);
          } else if (!getGeoData.allowGetGeolocation) {
            this.$api.auth.updateGeoLocationUsers(getGeoData, false, id);
          }

          this.savePhoto(userWithoutPhoto, email, id);

          if (isFreeVersion && (!this.getProfile.userWithCreditCard
            || !this.getProfile.userWithIdentificationCard)) {
            this.$router.push('building-credibility-score');
          } else if (checkRole.isAdmin()) {
            this.$router.push({
              name: 'adminMenu',
            });
          } else if (!completedQuestionnaires.includes(process.env.QUESTIONNAIRE_ID)) {
            this.$router.push('questionnaire-management');
          } else {
            this.$router.replace(this.getRedirectAuth);
          }
        }).catch(() => {
        });
      }
    },
  },
};

</script>

<style lang="scss">
  .reset-password input {
    background-color: white;
  }
  button:focus {
    border: 2px solid #66afe9;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6);
  }
  .change-details-link {
    float: right;
  }
</style>
