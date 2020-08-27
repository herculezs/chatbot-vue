<template>
  <div class="onBoarding">
    <Content>
      <Onboarding />
      <div class="footer-menu">
        <ul class="footer-menu__list">
          <li class="footer-menu__item">
            Terms & Conditions
          </li>
          <li class="footer-menu__item">
            Privacy Policy
          </li>
        </ul>
      </div>
    </Content>
  </div>
</template>

<script>
import Onboarding from '@components/Onboarding/Onboarding.vue';
import Content from '@components/Content/Content.vue';

export default {
  components: {
    Onboarding,
    Content,
  },
  name: 'Main',
};
</script>

<style lang="scss">
  .footer-menu{
    position: absolute;
    left: 0;
    bottom: 10px;
    width: 100%;
    padding: 0 24px;
    text-align: center;
    display: flex;
    justify-content: center;

    color: #666;
  }
  .footer-menu__list{
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: center;
    margin: 0;
  }
  .footer-menu__item{
    font-family: "Lato", sans-serif;
    font-size: 14px;
    color: #666;
    padding: 0 10px;
    &:first-child{
      padding-left: 0;
    }
    &:last-child{
      padding-right: 0;
    }
  }
</style>
