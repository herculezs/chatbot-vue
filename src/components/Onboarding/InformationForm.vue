<template>
  <font-awesome-icon
          :icon="icon"
          :size="size"
          class="py-3"

          alt="information" boundary="" v-tooltip.left-end="{
            content: tooltip,
            trigger: 'click hover',
            autoHide: true,
          }"

  />
</template>

<script>

export default {
  data: () => ({
  }),
  props: {
    tooltip: {
      type: String,
    },
    icon: {
      type: String,
    },
    size: {
      type: String,
    },
  },
  computed: {

  },
  methods: {

  },
};
</script>

<style lang="scss">

</style>
