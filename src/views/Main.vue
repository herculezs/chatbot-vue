<template>
  <div class="onBoarding">
    <Content>
      <Onboarding />
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
  mounted() {
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
  name: 'Main',
};
</script>
