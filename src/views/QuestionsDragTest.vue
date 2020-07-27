<template>
  <div class="questionsDrag">
    <Content>
      <div class="text questionsDrag__title">
        Please drag the answers in order of most likely to least…
      </div>
      <div class="questions-list">
        <draggable v-model="dataFromServer" v-bind="dragOptions" draggable=".item">
          <transition-group type="transition" :name="!drag ? 'flip-list' : null">
            <div class="questions-item item" v-for="item in dataFromServer" :key="item.id">
              <div
                class="questions-item__content"
              >
                {{ item.content }}
                <img
                  class="questions-item__icon-drag"
                  src="../assets/icon-arrow-up-down.svg"
                  alt="drag">
              </div>
            </div>
          </transition-group>
        </draggable>
      </div>
      <button
        class="button button_w-100 button_theme-default button_size-m"
        @click.prevent="nextStep"
      >
        Next
      </button>
    </Content>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import Content from '@components/Content/Content.vue';

export default {
  name: 'QuestionsDrag',
  components: {
    draggable,
    Content,
  },
  data: () => ({
    dataFromServer: [
      {
        id: 1,
        content: 'Take them on the side, find out what’s wrong and listen to them as long as it takes',
      },
      {
        id: 2,
        content: 'Immediately organise the meet-up',

      },
      {
        id: 3,
        content: 'Only a phone. Worst things have happend and I’ll get another one',
      },
    ],
    drag: false,
  }),
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      };
    },
  },
  methods: {
    nextStep() {
      console.log('nextStep');
    },
  },
};
</script>

<style lang="scss">

</style>
