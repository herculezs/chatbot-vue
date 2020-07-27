<template>
  <div class="questions">
    <Content>
      <div class="progress-bar mb-4">
        <div class="progress-bar__value">
          <div class="progress-bar__current-value" :style="{'width': getPercentByStep}"></div>
        </div>
        <div class="progress-bar__info">
          {{ currentStep }} / {{ allStepCount }}
        </div>
      </div>
      <div class="h5 mb-3">
        Question {{ currentStep }}
      </div>
      <div class="text questions__text">
        {{ getDataByStep.question }}
      </div>
      <div class="h5 mb-4">
        Select one of answers
      </div>
      <div class="questions-list">
        <div class="questions-item"
             v-for="item in getDataByStep.answers"
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
    </Content>
  </div>
</template>

<script>
import Content from '@components/Content/Content.vue';

export default {
  name: 'Questions',
  components: {
    Content,
  },
  data: () => ({
    dataFromServer: [
      {
        question: 'You are out with friends and the conversation upsets one of the group. Do you:',
        answers: [
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
      },
      {
        question: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Do you:',
        answers: [
          {
            id: 1,
            content: 'Donec nec justo eget felis facilisis fermentum',
          },
          {
            id: 2,
            content: 'Donec consectetuer ligula vulputate sem tristique',

          },
          {
            id: 3,
            content: 'Praesent dapibus, neque id cursus faucibus, tortor neque egestas auguae',
          },
        ],
      },
    ],
    currentStep: 1,
    allStepCount: 2,
    selectedQuestion: null,
  }),
  computed: {
    getPercentByStep() {
      return `${this.currentStep * 100 / this.allStepCount}%`;
    },
    getDataByStep() {
      return this.dataFromServer[this.currentStep - 1];
    },
  },
  methods: {
    selectedQuestions(question) {
      this.selectedQuestion = question.id;
    },
    setStep(step) {
      this.currentStep = step;
    },
    nextStep() {
      const nextStep = this.currentStep + 1;
      if (nextStep <= this.allStepCount) this.setStep(this.currentStep + 1);
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
</style>
