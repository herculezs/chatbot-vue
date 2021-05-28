<template>
  <div class="not-real-phone" data-app>
    <v-dialog
      v-model="openModal"
      min-width="200"
      max-width="400"
      persistent
    >
        <v-card>
          <v-card-title class="headline orange lighten-2">
            Change phone number
          </v-card-title>
          <v-card-text >
            <br/>
            <h4>
              Please enter your real phone number.
            </h4>
            <TelInput
              v-if="!showCodeAndSave"
              v-model="formData.phone"
              :diaCode="formData.diaCode"
              :validPhone="$v.formData.phone"
              @onDiaCode="countryChanged"
              :placeHolder="configEnv.onboarding.placeholderPhone"
              :defaultCountry="getCountryCode">
            </TelInput>
            <div v-if="showCodeAndSave">
              <input
                class="form__input"
                placeholder="Enter code from phone"
                v-model="codeSecurityInput"
              />
              <div class="form__input-error" v-if="invalidCode">Code is not valid</div>
            </div>
            <div class="space" v-else>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              v-if="showCodeAndSave"
              color="primary"
              text
              @click="showCodeAndSave = !showCodeAndSave"
            >
              BACK
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              v-if="!showCodeAndSave"
              class="saveButton"
              color="primary"
              text
              @click="sendCode()"
            >
              SEND CODE
            </v-btn>
            <v-btn
              v-if="showCodeAndSave"
              color="primary"
              class="saveButton"
              text
              @click="updatePhone()"
            >
              SAVE
            </v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
  </div>
</template>

<script>
import configEnv from '@configEnv';
import TelInput from '@components/InputTel/TelInput.vue';
import { mapGetters } from 'vuex';
import { validationMixin } from 'vuelidate';

const {
  required,
} = require('vuelidate/lib/validators');

export default {
  name: 'NotRealPhone',
  components: {
    TelInput,
  },
  data: () => ({
    configEnv,
    codeSecurityNew: '',
    codeSecurityInput: '',
    showCodeAndSave: false,
    openModal: true,
    invalidCode: false,
    formData: {
      phone: null,
      diaCode: '',
      isoCountryCode: '',
    },
  }),
  validations: {
    formData: {
      phone: {
        required,
      },
    },
  },
  mixins: [validationMixin],
  created() {
    if (this.getProfile.phoneReal === null) {
      this.openModal = false;
    } else if (this.getProfile.phoneReal) {
      this.openModal = false;
    } else if (!this.getProfile.phoneReal) {
      this.openModal = true;
    }
  },
  computed: {
    ...mapGetters({
      getProfile: 'auth/getProfile',
      getSecurityCode: 'auth/getSecurityCode',
    }),
    getCountryCode() {
      if (this.getProfile.phone) {
        return this.getProfile.isoCountryCode;
      }
      return configEnv.onboarding.defaultStatePhone;
    },
  },
  methods: {
    sendCode() {
      const formPhone = this.formData.phone;
      const phone = `+${this.formData.diaCode}${formPhone.charAt(0) === '0' ? formPhone.substring(1) : formPhone}`
        .replace(/\s/g, '');

      const updatePhoneNumberDTO = {
        codeCountry: this.formData.diaCode,
        phone,
        isoCountryCode: this.formData.isoCountryCode,
      };

      this.$api.auth.sendCode(updatePhoneNumberDTO).then((x) => {
        if (x !== '') {
          this.showCodeAndSave = true;
          this.codeSecurityNew = `${x}`;
        }
      });
    },
    updatePhone() {
      if (this.codeSecurityInput === this.codeSecurityNew) {
        const formPhone = this.formData.phone;
        const phone = `+${this.formData.diaCode}${formPhone.charAt(0) === '0' ? formPhone.substring(1) : formPhone}`
          .replace(/\s/g, '');

        const updatePhoneNumberDTO = {
          codeCountry: this.formData.diaCode,
          phone,
          isoCountryCode: this.formData.isoCountryCode,
        };

        this.$store.dispatch('auth/updatePhoneNumber', updatePhoneNumberDTO).then(() => {
          this.openModal = false;
        }).catch(() => {

        });
      } else {
        this.invalidCode = true;
      }
    },
    countryChanged(data) {
      this.formData.isoCountryCode = data.iso2;
      this.formData.diaCode = data.dialCode;
    },
  },
};
</script>

<style lang="scss">
  .not-real-phone .space {
    height: 70px;
  }
  .saveButton {
    color: rgba(4, 131, 65, 0.78) !important;
  }
</style>
