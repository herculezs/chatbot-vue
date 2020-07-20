<template>
  <div class="questions">
    <div class="progress-bar">
      <div class="progress-bar__value">
        <div class="progress-bar__current-value" :style="{'width': progressBarValue}"></div>
      </div>
      <div class="progress-bar__info">
        1 / 16
      </div>
    </div>
    <div class="h5">
      Question 1
    </div>
    <div class="text questions__text">
      You are out with friends and the conversation upsets one of the group. Do you:
    </div>
    <div class="h5 questions-list__title">
      Select one of answers
    </div>
    <div class="questions-list">
      <div class="questions-item"
           v-for="item in dataFromServer"
           :key="item.id"
           :class="{'active' : item.id === selectedQuestion}"
      >
        <div
          class="questions-item__content"
          @click.prevent="selectedQuestions(item)"
        >
          {{ item.content }}
          <img v-if="item.id === selectedQuestion"
               class="questions-item__icon-checked"
               src="../assets/checkbox_fill.svg"
               alt="checkbox">
        </div>
      </div>
    </div>
    <button
      class="button button_w-100 button_theme-default button_size-m"
      v-if="selectedQuestion"
      @click.prevent="nextStep"
    >
      Next
    </button>
  </div>
</template>

<script>

export default {
  name: 'Questions',
  data: () => ({
    progressBarValue: '0%',
    dataFromServer: [
      {
        id: 1,
        content: 'Tell them to pull themselves together',
      },
      {
        id: 2,
        content: 'Find out what the issue is and buy them a drink',

      },
      {
        id: 3,
        content: 'Take them on the side, '
          + 'find out what’s wrong and listen to them as long as it takes',
      },
    ],
    selectedQuestion: null,
  }),
  methods: {
    selectedQuestions(question) {
      this.selectedQuestion = question.id;
    },
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
</style>
