<template>
  <carousel :per-page="1" :mouse-drag="true">
    <slide>
      <div class="title onBoarding__title">
        Welcome!
      </div>
      <div class="text onBoarding__text">
        I’m here to help you understand more about yourself and others.
      </div>
      <button class="button button_w-100 button_theme-default button_size-m">Get starter</button>
    </slide>
    <slide>
      Slide 2 Content
    </slide>
    <slide>
      Slide 3 Content
    </slide>
  </carousel>
</template>

<script>
export default {
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
</style>
