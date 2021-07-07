<template>
  <div class="building-your-credibility-score">
    <Content>
      <h1 class="h4 text-center mb-3">Building your Credibility Score</h1>
      <div class="content-building-your-credibility-score-main
      content-building-your-credibility-score-main-1">
        Practically using your results requires you to have credibility and trust. We will help
        you do this but we need to build a picture of who are and what your relationships are
        so we can vouch for your profile’s credibility
      </div>
      <div class="content-building-your-credibility-score-main
      content-building-your-credibility-score-main-2">
        Part of this process is seeing identification, for example a bank account, because the bank
        will have checked your credential thoroughly.
        We will store non-financial details but, as with all your data,
        <b>we never pass anything to third parties.</b>
      </div>
      <div class="content-building-your-credibility-score-main
       content-building-your-credibility-score-main-3">
        If you don’t feel comfortable at the moment,
        don’t worry, you can build your Credibility Score another time.
      </div>
      <div class="buttons-building-credibility">
        <div class="button-credibility-score">
          <button
            @click="bankAccountRoute"
            class="button button_w-100 button_theme-default button_size-m">
            <span class="outer-space-button-text">Debit/Credit Card</span>
          </button>
        </div>
        <div class="button-credibility-score">
          <button
            @click="identificationCardRoute"
            class="button button_w-100 button_theme-default button_size-m">
            <span class="outer-space-button-text">Photo ID</span>
          </button>
        </div>
        <div class="button-credibility-score">
          <button
            @click="redirectToQuestionnaire"
            class="button button_w-100 button_theme-default button_size-m">
            <span class="outer-space-button-text">Skip for Now</span>
          </button>
        </div>
      </div>
    </Content>
  </div>
</template>

<script>
import Content from '@components/Content/Content.vue';
import checkRole from '@helpers/adminFunction';
import { mapGetters } from 'vuex';

export default {
  name: 'BuildingYourCredibilityScore',
  components: {
    Content,
  },
  computed: {
    ...mapGetters({
      getProfile: 'auth/getProfile',
    }),
  },
  methods: {
    bankAccountRoute() {
      this.$router.push({ name: 'bank-account' });
    },
    identificationCardRoute() {
      this.$router.push({ name: 'identification-card' });
    },
    redirectToQuestionnaire() {
      const request = {
        skipThisStep: true,
      };

      this.$api.auth.checkBankAccountValidate(request, this.getProfile.id);

      const formData = new FormData();
      this.$api.auth.uploadIdentificationCardUser(formData, this.getProfile.id, true);

      if (checkRole.isAdmin()) {
        this.$router.push({
          name: 'adminMenu',
        });
      } else if (this.getProfile.completedQuestionnaires
        .includes(process.env.QUESTIONNAIRE_ID)) {
        this.$router.replace('report');
      } else {
        this.$router.replace('questionnaire');
      }
    },
  },
};
</script>

<style lang="scss">
  .button-credibility-score {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .content-building-your-credibility-score-main {
    margin-bottom: 20px;
    font-style: normal;
    font-weight: normal;
  }
  .content-building-your-credibility-score-main-3 {
    font-size: 18px;
    line-height: 22px;
    align-items: center;
    text-align: center;
  }
  .content-building-your-credibility-score-main-2 {
    font-size: 18px;
    line-height: 22px;
    align-items: center;
    text-align: center;
  }
  .content-building-your-credibility-score-main-1 {
    font-size: 18px;
    line-height: 22px;
    align-items: center;
    text-align: center;
  }
  .buttons-building-credibility {
    width: 50%;
    margin-left: auto;
    margin-right: auto;
  }
</style>
