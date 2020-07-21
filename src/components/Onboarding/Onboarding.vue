<template>
  <carousel
    :per-page="carousel.options.perPage"
    :mouse-drag="carousel.options.mouseDrag"
    :paginationActiveColor="carousel.options.paginationActiveColor"
    :paginationColor="carousel.options.paginationColor"
    class="onBoarding-carousel"
    @pageChange="changeSlide"
  >
    <slide>
      <video
        class="onBoarding__video"
        ref="videoRef1"
        src="../../assets/step1_animation.mp4"
        loop
        muted="muted"
        type="video/mp4"
      >
      </video>
      <div class="title onBoarding__title">
        Welcome!
      </div>
      <div class="text onBoarding__text">
        I’m here to help you understand more about yourself and others.
      </div>
      <button class="button button_w-100 button_theme-default button_size-m">Get starter</button>
    </slide>
    <slide>
        <video
          class="onBoarding__video"
          ref="videoRef2"
          src="../../assets/step2_animation.mp4"
          loop
          muted="muted"
          type="video/mp4"
        >
        </video>
      <div class="title onBoarding__title">
        Questions!
      </div>
      <div class="text text_br-indent text-center">
        First, I will ask you scenario-based questions and give you report.
      </div>
      <div class="text onBoarding__text">
        Then, I will ask you to share a special link with your friends so we can
        find out how they think you would react in certain scenarios too.
      </div>
      <button class="button button_w-100 button_theme-default button_size-m">Next</button>
    </slide>
    <slide class="slide-details">
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
            v-model="formData.phone"
            defaultCountry="GB"
            placeholder="65 243 236"
            enabledCountryCode
            validCharactersOnly
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
        class="button button_w-100 button_theme-default button_size-m slide-details__button"
        @click.prevent="start"
      >
        Start
      </button>
      <div class="caption button__caption text-center">
        By using our service, you consent to our Privacy
        Policy and agree to its terms which can be found on our website - 3-60.me
      </div>
    </slide>
  </carousel>
</template>

<script>
import { validationMixin } from 'vuelidate';

const { required } = require('vuelidate/lib/validators');

export default {
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
    },
    carousel: {
      options: {
        perPage: 1,
        mouseDrag: true,
        paginationActiveColor: '#009AF0',
        paginationColor: '#fff',
      },
      refBySlide: {
        0: 'videoRef1',
        1: 'videoRef2',
      },
    },
    currentPage: 0,
  }),
  mounted() {
    this.$nextTick(() => {
      this.playVideo(this.currentPage);
    });
  },
  methods: {
    start() {
      this.$v.$touch();
      if (!this.$v.$invalid) console.log('some api');
    },
    playVideo(currentSlide, prevSlide) {
      const currentVideo = this.$refs[this.carousel.refBySlide[currentSlide]];
      const prevVideo = this.$refs[this.carousel.refBySlide[prevSlide]];

      if (currentVideo) currentVideo.play();
      if (prevVideo) prevVideo.pause();
    },
    changeSlide(numberSlide) {
      this.playVideo(numberSlide, this.currentPage);
      this.currentPage = numberSlide;
    },
  },
};
</script>

<style lang="scss">
  .onBoarding__title{
    margin-bottom: 24px;
    text-align: center;
  }
  .onBoarding__sub-title{
    margin-bottom: 24px;
  }
  .onBoarding__text{
    text-align: center;
    margin-bottom: 40px;
  }
  .VueCarousel-slide{
    padding: 0 24px 24px;
  }
  .VueCarousel{
    margin: 0 -24px;
  }
  .onBoarding-carousel{
    .VueCarousel-dot, .VueCarousel-dot-container{
      margin-top: 0 !important;
    }
  }
  .onBoarding{
    background-color: $bgColor1;
  }
  .onBoarding__video{
    width: 100%;
    margin: -40px auto 30px;
    padding-top: 10%;
    display: block;
  }
  .slide-details{
    display: flex;
    flex-direction: column;
  }
  .slide-details__button{
    margin-top: auto;
  }

</style>
