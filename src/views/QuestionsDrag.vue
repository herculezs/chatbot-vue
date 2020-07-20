<template>
  <div class="questionsDrag">
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
  </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  name: 'QuestionsDrag',
  components: {
    draggable,
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
  .progress-bar{
    width: 100%;
    display: flex;
    align-items: center;
  }
  .progress-bar__value{
    width: 100%;
    height: 12px;
    background-color: $mnColor3;
    border-radius: 6px;
  }
  .progress-bar__current-value{
    background-color: $progressBarBg;
    height: 100%;
    border-radius: 6px;
  }
  .progress-bar__info{
    color: $txtColor2;
    font-family: $defaultFont;
    font-size: 14px;
    letter-spacing: 0;
    line-height: 16px;
    width: 60px;
    margin-left: 15px;
  }

  .questions-item{
    margin-bottom: 24px;
    &.ghost{
      opacity: 0;
    }
    &.active{
      .questions-item__content{
        border-color: $mnColor2;
        background-color: $mnColor3;
        box-shadow: 0 4px 16px 0 rgba(0,93,145,0.32);
      }
    }
  }
  .questions-item__content{
    position: relative;
    border-radius: 4px;
    background-color: #FFFFFF;
    box-shadow: 0 2px 6px 0 rgba(0,0,0,0.16);
    padding: 16px 53px 16px 24px;
    color:$txtColor2;
    font-family: $defaultFont;
    font-size: 18px;
    letter-spacing: 0;
    line-height: 24px;
    border: 1px solid transparent;
  }
  .questions-item__icon-checked{
    position: absolute;
    right: 24px;
    top: 28px;
  }
  .questions-list__title{
    margin-bottom: 24px;
  }
  .questions-list{
    margin-bottom: 32px;
  }


  .questions__text{
    margin-bottom: 40px;
  }
  .questionsDrag__title{
    margin-bottom: 40px;
  }
</style>
