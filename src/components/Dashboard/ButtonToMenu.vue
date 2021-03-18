<template>
  <div>
    <h1 class="h4 text-center mb-3">Test Dashboard</h1>
    <button
      class="form button button_theme-default
         button_size-m button_theme button_theme"
      @click.prevent="redirectToMenu"
    >
      Back
    </button>
  </div>
</template>

<script>
export default {
  name: 'ButtonToMenu',
  methods: {
    redirectToMenu() {
      this.$router.push({
        name: 'adminMenu',
      });
    },
  },
};
</script>

<style scoped>

</style>
