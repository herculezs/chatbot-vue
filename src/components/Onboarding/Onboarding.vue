<template>
  <div class="onBoarding-carousel">
    <VueSlickCarousel
      v-bind="carousel.settings"
      ref="slickCarousel"
    >
      <div class="onBoarding-carousel__slide">
        <img class="onBoarding__video onBoarding__video_step1"
             src="../../assets/step_1.gif" alt="video">
        <div class="text-center">
          <button
            class="button button_w-100
          button_theme-default button_size-m
          onBoarding-carousel__button"
            @click.prevent="gotToSlide(1)"
          >
            Find out how
          </button>
        </div>
      </div>
      <div class="onBoarding-carousel__slide">
        <img class="onBoarding__video onBoarding__video_step2"
             src="../../assets/step_2.gif" alt="video">
        <div class="title onBoarding__title text-center mb-4">
          How it works
        </div>
        <div class="text onBoarding__tex text-center mb-3">
          Step 1: You will be 12 quick questions about
          yourself and receive your first report.
        </div>
        <div class="text onBoarding__tex text-center mb-3">
          Step 2: Ask your contacts to answer 12 quick
          questions about you to receive your comparative report.
        </div>
        <button
          class="button button_w-100
        button_theme-default button_size-m"
          @click.prevent="gotToSlide(2)"
        >
          Start
        </button>
      </div>
      <div class="onBoarding-carousel__slide">
        <div class="title onBoarding__title">
          Details
        </div>
        <div class="caption text-center mb-3">
          We need your details so we can notify you of your results.
          We won’t contact you otherwise
          <br/>
          <b>Any answers you give about others will be <b>totally anonymous</b>
            to everyone in the company</b>
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
                placeholder="Work Email"
                v-model="formData.youEmail"
              />
              <InformationForm
                icon="envelope"
                size="1x"
                :tooltip="'Your work email - so we can contact you when you have results!'">
              </InformationForm>
            </div>
            <template v-if="$v.formData.youEmail.$error">
              <div
                class="form__input-error"
                v-if="$v.formData.youEmail.email"
              >
                Check correct email
              </div>
            </template>
          </div>
          <div class="form-group">
            <div
              class="form__input_for_icon"
              :class="{'form-group-error': $v.formData.department.$error}"
            >
              <input
                class="form__input"
                placeholder="Department"
                v-model="formData.department"
              />
              <InformationForm
                :tooltip="'Your work department'"
                icon="user-friends"
                size="1x">
              </InformationForm>
            </div>
            <template v-if="$v.formData.department.$error">
              <div
                class="form__input-error"
                v-if="!$v.formData.department.required"
              >
                Field is required
              </div>
            </template>
          </div>
          <div class="form-group">
            <div
              class="form__input_for_icon"
              :class="{'form-group-error': $v.formData.role.$error}"
            >
              <input
                class="form__input"
                placeholder="Role"
                v-model="formData.role"
              />
              <InformationForm
                :tooltip="'Your role at the company'"
                icon="user-tag"
                size="1x">
              </InformationForm>
            </div>
              <template v-if="$v.formData.role.$error">
                <div
                  class="form__input-error"
                  v-if="!$v.formData.role.required"
                >
                  Field is required
                </div>
              </template>
          </div>
          <div class="form-group">
            <div
              class="form__input_for_icon"
              :class="{'form-group-error': $v.formData.managerEmail.$error}"
            >
              <input
                class="form__input"
                placeholder="Direct Supervisor Email"
                v-model="formData.managerEmail"
              />
              <InformationForm
                icon="envelope"
                size="1x"
                :tooltip="'Your direct supervisor\'s email - DON\'T WORRY:' +
             ' your results are confidential. We need this so we' +
              ' can aggregate the anonymous results accurately'">
              </InformationForm>
            </div>
              <template v-if="$v.formData.managerEmail.$error">
                <div
                  class="form__input-error"
                  v-if="$v.formData.managerEmail.email">
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
<!--              <option :value="index" v-for="(month, index) in allMonths" :key="month">-->
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
<!--                        v-if="!$v.formData.day.minValue || !$v.formData.day.maxValue">-->
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
<!--                        v-if="!$v.formData.year.minValue || !$v.formData.year.maxValue">-->
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
<!--                        v-if="!$v.formData.year.minValue || !$v.formData.year.maxValue">-->
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
            >

            </TelInput>
        </form>

        <button
          class="button button_w-100 button_theme-default
        button_size-m slide-details__button"
          @click.prevent="start"
        >
          Send Code
        </button>
        <div class="caption onBoarding-carousel-button__caption text-center">
          By using our service, you consent to our Privacy Policy and Terms and Conditions below
        </div>
      </div>
    </VueSlickCarousel>
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
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel';
import { validationMixin } from 'vuelidate';
import TelInput from '@components/InputTel/TelInput.vue';
import PolicyModal from '@components/Modals/PolicyModal.vue';
import TermsConditionsModal from '@components/Modals/TermsConditionsModal.vue';
import InformationForm from '@components/Onboarding/InformationForm.vue';

// numeric, minValue, maxValue,
const {
  required, email,
} = require('vuelidate/lib/validators');


export default {
  components: {
    InformationForm,
    VueSlickCarousel,
    TelInput,
    PolicyModal,
    TermsConditionsModal,
  },
  mixins: [validationMixin],
  validations: {
    formData: {
      firstName: {
        required,
      },
      youEmail: {
        required,
        email,
      },
      surname: {
        required,
      },
      department: {
        required,
      },
      role: {
        required,
      },
      managerEmail: {
        required,
        email,
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
  data: () => ({
    allMonths: ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'],
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
    },
    carousel: {
      settings: {
        // perPage: 1,
        // mouseDrag: true,
        // paginationActiveColor: '#009AF0',
        // paginationColor: '#fff',
        arrows: false,
        dots: true,
        dotsClass: 'slick-dots',
        edgeFriction: 0.35,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
      },
      refBySlide: {
        0: 'videoRef1',
        1: 'videoRef2',
      },
    },
    currentPage: 0,
  }),
  computed: {
    getClassByLengthCountryCode() {
      return `code-length-${this.formData.diaCode.length}`;
    },
  },
  mounted() {
    this.initialSlider();
    // eslint-disable-next-line camelcase,no-use-before-define
    const Tawk_API = Tawk_API || {};
    // eslint-disable-next-line camelcase,no-unused-vars
    const Tawk_LoadStart = new Date();
    (function () {
      const s1 = document.createElement('script');
      const s0 = document.getElementsByTagName('script')[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/5f9ad3827f0a8e57c2d83734/default';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    }());
  },
  methods: {
    initialSlider() {
      const { slide } = this.$route.params;

      if (slide) {
        this.gotToSlide(slide);
      }
    },
    gotToSlide(numberSlide) {
      this.$refs.slickCarousel.goTo(numberSlide);
    },
    countryChanged(data) {
      this.formData.diaCode = data.dialCode;
    },
    prepareDataForRequest() {
      const phone = `+${this.formData.diaCode}${this.formData.phone}`
        .replace(/\s/g, '');

      // const currentMonthNumber = this.formData.month + 1;
      return {
        name: this.formData.firstName,
        surname: this.formData.surname,
        youEmail: this.formData.youEmail,
        department: this.formData.department,
        role: this.formData.role,
        managerEmail: this.formData.managerEmail,
        // eslint-disable-next-line radix,max-len
        // dateOfBirth: [this.formData.year, currentMonthNumber < 9 ? `0${currentMonthNumber}` : currentMonthNumber, this.formData.day <= 9 ? `0${parseInt(this.formData.day)}` : parseInt(this.formData.day)].join('-'),
        phone,
      };
    },
    start() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const data = this.prepareDataForRequest();
        this.$store.dispatch('auth/registerRequest', data).then(() => {
          this.$router.push('enter-security-code');
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
    background-color: #fdf9fe;
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

</style>
