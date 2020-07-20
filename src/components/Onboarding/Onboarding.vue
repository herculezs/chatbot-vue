<template>
  <carousel
    :per-page="1"
    :mouse-drag="true "
    paginationActiveColor="#009AF0"
    paginationColor="#fff"
  >
    <slide>
      <video
        class="onBoarding__video"
        ref="videoRef"
        src="../../assets/step1_animation.mp4"
        loop
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
<!--      <video-->
<!--        class="onBoarding__video"-->
<!--        ref="videoRef"-->
<!--        src="../../assets/step2_animation.mp4"-->
<!--        loop-->
<!--      >-->
<!--      </video>-->
      <div class="title onBoarding__title">
        Questions!
      </div>
      <div class="text onBoarding__text">
        First, I will ask you scenario-based questions and give you report.
      </div>
      <div class="text onBoarding__text">
        Then, I will ask you to share a special link with your friends so we can
        find out how they think you would react in certain scenarios too.
      </div>
      <button class="button button_w-100 button_theme-default button_size-m">Next</button>
    </slide>
    <slide>
      <div class="form">
        <ValidationProvider v-slot="v">
          <input v-model="value" type="text">
          <span>{{ v.errors[0] }}</span>
        </ValidationProvider>
        <vue-tel-input
          class="input-tel"
          v-model="phone"
          defaultCountry="GB"
          placeholder="65 243 236"
          enabledCountryCode
          validCharactersOnly
        >
          <template slot="arrow-icon">
          <span class="input-tel__arrow-icon">
            ⌄
          </span>
          </template>
        </vue-tel-input>
        <div class="caption text-center">
          We need your phone number so we
          can notify you of the results. We won’t contact you otherwise.
        </div>
      </div>

      <div class="title onBoarding__title">
        Details
      </div>
      <button class="button button_w-100 button_theme-default button_size-m">Start</button>
      <div class="caption button__caption text-center">
        By using our service, you consent to our Privacy
        Policy and agree to its terms which can be found on our website - 3-60.me
      </div>
    </slide>
  </carousel>
</template>

<script>
import { ValidationProvider } from 'vee-validate';

export default {
  components: {
    ValidationProvider,
  },
  data: () => ({
    phone: null,
    value,
  }),
  mounted() {
    this.$refs.videoRef.src = '';
    this.$refs.videoRef.play();
  },
};
</script>

<style lang="scss">
  .onBoarding__title{
    margin-bottom: 24px;
    text-align: center;
  }
  .onBoarding__text{
    text-align: center;
    margin-bottom: 16px;
  }
  .VueCarousel-slide{
    padding: 0 24px 24px;
  }
  .VueCarousel{
    margin: 0 -24px;
  }
  .onBoarding{
    background-color: $bgColor1;
  }
  .onBoarding__video{
    width: 100%;
    margin: -40px auto 30px;
    display: block;
  }
  .input-tel{
    font-family: $defaultFont;
    &.vue-tel-input{
      border-radius: 4px;
      border-color: #ddd;
    }
    .vti__input{
      font-size: 16px;
      padding: 24px 10px 23px 52px;
      font-family: $defaultFont;
      border-radius: 4px;
      color: #999;
    }
    .vti__selection .vti__country-code{
      color: #999;
      font-size: 16px;
      font-family: $defaultFont;
      position: absolute;
      left: 100px;
      font-weight: bold;
    }
    .vti__dropdown.open{
      outline: none;
    }
    .vti__dropdown{
      width: 120px;
      border-right: 1px solid #ddd;
      background-color: #fff;
    }
    .vti__selection{
      justify-content: center;
    }
    .input-tel__arrow-icon{
      position: relative;
      right: -10px;
      top: -1px;
      font-size: 16px;
      color: #999;
    }
    .vti__flag.gb{
      transform: scale(1.6);
    }
  }
</style>
