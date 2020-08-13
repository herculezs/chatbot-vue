<template>
  <div class="notification-template-content">
    <slot></slot>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$emit('init');
  },
  beforeDestroy() {
    this.$emit('destroy');
  },
};
</script>
