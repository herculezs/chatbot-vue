<template>
  <img :src="informationIcon" class="information_icon py-3"
       alt="information" v-b-tooltip="tooltip"/>
</template>

<script>
import informationIcon from '@/assets/information.png';

export default {
  data: () => ({
    informationIcon,
  }),
  props: {
    tooltip: {
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
  .information_icon {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 20%;
    right: 5px;
  }

</style>
