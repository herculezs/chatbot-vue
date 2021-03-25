<template>
  <div class="bucket">
      <span class="trash-favicon">
        <font-awesome-icon :icon="'trash-alt'" :size="'3x'"></font-awesome-icon>
      </span>
    <draggable class="trashPlace" :list="trashList"
               :options="trashOptions"
               @change="log">
    </draggable>
  </div>
</template>


<script>
import draggable from 'vuedraggable';

export default {
  name: 'Bucket',
  components: {
    draggable,
  },
  data() {
    return {
      trashOptions: {
        group: {
          name: 'trash',
          ghostClass: 'ghost',
          put: ['selectedEmployers'],
          pull: false,
        },
      },
      trashList: [],
    };
  },
  methods: {
    log(evt) {
      window.console.log('11111', evt);
    },
  },
};
</script>

<style lang="scss">
  .trash-favicon {
    position: absolute;
    margin-top: 13px;
    margin-bottom: auto;
    left: 41%;
    right: auto;
  }
  .trashPlace .sortable-ghost {
    opacity: 0;
  }
  .trashPlace {
    border: 1px solid black;
  }

  .trashPlace {
    width: 100%;
    height: 100%;
  }
  .bucket {
    height: 10vh;
  }
</style>
