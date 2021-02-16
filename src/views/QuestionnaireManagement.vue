<template>
  <div class="reset-password">
    <Content>
      <br/>
      <div v-if="!selfResult && fetchRes">
        <button class="button-management button_w-100 button_theme-default button_size-m"
                @click="redirectToQuestions"
        >
          Take Your Own Survey
        </button>
        <br/>
        <br/>
      </div>

      <h1 class="h4 text-center mb-1">Completed Surveys</h1>
      <br/>
      <div class="questions-list" v-if="selfResult">
        <div class="questions-item"
             v-on:click="selectSurveysMyReport">
          <div
            class="questions-item__content button-management">
            Your Survey
          </div>
        </div>
      </div>
      <div class="questions-list" v-if="otherResult">
        <div class="questions-item"
             v-for="(item, index) in otherResult"
             :key="index">
          <div
            v-bind:class="{ active: selectButtonSurveys }"
            class="questions-item__content button-other"
            @click.prevent="selectQuestion(item.userId)"
          >
            <b>{{item.firstName + " " + item.lastName}}</b>
          </div>
        </div>
      </div>
    </Content>
  </div>
</template>

<script>

import Content from '@components/Content/Content.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    Content,
  },
  validations: {
  },
  data: () => ({
    selectButtonSurveys: false,
    otherResult: {},
    selfResult: false,
    fetchRes: false,
    selectAnswers: {},
  }),
  created() {
    this.fetchData();
  },
  computed: {
    ...mapGetters({
      getRedirectAuth: 'auth/getRedirectAuth',
      getProfile: 'auth/getProfile',
      getPersonalityTest: 'invitation/getPersonalityTest',
      getPersonalityTestForManager: 'invitation/getPersonalityTestForManager',
    }),
  },
  methods: {
    fetchData() {
      this.$api.management.fetchUserCompletedSurveys(this.getProfile.id)
        .then((x) => {
          this.selfResult = x.myResult;
          this.otherResult = x.otherPeople;
          this.fetchRes = true;
          if (localStorage.getItem('uniqueId') !== null) {
            localStorage.removeItem('uniqueId');
          }
        });
    },
    selectSurveysMyReport() {
      this.selectButtonSurveys = true;
      this.$router.push('report');
    },
    redirectToQuestions() {
      const { completedQuestionnaires } = this.getProfile;

      if (completedQuestionnaires.includes(process.env.QUESTIONNAIRE_ID)) {
        this.$notify({
          type: 'error',
          text: 'User has already completed the personality test',
        });
        this.$router.push('report');
      }
      this.$router.push('questionnaire');
    },
    selectQuestion(userId) {
      this.$router.push({ name: 'invintation-report', params: { userId } });
    },
  },
};

</script>

<style lang="scss">
  .button-management {
    text-align: center;
    background-color: $btnColor1;
    color: white;
    border: none;
  }
  .button-management:active {
    border-color: $mnColor3;
    background-color: $mnColor3;
  }
  .button-other {
    text-align: center;
    background-color: $btnColor3;
  }
  .button-other:active {
    border-color: $mnColor3;
    background-color: $mnColor3;
  }
</style>
