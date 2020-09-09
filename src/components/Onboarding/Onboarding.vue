<template>
  <div class="onBoarding-carousel">
    <VueSlickCarousel
      v-bind="carousel.settings"
      adaptiveHeight
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
          <router-link to="/login">
            <button class="button button_theme-transparent-default button_size-m">
              Sign in
            </button>
          </router-link>

        </div>
      </div>
      <div class="onBoarding-carousel__slide">
        <img class="onBoarding__video onBoarding__video_step2"
             src="../../assets/step_2.gif" alt="video">
        <div class="title onBoarding__titl text-center mb-4">
          Questions!
        </div>
        <div class="text onBoarding__tex text-center mb-3">
          Step 1: Answer 16 quick questions and receive your first report.
        </div>
        <div class="text onBoarding__tex text-center mb-3">
          Step 2: Ask your contacts to answer 16 quick questions
          about you to receive a comparative report.
        </div>
        <button
          class="button button_w-100
        button_theme-default button_size-m"
          @click.prevent="gotToSlide(2)"
        >
          Register
        </button>
      </div>
      <div class="onBoarding-carousel__slide">
        <div class="title onBoarding__title">
          Details
        </div>
        <div class="sub-title text-center onBoarding__sub-title">
          What shall I call you?
        </div>
        <form class="form">
          <div
            class="form-group"
            :class="{'form-group-error': $v.formData.name.$error}"
          >
            <input
              class="form__input"
              placeholder="Your name"
              v-model="formData.name"
            />
            <template v-if="$v.formData.name.$error">
              <div
                class="form__input-error"
                v-if="!$v.formData.name.required"
              >
                Field is required
              </div>
            </template>
          </div>
          <TelInput
            v-model="formData.phone"
            :diaCode="formData.diaCode"
            :validPhone="$v.formData.phone"
            @onDiaCode="countryChanged"
          />

          <div class="caption text-center">
            We need your phone number so we
            can notify you of the results. We won’t contact you otherwise.
          </div>
        </form>

        <button
          class="button button_w-100 button_theme-default
        button_size-m slide-details__button"
          @click.prevent="start"
        >
          Start
        </button>
        <div class="caption onBoarding-carousel-button__caption text-center">
          By using our service, you consent to our Privacy
          Policy and agree to its terms which can be found on our website - 3-60.me
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

const { required } = require('vuelidate/lib/validators');

export default {
  components: {
    VueSlickCarousel,
    TelInput,
    PolicyModal,
    TermsConditionsModal,
  },
  mixins: [validationMixin],
  validations: {
    formData: {
      name: {
        required,
      },
      phone: {
        required,
      },
    },
  },
  data: () => ({
    formData: {
      phone: null,
      name: '',
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
  methods: {
    gotToSlide(numberSlide) {
      this.$refs.slickCarousel.goTo(numberSlide);
    },
    countryChanged(data) {
      this.formData.diaCode = data.dialCode;
    },
    prepareDataForRequest() {
      const phone = `+${this.formData.diaCode}${this.formData.phone}`
        .replace(/\s/g, '');

      return {
        name: this.formData.name,
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
    margin-bottom: 3vh;
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
  }

  .onBoarding-carousel{
    display: flex;
    flex-direction: column;
    margin: 0 -24px;
    height: calc(100vh - 17vh); //150px
    min-height: 530px;
    .slick-list,
    .slick-track,
    .slick-slide,
    .slick-slide > div,
    .onBoarding-carousel__slide {
      height: 100% !important;
    }
    .onBoarding-carousel__slide{
      display: flex !important;
      flex-direction: column;
      justify-content: space-between;
    }
    .slick-slide{
      padding: 0 24px 24px;
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
    background-color: #fefcff;
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
    height: 30vh;
    @media (max-height: $xsMaxHeight) {
      height: 25vh;
    }
  }
  /*.slide-details{*/
  /*  display: flex;*/
  /*  flex-direction: column;*/
  /*}*/
  .slide-details__button{
    margin-top: auto;
  }

</style>
