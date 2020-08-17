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
      <div class="text questions__text" v-if="getDataByStep">
        {{ getDataByStep.text }}
      </div>
      <div class="h5 mb-4">
        Select one of answers
      </div>
      <!-- TODO REMOVE INDEX WHEN {BE} ADDED ID TO ANSWER -->
      <div class="questions-list" v-if="getDataByStep">
        <div class="questions-item"
             v-for="(item, index) in getDataByStep.answers"
             :key="index"
             :class="{'active' : 1+index === selectedAnswer}"
        >
          <div
            class="questions-item__content"
            @click.prevent="selectedAnswers(index+1)"
          >
            {{ item.text }}
            <img v-if="1+index === selectedAnswer"
                 class="questions-item__icon-checked"
                 src="../assets/checkbox_fill.svg"
                 alt="checkbox">
          </div>
        </div>
      </div>
      <button
        class="button button_w-100 button_theme-default button_size-m"
        v-if="selectedAnswer"
        :disabled="!selectedAnswer"
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
    questions: null,
    currentStep: 1,
    allStepCount: 1,
    selectedAnswer: null,
    formData: {},
  }),
  computed: {
    getPercentByStep() {
      return `${this.currentStep * 100 / this.allStepCount}%`;
    },
    getDataByStep() {
      if (!this.questions) return null;

      return this.questions[this.currentStep - 1];
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      if (this.$route.params.id) {
        return this.fetchInvitationQuestionnaire(this.$route.params.id);
      }

      return this.fetchQuestions();
    },
    fetchQuestions() {
      this.$api.questionnaire.fetchQuestionnaire()
        .then((data) => {
          this.setResponseData(data);
        });
    },
    fetchInvitationQuestionnaire(id) {
      this.$api.questionnaire.fetchInvitationQuestionnaire(id)
        .then((data) => {
          this.setResponseData(data);
        });
    },
    setResponseData(data) {
      this.questions = data.questionList;
      this.setLengthStep(data.questionList);
    },
    setLengthStep(data) {
      this.allStepCount = data.length;
    },
    selectedAnswers(question) {
      this.selectedAnswer = question;
    },
    setStep(step) {
      this.currentStep = step;
    },
    setAnswer(questionId) {
      this.formData[this.getDataByStep.qid] = questionId;
    },
    saveAnswer() {
      if (this.$route.params.id) {
        return this.$api.questionnaire.saveInvitationAnswer(this.formData, this.$route.params.id)
          .then(() => {
            this.$router.push({ name: 'personality-type' });
          });
      }

      return this.$api.questionnaire.saveAnswer(this.formData)
        .then(() => {
          this.$router.push({ name: 'personality-type' });
        });
    },
    nextStep() {
      const nextStep = this.currentStep + 1;

      if (!this.selectedAnswer) return;

      this.setAnswer(this.selectedAnswer);
      this.selectedAnswer = null;

      if (nextStep <= this.allStepCount) {
        this.setStep(this.currentStep + 1);
      } else {
        this.saveAnswer();
      }
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
    background-color: $progressBarAllFieldBg;
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
