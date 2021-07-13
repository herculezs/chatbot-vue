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
        <div id="chart-compare-pdf">
          <div class="block">
            <div class="diagram__title-with-respondents">
              <div class="report__respondents">
                <svg class="report__respondents-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.42 15.93">
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
        <div id="chartForPdf">
          <div class="block">
            <div class="h5 mb-5 text-center color-chart-title">
              Trait Comparison
            </div>
            <BubbleChart :data="radarData" :subGroup="subGroup"
                         @click-to-character="setChosenGroupCharacteristic($event)"/>
          </div>
        </div>
      </div>
      <InvitationTableEmployees
        v-if="getProfile.registeredFromCSV"
        v-on:show-button="showButtonAskContactsForInvitation1">
      </InvitationTableEmployees>
      <b-modal
        modal-class="modal-sticky-bottom ask-contacts"
        class="ask-contacts"
        id="modal-multi-1"
        hide-footer
        v-else-if="!getProfile.registeredFromCSV"
      >
        <template v-slot:modal-title>
          {{configEnv.report.textForReport.title}}
        </template>
        <p class="text mb-3" v-html="configEnv.report.textForReport.paragraph1">
          {{configEnv.report.textForReport.paragraph1}}
        </p>
        <p class="text mb-3">
          {{configEnv.report.textForReport.paragraph2}}
        </p>
        <p class="text mb-3" v-html="configEnv.report.textForReport.paragraph3">
          {{configEnv.report.textForReport.paragraph3}}
        </p>
        <p class="text mb-4">
          Click the <b>copy button below</b> and paste the explanatory
          text and link to your colleagues using your favorite method.
        </p>
        <InputCopy v-model="shareLink" class="mb-4" />
        <br/>
        <br/>
      </b-modal>

      <div v-if="isFreeVersionWebSite">
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
              v-if="(getProfile.registeredFromCSV && showButtonAskContactsForInvitation) ||
               !getProfile.registeredFromCSV"
              class="button button_theme-default button_size-m-report-page">
              <span class="outer-space-button-text">Ask Contacts</span>
            </button>
            <button
              v-if="(getProfile.registeredFromCSV && showButtonAskContactsForInvitation) ||
               !getProfile.registeredFromCSV"
              @click="redirectToQuestionnaireManagement"
              class="button button_theme-default button_size-m-report-page button-dinamic-size">
              <span class="outer-space-button-text">See Surveys</span>
            </button>
            <button
              v-if="(getProfile.registeredFromCSV && showButtonAskContactsForInvitation) ||
               !getProfile.registeredFromCSV"
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
import InputCopy from '@components/InputCopy/InputCopy.vue';
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
    InputCopy,
    Content,
    FeedbackModal,
    ChartCompare,
    AskOthers,
    InvitationTableEmployees,
    Loading,
  },
  name: 'Report',
  data: () => ({
    configEnv,
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
    nearPoints: [],
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
  }),
  computed: {
    ...mapGetters({
      getProfile: 'auth/getProfile',
    }),
    isOthersAmount() {
      return this.respondentsCount > 3;
    },
    getGuessedCard() {
      return constants.cards[this.getProfile.selfPersonalityType];
    },
    isFreeVersionWebSite() {
      if (this.getProfile.completedQuestionnaires) {
        return isFreeVersion() && !this.getProfile.completedQuestionnaires
          .includes(process.env.QUESTIONNAIRE_ID);
      }
      return isFreeVersion();
    },
  },
  created() {
    this.fetchPersonalityTypeReport();
  },
  methods: {
    async saveCSVFile() {
      this.createPdf = true;
      const temp = this.selectedCharateristic;
      this.selectedCharateristic = null;

      this.refreshData();
      await pdf.saveCSVFile(document.getElementById('chart-compare-pdf'),
        document.getElementById('chartForPdf'), this.youAnswerCard.showText,
        this.youAnswerCard.title, true);
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
    setChosenGroupCharacteristic(event) {
      if (event === 'Open' && (this.myResultsScoreData.opensResult
        || this.othersResultsScoreData.opensResult)) {
        this.chooseOtherResult(event, 'opensResult', true,
          '#FC6F4D', '#B15771', '#c85e3f', '#88444e');
      } else if (event === 'Conscientious' && (this.myResultsScoreData.conscientiousResult
        || this.othersResultsScoreData.conscientiousResult)) {
        this.chooseOtherResult(event, 'conscientiousResult', true,
          '#FD7c49', '#BE6867', '#be5f3c', '#974c4c');
      } else if (event === 'Extraverted' && (this.myResultsScoreData.extravertedResult
        || this.othersResultsScoreData.extravertedResult)) {
        this.chooseOtherResult(event, 'extravertedResult', true,
          '#FD8945', '#CB795D', '#d27037', '#99534d');
      } else if (event === 'Agreeable' && (this.myResultsScoreData.agreeableResult
        || this.othersResultsScoreData.agreeableResult)) {
        this.chooseOtherResult(event, 'agreeableResult', true,
          '#FE9741', '#D88B53', '#9d542b', '#ba744c');
      } else if (event === 'Neurotic' && (this.myResultsScoreData.neuroticResult
        || this.othersResultsScoreData.neuroticResult)) {
        this.chooseOtherResult(event, 'neuroticResult', true,
          '#FEA43D', '#E59C49', '#9d5828', '#ae6a49');
      } else if (event === 'General' && (this.myResultsScoreData.mainResult
        || this.othersResultsScoreData.mainResult)) {
        this.chooseOtherResult(event, 'mainResult', false,
          '#9C11F2', '#E59576', '#5e119f', '#a66053');
      }
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
    setRadar(data, name, subGroup, colorU1 = '#9C11F7', colorU2 = '#E59576',
      borderColorU1 = '#5e119f', borderColorU2 = '#a66053') {
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
      if (this.isFreeVersionWebSite) {
        const uniqueId = localStorage.getItem('uniqueId');

        this.$api.personalityTypeReport.fetchPersonalityTypeReportFreeVersion(uniqueId)
          .then((res) => {
            this.respondentsCount = res.othersAmount;
            this.setRadar(res.selfResult.mainResult.split(/(?=[-+])/), 'Me');
            this.showFeedBackModalByParams(res.othersAmount);

            this.myResultsScoreData = res.selfResult;
            this.tag = res.selfResult.mainResult;
            this.tagOthersAverage = res.othersAverageResult;
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

          if (this.isOthersAmount) {
            this.othersResultsScoreData = res.othersAverageResult;
            this.setRadar(res.othersAverageResult.mainResult.split(/(?=[-+])/), 'Contacts');
            this.OtherCoordinate = helpFunction.Coordinates(res.othersAverageResult.mainResult);
            this.setCollegAnswerCard(this.OtherCoordinate[2]);
          }

          this.showFeedBackModalByParams(res.othersAmount);

          this.tag = res.selfResult;
          this.tagOthersAverage = res.othersAverageResult.mainResult;
          this.SelfCoordinate = helpFunction.Coordinates(res.selfResult.mainResult);

          this.setYouAnswerCard(this.SelfCoordinate[2]);
          this.shareLink = `${window.location.protocol}//${window.location.host}${res.invitationLink}`;
          const [youAreX, youAreY] = this.SelfCoordinate;

          const mostLikelyCharacters = {
            left: {},
            right: {},
            bottom: {},
            top: {},
          };

          const allDirections = [{
            key: 'left',
            isRightDirection: (sourceX, sourceY, x) => sourceX <= x,
          },
          {
            key: 'right',
            isRightDirection: (sourceX, sourceY, x) => sourceX > x,
          },
          {
            key: 'bottom',
            isRightDirection: (sourceX, sourceY, x, y) => sourceY <= y,
          },
          {
            key: 'top',
            isRightDirection: (sourceX, sourceY, x, y) => sourceY > y,
          },
          ];

          allDirections.forEach((direction) => {
            const currentCards = Object.values(constants.cards);
            currentCards
              .filter(({ title }) => {
                const allValues = Object.values(mostLikelyCharacters);
                return !allValues.filter(d => title === d.title).length;
              })
              .forEach(({ value, title }) => {
                const coordinateX = value[0];
                const coordinateY = value[1];
                const distance = Math.sqrt(((coordinateX - youAreX) ** 2)
                  + ((coordinateY - youAreY) ** 2));

                const rightDirection = direction.isRightDirection(coordinateX, coordinateY,
                  youAreX, youAreY);

                const lastDistance = mostLikelyCharacters[direction.key].distance
                  || Number.MAX_VALUE;

                if (rightDirection && lastDistance > distance) {
                  mostLikelyCharacters[direction.key].distance = distance;
                  mostLikelyCharacters[direction.key].title = title;
                  mostLikelyCharacters[direction.key].value = value;
                }
              });
          });

          Object.values(mostLikelyCharacters).filter(v => v.value).forEach(({ title, value }) => {
            this.nearPoints.push({
              value: [],
              type: 'NEAREST',
              data: [...value, title],

            });
          });

          this.chartOptionsBar();
        });
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
</style>
