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
      <button
        class="form button button_w-100 button_theme-default
         button_size-m button_theme button_theme"
        @click.prevent="redirectToTestDashboard"
      >
        Test Dashboard
      </button>
      <button
        class="form button button_w-100 button_theme-default
         button_size-m button_theme button_theme"
        @click.prevent="uploadEmployee"
      >
        Upload employees
      </button>
      <button
        class="form button button_w-100 button_theme-default
         button_size-m button_theme button_theme"
        @click.prevent="adminPanel"
      >
        Manage panel
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
    redirectToTestDashboard() {
      this.$router.push({
        name: 'adminTestDashboard',
      });
    },
    uploadEmployee() {
      this.$router.push({
        name: 'adminUploadEmployee',
      });
    },
    adminPanel() {
      this.$router.push({
        name: 'adminPanel',
      });
    },
  },
};
</script>

<style lang="scss">

</style>
