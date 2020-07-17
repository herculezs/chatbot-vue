<template>
  <div class="onBoarding">
    <video
      class="onBoarding__video"
      ref="videoRef"
      src="../assets/step1_animation.mp4"
      loop
    >
    </video>
    <Onboarding />
  </div>
</template>

<script>
import Onboarding from '@components/Onboarding/Onboarding.vue';

export default {
  components: {
    Onboarding,
  },
  name: 'home',
  mounted() {
    this.$refs.videoRef.play();
  },
};
</script>

<style lang="scss">
  .onBoarding{
    background-color: $bgColor1;
  }
  .onBoarding__video{
    height: 341px;
    margin: -40px auto 30px;
    display: block;
  }
</style>
