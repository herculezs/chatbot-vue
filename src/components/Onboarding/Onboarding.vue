<template>
  <div class="onBoarding-carousel">

    <VueSlickCarousel
      v-bind="carousel.settings"
      ref="slickCarousel"
    >
      <div class="onBoarding-carousel__slide">
        <img class="onBoarding__video onBoarding__video_step1"
             :src="step1" alt="video">
        <div class="text-center">
          <button
            class="button button_w-100
          button_theme-default button_size-m
          onBoarding-carousel__button"
            @click.prevent="gotToSlide(1)"
          >
            {{ configEnv.onboarding.buttonOnFirstPage }}
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
          {{ configEnv.onboarding.step1 }}
        </div>
        <div class="text onBoarding__tex text-center mb-3">
          {{ configEnv.onboarding.step2 }}
        </div>
        <button
          class="button button_w-100
        button_theme-default button_size-m"
          @click.prevent="redirectFreeVersion()"
        >
          Start
        </button>
      </div>
      <div class="onBoarding-carousel__slide" v-if="isFreeV">
        <RegistrationPage @show-modal-strange="showModalStrange = $event"
                          ref="registrationPage"
                          :afterCompleteQuiz="true">
        </RegistrationPage>
      </div>
    </VueSlickCarousel>
    <TermsConditionsModal />
    <PolicyModal />
    <ReCaptchaModal :show-window-modal="showModalStrange"
                    :update-recaptcha="this.$refs.registrationPage"></ReCaptchaModal>
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
import PolicyModal from '@components/Modals/PolicyModal.vue';
import TermsConditionsModal from '@components/Modals/TermsConditionsModal.vue';
import configEnv from '@configEnv';
import { mapGetters } from 'vuex';
import isFreeVersion from '@helpers/func';
import RegistrationPage from '@components/Onboarding/RegistrationPage.vue';
import ReCaptchaModal from '@components/Modals/ReCaptchaModal.vue';
import step1 from '../../assets/step_1.gif';

export default {
  components: {
    VueSlickCarousel,
    PolicyModal,
    TermsConditionsModal,
    RegistrationPage,
    ReCaptchaModal,
  },
  data: () => ({
    configEnv,
    step1,
    showModalStrange: false,
    allMonths: ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'],
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
    ...mapGetters({
      getPersonalityTest: 'invitation/getPersonalityTest',
      getProfile: 'auth/getProfile',
    }),
    isFreeV() {
      return !isFreeVersion();
    },
  },
  mounted() {
    this.initialSlider();
  },
  methods: {
    initialSlider() {
      const { slide } = this.$route.params;

      if (slide) {
        this.gotToSlide(slide);
      }
    },
    redirectFreeVersion() {
      if (isFreeVersion()) {
        this.$router.push('questionnaire');
      } else {
        this.gotToSlide(2);
      }
    },
    gotToSlide(numberSlide) {
      // eslint-disable-next-line no-new-wrappers
      this.$refs.slickCarousel.goTo(numberSlide);
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
</style>
