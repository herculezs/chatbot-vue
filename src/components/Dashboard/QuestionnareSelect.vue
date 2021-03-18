<template>
    <div class="row">
      <div class="col">
        <div class="text-center quiz-score">
          <h4>Quiz score a number of times</h4>
        </div>
        <v-col
          v-for="index in countAnswers"
          :key="index"
          class="d-flex"
          cols="6"
          sm="1"
        >
          <v-select
            :items="items"
            :label="'Question ' + index"
            v-model="questionResult[index]"
            :key="index"
            return-object
            @change="answers => selectResult(answers, index, item.id)"
          ></v-select>
        </v-col>
        <v-col
          class="d-flex"
          cols="4"
          sm="1"
        >
          <v-select
            :items="NumberOfTimes"
            :value="numberOfTimes"
            label="Number Of Times"
            return-object
            @change="answers => selectNumberOfTimes(answers, item.id)"
          ></v-select>
        </v-col>
        <v-col
          class="d-flex"
          cols="4"
          sm="1"
        >
          <v-btn
            class="button-send"
            elevation="7"
            :disabled="disabled"
            @click="sendQuestionnaireResult"
          >Submit</v-btn>
        </v-col>
      </div>
    </div>
</template>

<script>

export default {
  name: 'QuestionnareSelect',
  props: {
    expanded: {
      type: Array,
    },
    item: {
      type: Object,
    },
  },
  data: () => ({
    questionResult: {},
    disableSubmit1: true,
    disableSubmit2: true,
    countAnswers: 10,
    items: ['1', '2', '3', '4', '5', '6'],
    numberOfTimes: 1,
    NumberOfTimes: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  }),
  computed: {
    disabled() {
      if (!this.disableSubmit2) {
        if (!this.disableSubmit1) return false;
      }
      return true;
    },
  },
  watch: {
    expanded() {
      this.questionResult = {};
      this.$forceUpdate();
      this.numberOfTimes = 1;
      this.disableSubmit2 = true;
      this.disableSubmit1 = true;
    },
  },
  methods: {
    sendQuestionnaireResult() {
      this.$api.admin.addQuestionnaireResult(process.env.QUESTIONNAIRE_ID, this.currentUser,
        this.questionResult, this.numberOfTimes);
    },
    selectNumberOfTimes(count, userId) {
      if (this.currentUser === userId) {
        this.numberOfTimes = count;
        this.disableSubmit1 = false;
      } else {
        this.numberOfTimes = 1;
        this.numberOfTimes = count;
        this.disableSubmit1 = false;
        this.currentUser = userId;
      }
    },

    selectResult(answer, question, userId) {
      if (this.currentUser === userId) {
        this.questionResult[question] = answer;
        if (Object.keys(this.questionResult).length === 10) {
          this.disableSubmit2 = false;
        }
      } else {
        this.questionResult = {};
        this.questionResult[question] = answer;
        this.currentUser = userId;
      }
    },
  },
};
</script>

<style scoped>

</style>
