<template>
  <div class="admin-menu container">
    <Content>
      <h1 class="h4 text-center mb-3">Admin menu</h1>
      <button
        class="form button button_w-100 button_theme-default
         button_size-m button_theme button_theme"
        @click.prevent="redirectToDashboard"
      >
        Dashboard
      </button>
    </Content>
  </div>
</template>

<script>
export default {
  name: 'AdminCheckOtherAccount',
  methods: {
    redirectToDashboard() {
      this.$router.push({
        name: 'adminDashboard',
      });
    },
  },
};
</script>

<style lang="scss">

</style>
