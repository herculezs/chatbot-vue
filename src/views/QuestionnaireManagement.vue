<template>
  <div class="reset-password">
    <Content>
      <br/>
      <div v-if="!selfResult && fetchRes">
        <button class="button button_w-100 button_theme-default button_size-m"
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
             v-bind:class="{ active: selectButtonSurveys }"
             v-on:click="selectSurveysMyReport">
          <div
            class="questions-item__content button">
            Your Survey
          </div>
        </div>
      </div>
      <div class="questions-list" v-if="otherResult">
        <div class="questions-item"
             v-for="(item, index) in otherResult"
             :key="index">
          <!--           :class="{'active' : 1+index === selectedAnswer}"-->
          <div
            v-bind:class="{ active: selectButtonSurveys }"
            class="questions-item__content button-other"
            @click.prevent="selectQuestion(item)"
          >
            <b>{{item.firstName + " " + item.lastName + ","}}</b> {{ item.phone }}
            <br/>{{ item.email }}
            <!--          <img v-if="1+index === selectedAnswer"-->
            <!--               class="questions-item__icon-checked"-->
            <!--               :src="checkbox"-->
            <!--               alt="checkbox">-->
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
        });
    },
    selectSurveysMyReport() {
      this.selectButtonSurveys = true;
      this.$router.push('report');
    },
    redirectToQuestions() {
      if (this.getProfile.selfPersonalityType) {
        this.$notify({
          type: 'error',
          text: 'User has already completed the personality test',
        });
        return;
      }

      this.$router.push('questionnaire');
    },
    selectQuestion(answer) {
      this.selectButtonSurveys = true;
      this.$store.dispatch('invitation/setPersonalityTestForManager',
        {
          formData: answer.myResult,
        }).then(() => {
        this.$router.push('invintation-report');
      }).catch((e) => {
        console.log('e', e);
      });
    },

  },
};

</script>

<style lang="scss">
  .button {
    text-align: center;
  }
  .button-other {
    text-align: center;
  }
</style>
