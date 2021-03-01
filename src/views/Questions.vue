<template>
  <div class="questions">
    <Content>
      <template v-if="show.questions">
        <div class="progress-bar mb-4">
          <div class="progress-bar__value">
            <div class="progress-bar__current-value" :style="{'width': getPercentByStep}"></div>
          </div>
          <div class="progress-bar__info">
            {{ currentStep }} / {{ allStepCount }}
          </div>
        </div>
        <div class="text questions__text" v-if="getDataByStep">
          {{ getDataByStep.text }}
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
              @click.prevent="selectAndNextStep(index+1)"
            >
              {{ item.text }}
              <img v-if="1+index === selectedAnswer"
                   class="questions-item__icon-checked"
                   :src="checkbox"
                   alt="checkbox">
            </div>
          </div>
        </div>
      </template>
      <div class="questions-attentions" v-if="show.attentions">
        <div class="text">
          One last thing before we share the results - we need to verify you are human!
        </div>
        <div class="text">
          <span @click="this.setRedirectAuth" >
            <router-link :to="{
            name: 'main',
            params:  { slide: 3 }
          }">
            Register
          </router-link>
          </span>
            or
          <span @click="this.setRedirectAuth">
            <router-link to="/login" >
            Login
          </router-link>
          </span>
        </div>
      </div>
    </Content>
  </div>
</template>

<script>
import Content from '@components/Content/Content.vue';
import { debounce } from 'lodash';
import { mapGetters } from 'vuex';
import isFreeVersion from '@helpers/func';
import checkbox from '../assets/checkbox_fill.svg';

export default {
  name: 'Questions',
  components: {
    Content,
  },
  data: () => ({
    checkbox,
    questions: null,
    currentStep: 1,
    allStepCount: 1,
    selectedAnswer: null,
    formData: {},
    show: {
      questions: true,
      attentions: false,
    },
    redirectLink: 'invintation-report',
  }),
  computed: {
    ...mapGetters({
      getProfile: 'auth/getProfile',
    }),
    getPercentByStep() {
      return `${this.currentStep * 100 / this.allStepCount}%`;
    },
    getDataByStep() {
      if (!this.questions) return null;

      if (this.currentStep === 1) {
        this.startColleaguesTest();
      }

      return this.questions[this.currentStep - 1];
    },
    isPersonalityTest() {
      return this.$route.meta.invitationType === process.env.QUESTIONNAIRE_ID;
    },
    isAuth() {
      return this.getProfile.token;
    },

  },
  created() {
    this.fetchData();
  },
  methods: {
    completedColleaguesTest() {
      this.$gtag.event('Click test', {
        [window.location.pathname.split('/').pop()]: 'Complete test', // eslint-disable-line
        'value': 1,                                                             // eslint-disable-line
      });
    },
    startColleaguesTest() {
      this.$gtag.event('Click test', {
        [window.location.pathname.split('/').pop()]: 'Start test', // eslint-disable-line
        'value': 1,                                                          // eslint-disable-line
      });
    },
    fetchData() {
      if (this.isPersonalityTest) {
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
    saveAnswerByPersonalityTest() {
      if (!localStorage.getItem('uniqueId')) {
        localStorage.setItem('uniqueId', `anonymous${Math.floor(Math.random()
          * Math.floor(Math.random() * Date.now()) * Math.random())}`);
      }

      return this.$store.dispatch('invitation/setPersonalityTest',
        {
          formData: this.formData,
          id: this.$route.params.id,
          uniqueId: localStorage.getItem('uniqueId'),
        }).then(() => {
        if (this.isAuth) {
          return this.$router.push({ name: 'questionnaire-management' });
        }

        return this.toggleShowContent();
      }).catch(() => {
        if (this.isAuth) {
          return this.$router.push({ name: 'questionnaire-management' });
        }
        return this.$router.push({
          name: 'main',
        });
      });
    },
    setRedirectAuth() {
      this.$store.dispatch('auth/setRedirectAuth', 'questionnaire-management');
    },
    toggleShowContent() {
      this.show.questions = !this.show.questions;
      this.show.attentions = !this.show.attentions;
    },
    saveAnswer() {
      this.completedColleaguesTest();
      if (this.isPersonalityTest) {
        return this.saveAnswerByPersonalityTest();
      }

      if (isFreeVersion) {
        if (!localStorage.getItem('uniqueId')) {
          localStorage.setItem('uniqueId', `anonymous${Math.floor(Math.random()
            * Math.floor(Math.random() * Date.now()) * Math.random())}`);
        }

        return this.$api.questionnaire.saveAnswerFreeVersion(this.formData, localStorage.getItem('uniqueId'))
          .then(() => {
            this.$router.push({ name: 'report' });
          }).catch(() => {
            this.$router.push({ name: 'report' });
          });
      }


      return this.$api.questionnaire.saveAnswer(this.formData)
        .then(() => {
          const profile = {
            ...this.getProfile,
            completedQuestionnaires: [...this.getProfile.completedQuestionnaires,
              process.env.QUESTIONNAIRE_ID],
          };

          this.$store.dispatch('auth/updateProfile', profile).then(() => {
            this.$router.replace(this.getRedirectAuth);
          });
          this.$router.push({ name: 'report' });
        });
    },
    // eslint-disable-next-line func-names
    nextStep: debounce(function () {
      const nextStep = this.currentStep + 1;

      if (!this.selectedAnswer) return;

      this.setAnswer(this.selectedAnswer);
      this.selectedAnswer = null;

      if (nextStep <= this.allStepCount) {
        this.setStep(this.currentStep + 1);
      } else {
        this.saveAnswer();
      }
    }, 700),
    selectAndNextStep(answer) {
      this.selectedAnswers(answer);
      this.nextStep();
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
  .questions-attentions{
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    padding: 0 24px;
    transform: translate(-50%, -50%);
    .text{
      margin-bottom: 10px;
      &:last-child{
        margin-bottom: 0;
      }
    }
  }
</style>
