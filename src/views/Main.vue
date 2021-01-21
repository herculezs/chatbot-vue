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
  },
  name: 'Main',
};
</script>
