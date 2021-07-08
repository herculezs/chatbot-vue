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
        <div class="button-credibility-score" v-if="!savedIdCard && !confirmBankAccount">
          <button
            @click="redirectToQuestionnaire"
            class="button button_w-100 button_theme-default button_size-m">
            <span class="outer-space-button-text">Skip for Now</span>
          </button>
        </div>
        <div class="button-credibility-score" v-else>
          <button
            @click="continueButton"
            class="button button_w-100 button_theme-default button_size-m">
            <span class="outer-space-button-text">Continue</span>
          </button>
        </div>
      </div>
      <div data-app>
        <v-dialog
          class="v-dialog"
          v-model="showModal"
          min-width="280"
          max-width="450"
        >
          <v-card>
            <v-card-title class="headline red lighten-2">
              Information
            </v-card-title>
            <v-card-text>
              <br/>
              <h4>
                Are you sure you want to move on? If you add credit card/id,
                your score will be even higher.
              </h4>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                color="primary"
                text
                @click="dialogOff"
              >
                Add DEBIT/CREDIT card<br/> or Photo ID
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click="dialogOff"
              >
                Yes, continue
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
  data: () => ({
    savedIdCard: false,
    confirmBankAccount: false,
    showModal: false,
  }),
  mounted() {
    this.$api.auth.checkIdentificationData().then((res) => {
      this.savedIdCard = res.savedIdCard;
      this.confirmBankAccount = res.confirmBankAccount;
    });
  },
  methods: {
    dialogOff() {
      this.redirectPath();
    },
    continueButton() {
      if (this.savedIdCard && this.confirmBankAccount) {
        this.redirectPath();
      } else {
        this.showModal = true;
      }
    },
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

      this.redirectPath();
    },
    redirectPath() {
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

  .building-your-credibility-score .v-card__title {
    background: $btnColor1;
    color: white;
  }
  .building-your-credibility-score .v-btn {
    color: $btnColor1;
  }
  @media screen and (max-width: 415px) {
    .building-your-credibility-score .v-btn {
      font-size: .7rem;
    }
  }
  @media screen and (max-width: 350px) {
    .building-your-credibility-score .v-btn {
      font-size: .6rem;
    }
  }
</style>
