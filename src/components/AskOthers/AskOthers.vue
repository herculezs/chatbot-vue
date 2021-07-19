<template>
  <div class="ask-others container">
    <Content>
      <div class="text-center ask-other-text">
        <div class="ask-text-change">We hope that was interesting so far!</div>
        <div class="ask-text-change">
        The really insightful part comes from asking your contacts about you.
        For the app to work, we need your name, phone and email address.
        </div>
        <div class="ask-text-change">
        Before we do that, a short word about your data:
        </div>
        <div class="ask-text-change">

          <b class="cursive">innerworks</b> is <b>about you</b> and <b>your data is part of you</b>.
        We do not share any information you give us <b>without your explicit permission</b>
        </div>
      </div>

      <button
        @click="redirectToRegistration"
        class="button button_w-100 button_theme-default button_size-m">
        OK
      </button>
    </Content>
  </div>
</template>

<script>
export default {
  name: 'AskOthers',
  methods: {
    redirectToRegistration() {
      this.$router.push({
        name: 'registration',
      });
    },
  },
};
</script>

<style lang="scss">
  .ask-other-text{
    font-size: 16px;
    font-family: 'Montserrat',serif;
  }
  .ask-text-change{
    margin-bottom: 20px;
  }
  .cursive{
    font-style: italic;
  }
</style>
