<template>
  <div class="report">
    <Content>
      <Loading :is-loading.sync="createPdf"/>
      <div class="report-notifications" v-if="!isOthersAmount">
        To keep responses anonymous and honest,
        we will wait until we have received at least <b>4 responses</b> before
        we send your first results. We will update you as further responses come in ...
      </div>
      <div class="block">
        <h1 class="h4 text-center mb-1" v-if="getProfile.token">
          Well done {{ getProfile.name }}!</h1>
        <h1 class="h4 text-center mb-1" v-else>Well done !</h1>
        <h2 class="first_report text mb-5 text-center">
          Here's your first report. It shows your personality
          type in relation to the other 34 personality
          types and where <b>you think</b> you lie on the
          Flexibility-Stability scale.
          <br/>
          Hover over the dots to show a brief summary of characteristics.
        </h2>
      </div>
      <div class="block">
        <template v-if="youAnswerCard">
          <div class="h5">
            Based on your answers, your type is ...
          </div>
          <Card
            :title="youAnswerCard.title"
            :showText="youAnswerCard.showText"
            :tag="youAnswerCard.tag"
            :img="youAnswerCard.src"
            :typeCard="'Guessed'"
          />
        </template>
      </div>
      <template v-if="this.isOthersAmount" >
        <div class="block">
          <div class="h5">
            Your contacts think your personality type is ...
          </div>
          <Card
            :title="collegAnswerCard.title"
            :showText="collegAnswerCard.showText"
            :tag="collegAnswerCard.tag"
            :img="collegAnswerCard.src"
            :typeCard="'Contacts'"
          />
        </div>
      </template>
      <div class="diagram mb-5">
        <vue-select v-if="!isFreeVersionWebSiteWithCheck && isFreeVersionWebSite"
                    :options="options" v-model='selectedOptions' :clearable="false"
                    class="select-group-for-chart"></vue-select>
        <div id="chart-compare-pdf">
          <div class="block">
            <div class="diagram__title-with-respondents">
              <div class="report__respondents">
                <svg class="report__respondents-icon" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 12.42 15.93">
                  <circle
                    fill="none"
                    stroke="#999"
                    stroke-miterlimit="10"
                    cx="6.21"
                    cy="4"
                    r="3.91"/>
                  <path
                    fill="none" stroke="#999" stroke-miterlimit="10"
                    d="M2.29,16a5.71,5.71,0,0,1,11.34-.92,5.62,5.62,0,0,1,.08.92"
                    transform="translate(-1.79 -0.07)"
                  />
                </svg>
                Respondents:  {{ respondentsCount }}
              </div>
            </div>
            <ChartCompare :data="refreshData()"
                          :update-data.sync="updateChart"
                          @charateristic-click="setChosenCharacteristic($event)">
            </ChartCompare>

            <template v-if="selectedCharateristic">
              <div class="h5">
                You clicked ...
              </div>
              <Card
                :title="selectedCharateristic.name"
                :showText="selectedCharateristic.text"
                :typeCard="'Based'"
                default-open
              />
            </template>
          </div>
        </div>
        <div class="bubble_chart_main_block">
          <div id="chartForPdf">
            <div class="block">
              <div class="h5 mb-5 text-center color-chart-title">
                Trait Comparison
              </div>
              <BubbleChart :data="radarData" :subGroup="subGroup"
                           @click-to-character="setChosenGroupCharacteristic($event,
                           myResultsScoreData, othersResultsScoreData, chooseOtherResult)"/>
            </div>
          </div>
        </div>
      </div>
      <InvitationTableEmployees
        v-if="userRegisteredFromCSV"
        v-on:show-button="showButtonAskContactsForInvitation1">
      </InvitationTableEmployees>
      <AskUserModal v-else-if="!userRegisteredFromCSV" :share-link="shareLink"
                    :is-free-version="isFreeVersionWebSite"/>
      <div v-if="isFreeVersionWebSiteWithCheck">
        <div class="buttons-report">
          <div class="block">
            <h2 class="first_report text mb-5 text-center">
              Your report so far is what you think your personality is. This is called your Anima.
              The "you" that others experience is called your Persona. We can find out what your
              Social Persona is by asking people you know socially to answer questions about you.
            </h2>
            <button
              v-b-modal.modal-1
              class="button button_w-100 button_theme-default button_size-m">
              Ask Others
            </button>
          </div>
          <b-modal
            id="modal-1"
            hide-footer
          >
            <AskOthers></AskOthers>
          </b-modal>
        </div>
      </div>
      <div v-else>
        <FeedbackModal v-model="showReportModal" />
        <div class="buttons-report">
          <div class="block-button">
            <button
              v-b-modal.modal-multi-1
              v-if="showButtons"
              class="button button_theme-default button_size-m-report-page">
              <span class="outer-space-button-text">Ask Contacts</span>
            </button>
            <button
              v-if="showButtons"
              @click="redirectToQuestionnaireManagement"
              class="button button_theme-default button_size-m-report-page button-dinamic-size">
              <span class="outer-space-button-text">See Surveys</span>
            </button>
            <button
              v-if="showButtons"
              @click="saveCSVFile"
              class="button button_theme-default button_size-m-report-page button-dinamic-size">
              <span class="outer-space-button-text">Save to PDF</span>
            </button>
            <button
              v-else
              @click="redirectToQuestionnaireManagement"
              class="button button_w-100 button_theme-default button_size-m">
              See Surveys
            </button>
          </div>
        </div>
      </div>
    </Content>
  </div>
</template>

<script>
import Card from '@components/Card/Card.vue';
import AskUserModal from '@components/Modals/AskUserModal.vue';
import Content from '@components/Content/Content.vue';
import FeedbackModal from '@components/Modals/FeedbackModal.vue';
import ChartCompare from '@components/Charts/ChartCompare.vue';
import InvitationTableEmployees from '@components/Modals/Report/InvitationTableEmployees.vue';
import AskOthers from '@components/AskOthers/AskOthers.vue';
import configEnv from '@configEnv';
import isFreeVersion from '@helpers/func';
import helpFunction from '@helpers/helpFuction';
import { mapGetters } from 'vuex';
import constants from '@constants';
import BubbleChart from '@components/BubbleChart/BubbleChart.vue';
import Loading from '@components/Spinner/Loading.vue';
import pdf from '@helpers/createPDF';

export default {
  components: {
    BubbleChart,
    Card,
    Content,
    FeedbackModal,
    ChartCompare,
    AskOthers,
    InvitationTableEmployees,
    Loading,
    AskUserModal,
  },
  name: 'Report',
  data: () => ({
    configEnv,
    options: [],
    selectedOptions: 'general',
    radarData: [{
      value: [],
      type: 'bar',
      areaStyle: {
        color: '#7811c9',
        colorHover: '#a111ff',
      },
      itemColor: {},
      name: 'Me',
    },
    {
      value: [],
      itemColor: {},
      type: 'bar',
      areaStyle: {
        color: '#ff5151',
        colorHover: 'rgba(255,81,81,0.73)',
      },
      name: 'Contacts',
    }],
    updateChart: false,
    createPdf: false,
    subGroupData: [],
    selectedGroup: 'general',
    showButtonAskContactsForInvitation: false,
    respondentsCount: 0,
    shareLink: null,
    tag: null,
    tagOthersAverage: null,
    showReportModal: false,
    SelfCoordinate: null,
    OtherCoordinate: null,
    data: [],
    youAnswerCard: {},
    selectedCharateristic: null,
    collegAnswerCard: {},
    myResultsScoreData: {
      opensResult: '',
    },
    othersResultsScoreData: {
      opensResult: '',
    },
    subGroup: false,
    otherLastResult: null,
  }),
  watch: {
    selectedOptions(value) {
      this.otherAmountCalculate(this.otherLastResult, value);
    },
  },
  computed: {
    ...mapGetters({
      getProfile: 'auth/getProfile',
    }),
    showButtons() {
      return (this.getProfile.registeredFromCSV && this.showButtonAskContactsForInvitation)
        || !this.getProfile.registeredFromCSV;
    },
    isOthersAmount() {
      return this.respondentsCount > 3;
    },
    userRegisteredFromCSV() {
      return this.getProfile.registeredFromCSV;
    },
    isFreeVersionWebSiteWithCheck() {
      if (this.getProfile.completedQuestionnaires) {
        return isFreeVersion() && !this.getProfile.completedQuestionnaires
          .includes(process.env.QUESTIONNAIRE_ID);
      }
      return isFreeVersion();
    },
    isFreeVersionWebSite() {
      return isFreeVersion();
    },
  },
  created() {
    this.fetchPersonalityTypeReport();
  },
  methods: {
    setChosenGroupCharacteristic(event, myResultsSc, othersResultsSc, chooseOtherResult) {
      helpFunction.setChosenGroupCharacteristic(event, myResultsSc, othersResultsSc,
        chooseOtherResult);
    },
    async saveCSVFile() {
      this.createPdf = true;
      const temp = this.selectedCharateristic;
      this.selectedCharateristic = null;

      this.refreshData();
      const d = new Date();
      const createdDate = `${(`0${d.getDate()}`).slice(-2)}-${(`0${d.getMonth() + 1}`).slice(-2)}-${d.getFullYear()}`;
      const fullFileName = `${this.getProfile.name}_${this.getProfile.lastName} ${createdDate} ${(`0${d.getHours()}`).slice(-2)}-${(`0${d.getMinutes()}`).slice(-2)}`;
      const titleForPDF = `innerworks assessment for ${this.getProfile.name} ${this.getProfile.lastName}, ${createdDate}`;

      await pdf.saveCSVFile(document.getElementById('chart-compare-pdf'),
        document.getElementById('chartForPdf'), this.youAnswerCard.showText,
        this.youAnswerCard.title, true, 15, 108, fullFileName, titleForPDF);
      this.createPdf = false;
      this.selectedCharateristic = temp;
    },
    showButtonAskContactsForInvitation1() {
      this.showButtonAskContactsForInvitation = true;
      this.$forceUpdate();
    },
    redirectToQuestionnaireManagement() {
      this.$router.push('questionnaire-management');
    },
    changeName(text) {
      return text.replace(/\{\{firstName\}\}/g, this.getProfile.name).replace(/\{\{secondName\}\}/g,
        this.getProfile.lastName);
    },
    setChosenCharacteristic(event) {
      this.selectedCharateristic = {
        name: event[2],
        text: event[3],
      };
    },
    chooseOtherResult(event, nameResult, subGroup, colorU1, colorU2, borderColorU1, borderColorU2) {
      if (this.myResultsScoreData[nameResult]) {
        this.setRadar(this.myResultsScoreData[nameResult].split(/(?=[-+])/),
          'Me', subGroup, colorU1, colorU2, borderColorU1, borderColorU2);
      }
      if (this.othersResultsScoreData[nameResult]) {
        this.setRadar(this.othersResultsScoreData[nameResult].split(/(?=[-+])/),
          'Contacts', subGroup, colorU1, colorU2, borderColorU1, borderColorU2);
      }
      this.subGroup = subGroup;
    },
    setYouAnswerCard(title) {
      this.youAnswerCard = constants.cards[title];
    },
    setCollegAnswerCard(title) {
      this.collegAnswerCard = constants.cards[title];
    },
    chartOptionsBar() {
      Object.values(constants.cards).forEach((value) => {
        this.data.push({
          value: [],
          type: 'GUESS',
          data: [...value.value, value.title, value.showText],
        });
      });
      if ((this.SelfCoordinate[0] || this.SelfCoordinate[1])) {
        this.data.push(
          {
            value: [],
            type: 'YOU_ARE',
            data: [this.SelfCoordinate[0], this.SelfCoordinate[1], `You scored yourself as - \n${this.youAnswerCard.title.toUpperCase()}`],
          },
        );
      }

      if (!this.showReportModal && this.OtherCoordinate) {
        this.data.push({
          value: [],
          type: 'COLLEAGUE',
          data: [this.OtherCoordinate[0], this.OtherCoordinate[1], `Your contacts say - \n${this.collegAnswerCard.title.toUpperCase()}`],
        });
      }
    },
    refreshData() {
      return this.data;
    },
    // eslint-disable-next-line no-unused-vars
    setRadar(data, name, subGroup, colorU1 = '#9C11F2', colorU2 = '#ff5151',
      borderColorU1 = '#5e119f', borderColorU2 = '#bf4545') {
      const average = this.radarData.find(item => item.name === name);
      average.value = Object.values(data);
      this.radarData[1].itemColor = {
        borderColor: borderColorU2,
        color: colorU2,
      };
      this.radarData[0].itemColor = {
        borderColor: borderColorU1,
        color: colorU1,
      };
    },
    fetchPersonalityTypeReport() {
      if (this.isFreeVersionWebSiteWithCheck) {
        const uniqueId = localStorage.getItem('uniqueId');

        this.$api.personalityTypeReport.fetchPersonalityTypeReportFreeVersion(uniqueId)
          .then((res) => {
            this.respondentsCount = res.othersAmount;
            this.setRadar(res.selfResult.mainResult.split(/(?=[-+])/), 'Me');
            this.showFeedBackModalByParams(res.othersAmount);

            this.myResultsScoreData = res.selfResult;
            this.SelfCoordinate = helpFunction.Coordinates(res.selfResult.mainResult);

            this.setYouAnswerCard(this.SelfCoordinate[2]);

            this.chartOptionsBar();
          });
      } else {
        this.$api.personalityTypeReport.fetchPersonalityTypeReport().then((res) => {
          this.respondentsCount = res.othersAmount;
          this.setRadar(res.selfResult.mainResult.split(/(?=[-+])/), 'Me');
          this.myResultsScoreData = res.selfResult;
          this.other = res.selfResult;
          this.otherLastResult = res;
          this.showFeedBackModalByParams(res.othersAmount);

          this.SelfCoordinate = helpFunction.Coordinates(res.selfResult.mainResult);

          this.setYouAnswerCard(this.SelfCoordinate[2]);

          this.shareLink = `${window.location.protocol}//${window.location.host}${res.invitationLink}`;
          this.otherAmountCalculate(this.otherLastResult, this.selectedGroup);
        });
      }
    },
    otherAmountCalculate(res, groupName) {
      if (this.isOthersAmount) {
        this.othersResultsScoreData = res.othersAverageResult[groupName];
        this.setRadar(res.othersAverageResult[groupName].mainResult.split(/(?=[-+])/), 'Contacts');
        this.OtherCoordinate = helpFunction
          .Coordinates(res.othersAverageResult[groupName].mainResult);
        this.setCollegAnswerCard(this.OtherCoordinate[2]);
        this.options = Object.keys(res.othersAverageResult);
        this.data = [];
        this.chartOptionsBar();
      }
    },
    showFeedBackModalByParams() {
      const { isOthersAmount } = this;
      if (isOthersAmount) {
        const { completedFeedbacks } = this.getProfile;
        if (!completedFeedbacks.includes(process.env.FEEDBACK_ID)) {
          setTimeout(() => this.setShowReportModal(true), 60000);
        }
      }
    },
    setShowReportModal(value) {
      this.showReportModal = value;
    },
  },
};
</script>

<style lang="scss">
  .diagram{
    margin-left: -24px;
    margin-right: -24px;
    padding: 0 24px;
    position: relative;
    margin-bottom: 0;
    .echarts{
      width: 100%;
      height: 310px;
    }
  }
  .color-chart-title {
    color: $mnColor2;
  }
  .report__respondents{
    color: $txtColor3;
    font-family: $defaultFont;
    font-size: 14px;
    letter-spacing: 0;
    line-height: 17px;
    display: flex;
    align-items: center;
    margin-left: auto;
    padding-top: 6px;
  }
  .report__respondents-icon{
    width: 14px;
    height: 17px;
    margin-right: 5px;
  }
  .diagram__title-with-respondents{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .report-notifications{
    text-align: center;
    padding: 16px;
    border: 1px solid #ddd;
    font-family: $defaultFont;
    font-size: 16px;
    line-height: 16px;
    color: $txtColor2;
    border-radius: 4px;
    margin-bottom: 30px;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
  }

  .diagram__legend{
    border-top: 1px solid #e9eaf0;
    margin: 0 -24px;
    padding: 10px 24px ;
    overflow: scroll;
  }
  .diagram__legend-list{
    display: flex;
    justify-content: flex-end;
  }
  .diagram__legend-item{
    margin-right: 50px;
  }
  .diagram__legend-title{
    font-size: 12px;
    font-family: $defaultFont;
    color: #505D6F;
  }
  .diagram__legend-icon{
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    margin-right: 5px;
  }

  .first_report {
    font-size: 16px;
    margin-bottom: 5px;
  }

  .chart-label {
    @media (max-height: $xxsMaxHeight) {
      font-size: 10px;
    }
    font-size: 12px;
  }

  .button-left {
    width: 45%;
  }

  .ask-contacts .modal-content {
    background: $bgColor1;
    @media (max-height: $xxsMaxHeight) {
      max-height: 100vh;
      overflow: auto;
    }
  }

  .button-right {
    float: right;
    width: 45%;
  }

  .block {
    border: 1px solid #ccc;
    padding: 0 7px 0 7px;
    margin: 20px 5px 0 5px;
  }

  .block-button {
    border: 1px solid #ccc;
    padding: 10px 7px 10px 7px;
    margin: 20px 5px 0 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

  }

  .buttons-report .block {
    padding: 6px 7px 6px 7px;
  }

  #modal-1 {
    & .modal-dialog {
      width: auto;
      position: relative;
      max-width: 490px !important;
      margin: auto auto;
    }
  }

  .button-dinamic-size {
    margin-left: 10px;
    flex: 1;
  }

  .outer-space-button-text {
    padding: 0 5px 0 5px;
  }

  .bar-chart-pfd {
    height: 333px;
    width: 430px;
  }
  .bar-chart-pfd-block {
    height: 426px;
    width: 448px;
  }
  .select-group-for-chart {
    width: 35%;
    min-width: 107px;
    position: absolute;
    top: 0;
    left: 30px;
  }
  .bubble_chart_main_block {
    position: relative;
  }
</style>
