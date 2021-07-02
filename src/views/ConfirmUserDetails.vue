<template>
  <div class="change-details">
    <Content>
      <ConfirmUserDetailsForm></ConfirmUserDetailsForm>
    </Content>
  </div>
</template>

<script>
import ConfirmUserDetailsForm from '@components/UserDetailsComponents/ConfirmUserDetailsForm.vue';

import Content from '@components/Content/Content.vue';

export default {
  name: 'ConfirmUserDetails',
  components: {
    ConfirmUserDetailsForm,
    Content,
  },
};
</script>

<style scoped>

</style>
