<template>
  <VueSlickCarousel
    v-bind="carousel.settings"
    class="onBoarding-carousel"
    @beforeChange="changeSlide"
    ref="slickCarousel"
  >
    <div class="onBoarding-carousel__slide">
      <video
        class="onBoarding__video onBoarding__video_step1"
        ref="videoRef1"
        src="../../assets/step1_animation.mp4"
        loop
        muted="muted"
        type="video/mp4"
      >
      </video>
      <div class="text-center">
        <button
          class="button button_w-100
          button_theme-default button_size-m
          onBoarding-carousel__button"
          @click.prevent="gotToSlide(2)"
        >
          Get starter
        </button>
        <router-link to="/login">
          <button class="button button_theme-transparent-default button_size-m">
            Sign in
          </button>
        </router-link>

      </div>
    </div>
    <div class="onBoarding-carousel__slide">
        <video
          class="onBoarding__video onBoarding__video_step2"
          ref="videoRef2"
          src="../../assets/step2_animation.mp4"
          loop
          muted="muted"
          type="video/mp4"
        >
        </video>
      <div class="title onBoarding__titl text-center mb-4">
        Questions!
      </div>
      <div class="text onBoarding__tex text-center mb-3">
        Step 1: Answer 16 quick questions and receive your first report.
      </div>
      <div class="text onBoarding__tex text-center mb-5">
        Step 2: Ask your contacts to answer 16 quick questions
        about you to receive a comparative report.
      </div>
      <button
        class="button button_w-100
        button_theme-default button_size-m"
        @click.prevent="gotToSlide(2)"
      >
        Next
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
        <div
          class="form-group"
          :class="{'form-group-error': $v.formData.name.$error}"
        >
          <vue-tel-input
            class="form__input-tel"
            :class="getClassByLengthCountryCode"
            defaultCountry="GB"
            placeholder="65 243 236"
            enabledCountryCode
            validCharactersOnly
            @input="changeTel"
            @country-changed="countryChanged"
            v-model="formData.phone"
          >
            <template slot="arrow-icon">
              <span class="form__input-tel-arrow-icon">
                ⌄
              </span>
            </template>
          </vue-tel-input>
          <template v-if="$v.formData.phone.$error">
            <div
              class="form__input-error"
              v-if="!$v.formData.phone.required"
            >
              Field is required
            </div>
          </template>
        </div>
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
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel';
import { validationMixin } from 'vuelidate';

const { required } = require('vuelidate/lib/validators');

export default {
  components: {
    VueSlickCarousel,
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
  mounted() {
    this.$nextTick(() => {
      this.playVideo(this.currentPage);
    });
  },
  methods: {
    changeTel(test, isValid) {
      this.formData.phone = isValid.number.input;
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
    playVideo(currentSlide, prevSlide) {
      const currentVideo = this.$refs[this.carousel.refBySlide[currentSlide]];
      const prevVideo = this.$refs[this.carousel.refBySlide[prevSlide]];

      if (currentVideo) currentVideo.play();
      if (prevVideo) prevVideo.pause();
    },
    changeSlide(prevSlide, nextSlide) {
      this.playVideo(nextSlide, this.currentPage);
      this.currentPage = nextSlide;
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
    margin: 0 -24px;
    height: calc(100vh - 19vh); //150px
    min-height: 450px;
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
    .slick-dots li button:before{
      font-size: 12px;
      color: #fff;
      opacity: 1;
    }
    .slick-dots li.slick-active button:before{
      color: $mnColor2
    }
  }

  .onBoarding{
    background-color: $bgColor1;
  }
  .onBoarding__video{
   /* width: 100%;
    margin: -40px auto 30px;*/
    margin: 0 auto 3.75vh;
    padding-top: 10%;
    display: block;
  }
  .onBoarding__video_step1{
    height: 50vh;
  }
  .onBoarding__video_step2{
    height: 36vh;
    @media (max-height: $xsMaxHeight) {
      height: 28vh;
    }
  }
  /*.slide-details{*/
  /*  display: flex;*/
  /*  flex-direction: column;*/
  /*}*/
  .slide-details__button{
    margin-top: auto;
  }

  .form__input-tel.code-length-3{
     .vti__input{
       padding-left: 62px;
     }
  }

  .form__input-tel.code-length-4{
     .vti__input{
       padding-left: 67px;
     }
  }

</style>
