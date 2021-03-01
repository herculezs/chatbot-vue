<template>
  <div class="registration container">
  <Content>
    <div v-if="afterCompleteQuiz">
      <div class="title onBoarding__title">
        Details
      </div>
      <div class="first_report caption text-center mb-3">
        We need your details so we can notify you of your results.
        We won’t contact you otherwise
        <br/>
        <br/>
        <b>Any answers you give about others will be <b>totally anonymous</b>
          to everyone in the company</b>
        <br/>
      </div>
    </div>
      <form class="form">
        <div class="form-group">
          <div
            class="form__input_for_icon"
            :class="{'form-group-error': $v.formData.firstName.$error}"
          >
            <input
              class="form__input"
              placeholder="First name"
              v-model="formData.firstName"
            />
            <InformationForm
              icon="user-alt"
              size="1x"
              :tooltip="'Your first name'">
            </InformationForm>
          </div>
          <template v-if="$v.formData.firstName.$error">
            <div
              class="form__input-error"
              v-if="!$v.formData.firstName.required"
            >
              Field is required
            </div>
          </template>
        </div>
        <div class="form-group">
          <div
            class="form__input_for_icon"
            :class="{'form-group-error': $v.formData.surname.$error}"
          >
            <input
              class="form__input"
              placeholder="Last Name"
              v-model="formData.surname"
            />
            <InformationForm
              icon="user-alt"
              size="1x"
              :tooltip="'Your last name'">
            </InformationForm>
          </div>
          <template v-if="$v.formData.surname.$error">
            <div
              class="form__input-error"
              v-if="!$v.formData.surname.required"
            >
              Field is required
            </div>
          </template>
        </div>
        <div class="form-group">
          <div
            class="form__input_for_icon"
            :class="{'form-group-error': $v.formData.youEmail.$error}"
          >
            <input
              class="form__input form__input_for_icon"
              :placeholder="configEnv.onboarding.emailPlaceHolder"
              v-model="formData.youEmail"
            />
            <InformationForm
              icon="envelope"
              size="1x"
              :tooltip="configEnv.onboarding.tooltipEmail">
            </InformationForm>
          </div>
          <template v-if="$v.formData.youEmail.$error">
            <div
              class="form__input-error"
              v-if="!$v.formData.youEmail.mustBeCool"
            >
              Check correct email
            </div>
          </template>
        </div>
        <!--          <div-->
        <!--            class="form-group flex-default-gap"-->
        <!--            :class="{'form-group-error': $v.formData.month.$error}"-->
        <!--          >-->
        <!--            <select required-->
        <!--                    class="form__input select-month"-->
        <!--                    v-model="formData.month"-->
        <!--            >-->
        <!--              <option value="undefined" disabled selected hidden>Month</option>-->
        <!--              <option :value="index" v-for="(month, index) in allMonths"
         :key="month">-->
        <!--                {{month}}-->
        <!--              </option>-->
        <!--            </select>-->

        <!--            <input class="form__input"-->
        <!--                   placeholder="Day"-->
        <!--                   v-model="formData.day"-->
        <!--            />-->
        <!--            <input class="form__input"-->
        <!--                   placeholder="Year"-->
        <!--                   v-model="formData.year"-->
        <!--            />-->

        <!--          </div>-->
        <!--          <div class="form-group flex-default-gap error-group-section">-->

        <!--            <div class="full-width">-->

        <!--              <template v-if="$v.formData.month.$error">-->
        <!--                <div-->
        <!--                        class="form__input-error"-->
        <!--                        v-if="!$v.formData.month.required">-->
        <!--                  Month is required-->
        <!--                </div>-->
        <!--              </template>-->
        <!--            </div>-->

        <!--            <div class="full-width">-->

        <!--              <template v-if="$v.formData.day.$error">-->
        <!--                <div-->
        <!--                        class="form__input-error"-->
        <!--                        v-if="!$v.formData.day.required">-->
        <!--                  Day is required-->
        <!--                </div>-->
        <!--                <div-->
        <!--                        class="form__input-error"-->
        <!--                        v-if="!$v.formData.day.minValue ||
         !$v.formData.day.maxValue">-->
        <!--                  Must be from 1 to 31-->
        <!--                </div>-->

        <!--              </template>-->
        <!--            </div>-->

        <!--            <div class="full-width">-->

        <!--              <template v-if="$v.formData.year.$error">-->
        <!--                <div-->
        <!--                        class="form__input-error"-->
        <!--                        v-if="!$v.formData.year.required">-->
        <!--                  Year is required-->
        <!--                </div>-->
        <!--                <div-->
        <!--                        class="form__input-error"-->
        <!--                        v-if="!$v.formData.year.minValue ||
         !$v.formData.year.maxValue">-->
        <!--                  From 1900 to {{new Date().getFullYear()}}-->
        <!--                </div>-->
        <!--              </template>-->
        <!--            </div>-->

        <!--              <template v-if="$v.formData.year.$error">-->
        <!--                <div-->
        <!--                        class="form__input-error"-->
        <!--                        v-if="!$v.formData.year.required">-->
        <!--                  Year is required-->
        <!--                </div>-->
        <!--                <div-->
        <!--                        class="form__input-error"-->
        <!--                        v-if="!$v.formData.year.minValue ||
         !$v.formData.year.maxValue">-->
        <!--                  From 1900 to {{new Date().getFullYear()}}-->
        <!--                </div>-->
        <!--              </template>-->
        <!--            </div>-->

        <!--          </div>-->


        <TelInput
          v-model="formData.phone"
          :diaCode="formData.diaCode"
          :validPhone="$v.formData.phone"
          @onDiaCode="countryChanged"
          :placeHolder="configEnv.onboarding.placeholderPhone"
          :defaultCountry="getCountryCode"
        >

        </TelInput>
      </form>
    <div v-if="!afterCompleteQuiz" class="reg-notification">
      <span class="registration-text">We will send your mobile phone a verification code</span>
    </div>
      <button
        class="button button_w-100 button_theme-default
        button_size-m slide-details__button"
        @click.prevent="start"
        :disabled="disableSendCode"
      >
        Send Code
      </button>
      <div class="caption onBoarding-carousel-button__caption text-center">
        By using our service, you consent to our Privacy Policy and Terms and Conditions below
      </div>
    <TermsConditionsModal />
    <PolicyModal />
    <div class="footer-menu">
      <ul class="footer-menu__list">
        <li class="footer-menu__item">
          <span v-b-modal.modal-terms>
            Terms & Conditions
          </span>
        </li>
        <li class="footer-menu__item">
          <span v-b-modal.modal-policy>
             Privacy Policy
          </span>
        </li>
      </ul>
    </div>

  </Content>
  </div>
</template>

<script>

import InformationForm from '@components/Onboarding/InformationForm.vue';
import TelInput from '@components/InputTel/TelInput.vue';
import configEnv from '@configEnv';
import { mapGetters } from 'vuex';
import { validationMixin } from 'vuelidate';
import PolicyModal from '@components/Modals/PolicyModal.vue';
import TermsConditionsModal from '@components/Modals/TermsConditionsModal.vue';

// numeric, minValue, maxValue,
const {
  required,
} = require('vuelidate/lib/validators');

const mustBeCool = (emailValid) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(emailValid).toLowerCase());
};


export default {
  name: 'RegistrationPage',
  components: {
    InformationForm,
    TelInput,
    PolicyModal,
    TermsConditionsModal,
  },
  props: {
    afterCompleteQuiz: {
      type: Boolean,
    },
  },
  data: () => ({
    configEnv,
    disableSendCode: false,
    formData: {
      phone: null,
      firstName: '',
      surname: '',
      youEmail: '',
      department: '',
      role: '',
      managerEmail: '',
      month: undefined,
      day: undefined,
      year: undefined,
      diaCode: '',
      isoCountryCode: '',
    },
  }),
  validations: {
    formData: {
      firstName: {
        required,
      },
      youEmail: {
        required,
        mustBeCool,
      },
      surname: {
        required,
      },
      // month: {
      //   required,
      // },
      // day: {
      //   required,
      //   numeric,
      //   minValue: minValue(1),
      //   maxValue: maxValue(31),
      // },
      // year: {
      //   required,
      //   numeric,
      //   minValue: minValue(1900),
      //   maxValue: maxValue(new Date().getFullYear()),
      // },
      phone: {
        required,
      },
    },
  },
  mixins: [validationMixin],
  computed: {
    ...mapGetters({
      getPersonalityTest: 'invitation/getPersonalityTest',
      getProfile: 'auth/getProfile',
    }),

    getClassByLengthCountryCode() {
      return `code-length-${this.formData.diaCode.length}`;
    },
    getCountryCode() {
      if (this.getProfile.phone) {
        return this.getProfile.isoCountryCode;
      }
      return configEnv.onboarding.defaultStatePhone;
    },
  },
  mounted() {
    this.disableSendCode = false;

    if (this.getProfile.phone) {
      this.formData.firstName = this.getProfile.name;
      this.formData.surname = this.getProfile.lastName;
      this.formData.youEmail = this.getProfile.email;
      this.formData.phone = this.getProfile.phone.replace(this.getProfile.codeCountry, '');
    }
  },
  methods: {
    countryChanged(data) {
      this.formData.isoCountryCode = data.iso2;
      this.formData.diaCode = data.dialCode;
    },
    prepareDataForRequest() {
      const formPhone = this.formData.phone;
      const phone = `+${this.formData.diaCode}${formPhone.charAt(0) === '0' ? formPhone.substring(1) : formPhone}`
        .replace(/\s/g, '');

      let uniqueId = null;
      if (localStorage.getItem('uniqueId') !== null) {
        uniqueId = localStorage.getItem('uniqueId');
      }
      // const currentMonthNumber = this.formData.month + 1;
      return {
        name: this.formData.firstName,
        surname: this.formData.surname,
        youEmail: this.formData.youEmail.toLowerCase(),
        // eslint-disable-next-line radix,max-len
        // dateOfBirth: [this.formData.year, currentMonthNumber < 9 ? `0${currentMonthNumber}` : currentMonthNumber, this.formData.day <= 9 ? `0${parseInt(this.formData.day)}` : parseInt(this.formData.day)].join('-'),
        phone,
        questionId: process.env.QUESTIONNAIRE_ID,
        codeCountry: `+${this.formData.diaCode}`,
        isoCountryCode: this.formData.isoCountryCode,
        uniqueId,
      };
    },
    start() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.disableSendCode = true;
        const data = this.prepareDataForRequest();
        this.$store.dispatch('auth/registerRequest', data).then(() => {
          this.$router.push('enter-security-code');
          this.disableSendCode = false;
        }).catch(() => {
          this.disableSendCode = false;
        });
      }
    },
  },
};
</script>

<style lang="scss">
  .onBoarding__title{
    margin-bottom: 1vh;
    font-size: 3.5vh;
    line-height: 5vh;
    text-align: center;
  }
  .onBoarding__sub-title{
    margin-bottom: 3vh;
  }
  .onBoarding-carousel-button__caption{
    margin-top: 3vh;
  }
  .onBoarding__text{
    text-align: center;
    /*margin-bottom: 40px;*/
    margin-bottom: 4vh;
    font-size: 2.25vh;
    line-height: 3vh;
  }

  /*.onBoarding__button{*/
  /*  font-size: 2vh;*/
  /*  padding: 2.5vh 3.125vh;*/
  /*}*/
  .onBoarding-carousel__button{
    margin-bottom: 4vh;
  @media (max-height: $xxsMaxHeight) {
    margin-bottom: 2vh;
  }
  }

  .onBoarding-carousel{
    display: flex;
    flex-direction: column;
    margin: 0 -24px;
    height: 100%; //150px 17 calc(100vh - 12.5vh)
  /*min-height: 490px;*/
  .slick-list,
  .slick-track,
  .slick-slide,
  .slick-slide > div,
  .onBoarding-carousel__slide {
    /*height: 100% !important;*/
  }
  .onBoarding-carousel__slide{
    display: flex !important;
    flex-direction: column;
    justify-content: space-between;
  }
  .slick-slide{
    padding: 0 24px 24px;
    outline: none !important;
  @media (max-height: $xsMaxHeight) {
    padding-bottom: 20px;
  }
  }
  .slick-dots{
    /*bottom: -15px;*/
    position: static;
  }
  .slick-dots li button:before{
    font-size: 12px;
    color: $mnColor3;
    opacity: 1;
  }
  .slick-dots li.slick-active button:before{
    color: $mnColor2
  }
  }

  .onBoarding{
    background-color: $bgColor1;
    padding-bottom: 0;
    min-height: 100vh;
  .content{
    min-height: 100vh;
  }
  }
  .onBoarding__video{
    /* width: 100%;
     margin: -40px auto 30px;*/
    margin: 0 auto 3.75vh;
    display: block;
  }
  .onBoarding__video_step1{
    height: 45vh;
  }
  .onBoarding__video_step2{
    height: 26vh;
  @media (max-height: $xsMaxHeight) {
    height: 24vh;
  }
  }

  .flex-default-gap {
    display: flex;
    gap: $md-gap;
  /*firefox compatibility fix*/
  .form__input {
    min-width: 0
  }
  }


  .form__input_for_icon {
    position: relative;
    display: flex;

  svg {
    position: absolute;
    top: 35%;
    color: $mnColor2;
    right: 8px;
  }

  }

  .flex-column {
    display: flex;
    width: 100%;
    flex-direction: column;
  }

  .error-group-section {
    margin-top: -24px;
  }
  /*.slide-details{*/
  /*  display: flex;*/
  /*  flex-direction: column;*/
  /*}*/
  .slide-details__button{
    margin-top: auto;
  }

  .select-month {
    -moz-appearance: none;
    background-color: white;
  }
  .first_report {
    font-size: 16px;
  }
  .registration-text{
    font-size: 16px;
    font-family: 'Montserrat',serif;
  }
  .reg-notification {
    margin: 10px 0;
  }
</style>
