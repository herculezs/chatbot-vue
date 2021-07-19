<template>
  <div class="admin-dashboard">
    <Content>
      <Loading :is-loading.sync="createPdf"/>
      <h1 class="h4 text-center mb-3">Dashboard</h1>
      <ButtonToMenu/>
      <div class="position-search" id="search">
          <v-text-field
            class="search-panel-static"
            solo
            v-model="searchText"
            type="text"
            label="Search by Text"
          >
            <template v-slot:append>
              <span class="vl"></span>
              <div class="icon-search-position">
                <v-fade-transition leave-absolute>
                  <v-btn
                    icon
                    width="22"
                    height="22"
                    color="black"
                    @click="searchText = ''"
                  >
                    <v-icon
                      size="18"
                      class="icon-search"
                      color="#212121"
                    >mdi-close</v-icon>
                  </v-btn>
                </v-fade-transition>
              </div>
            </template>
          </v-text-field>
      </div>
      <v-app>
        <v-card>
          <v-data-table
            item-key="userId"
            :headers="headers"
            :items="dashboardData"
            :page.sync="page"
            class="elevation-1"
            mobile-breakpoint="1"
            show-expand
            :loading="loadingTable"
            :items-per-page="itemsPerPage"
            loading-text="Loading... Please wait"
            hide-default-footer
            single-expand
            :custom-sort="customSort"
            :expanded.sync="expanded"
            :search="searchText"
            @page-count="calculateCountPage()">
            <template v-slot:header.type>
              <th><v-select
                v-model="selectedChangeType[0]"
                :items="headerChangeType"
                item-text="text"
                item-value="value"
                class="select-type"
                solo
                @change="type => changedTypeInTable(type)"
              >
                <template v-slot:selection="{ item }">
                  <span class="select-type-text">
                    {{ item.text }}
                  </span>
                </template>
              </v-select>
              </th>
            </template>
            <template v-slot:item.selectGroup="{ item, index }">
              <v-select
                v-model="selectedGroup[index]"
                :items="item.itemsSelectGroups"
                item-text="groupName"
                item-value="id"
                class="select-group"
                @change="groupId => changeGroup(groupId, item.userId)"
              ></v-select>
            </template>
            <template v-slot:item.save_pdf_file="{ item, index }">
              <v-btn
                :disabled="createPdf || !item.allType.userType"
                @click="saveCSVFile(item)"
                color="purple"
              >
                <span class="button-save-pdf-text">Save to PDF</span>
              </v-btn>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
              <td class="expand-space" :colspan="headers.length">
                <vue-select
                  v-if="isFreeVersionWebSite"
                  @input="changedFreeGroup($event, item)"
                  :options="item.options" v-model='item.selectedOptions'
                  :clearable="false"
                  class="select-group-for-chart"></vue-select>

                <div class="row">
                  <div class="col">
                      <div class="barChartUsersResult">
                        <div class="departmentSummary">
                          <div class="blockBarChart">
                            <div class="text-center position-title-chart">
                              Consistency Score by TRAIT</div>
                            <ChartConsistencyOverall :data="item.scoreOverallChart">
                            </ChartConsistencyOverall>
                          </div>
                        </div>
                        <div class="departmentSummary">
                          <div class="blockBarChart" id="bubble-chart">
                            <div class="text-center position-title-chart">
                              Comparison by TRAIT - {{item.selectedOptions}}
                            </div>
                            <BubbleChart :data=item.chartBar :subGroup="subGroup"
                                         :showLabels="!!item.allType.userType"
                                         @click-to-character="setChosenGroupCharacteristic($event,
                                         myResultsScoreData, othersResultsScoreData,
                                         chooseOtherResult)">
                            </BubbleChart>
                          </div>
                        </div>
                        <div class="departmentSummary">
                          <div class="block" id="chart-compare">
                            <div class="text-center position-title-chart">
                              Comparison by TYPE - {{item.selectedOptions}}
                            </div>
                            <ChartCompare :data="item.chartCompare">
                            </ChartCompare>
                          </div>
                        </div>
                        <div class="departmentSummary departmentSummaryChart">
                          <div class="block">
                            <div class="text-center position-title-chart">
                              Distribution by TYPE - {{item.selectedOptions}}
                            </div>
                            <DepartmentSummaryChart v-if="item.departmentSummary"
                              :respondentsCount="item.countOther"
                              :data="item.departmentSummary">
                            </DepartmentSummaryChart>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              </td>
            </template>
          </v-data-table>
          <div class="text-center pt-2">
            <v-pagination
              v-model="page"
              :disabled="loadingTable"
              :length="calculateCountPage()"
              :total-visible="10"
              @input="pageCounts"
            ></v-pagination>
          </div>
        </v-card>
      </v-app>
    </Content>
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import Stretch from 'vue-loading-spinner/src/components/Stretch';
import helpFunction from '@helpers/helpFuction';
import ChartConsistencyOverall from '@components/Admin/Charts/ChartConsistencyOverall.vue';
import DepartmentSummaryChart from '@components/Admin/Charts/DepartmentSummaryChart.vue';
import constants from '@constants/index';
import ChartCompare from '@components/Charts/ChartCompare.vue';
import ButtonToMenu from '@components/Dashboard/ButtonToMenu.vue';
import pdf from '@helpers/createPDF';
import Loading from '@components/Spinner/Loading.vue';
import BubbleChart from '@components/BubbleChart/BubbleChart.vue';
import isFreeVersion from '@helpers/func';

export default {
  name: 'adminDashboard',
  components: {
    BubbleChart,
    ChartConsistencyOverall,
    ChartCompare,
    DepartmentSummaryChart,
    ButtonToMenu,
    Loading,
  },
  data: () => ({
    Stretch,
    page: 1,
    myResultsScoreData: {
      opensResult: '',
    },
    othersResultsScoreData: {
      opensResult: '',
    },
    createPdf: false,
    subGroup: false,
    snack: false,
    pageCount: 0,
    itemsPerPage: 20,
    dashboardData: [],
    loadingTable: true,
    chartCompare: [],
    radarData: [],
    sortField: '',
    searchText: '',
    sortDesc: false,
    departmentSummary: [],
    departmentSummaryOtherResult: [],
    expanded: [],
    selectedGroup: [],
    headerChangeType: [{ text: 'Type - User', value: 'u1' }, { text: 'Type - Colleagues', value: 'u2' }],
    selectedChangeType: [{ text: 'Type - User', value: 'u1' }],
    headers: [
      {
        text: '', value: 'expand', align: 'end', sortable: false,
      },
      {
        text: 'Employee', value: 'employee', align: 'start', width: 180,
      },
      {
        text: 'Created', value: 'created_date', align: 'center',
      },
      {
        text: 'Department', value: 'department', align: 'center',
      },
      {
        text: 'Role', value: 'role', align: 'center',
      },
      { text: 'Manager', value: 'manager', align: 'center' },
      {
        text: 'Consistency score overall',
        value: 'scoreOverall',
        align: 'center',
        sortable: false,
      },
      {
        text: 'Connections',
        value: 'number_connections',
        align: 'center',
      },
      {
        text: 'Type',
        value: 'type',
        align: 'center',
        sortable: false,
      },
      {
        text: 'Select Group',
        value: 'selectGroup',
        align: 'center',
        sortable: false,
      },
      {
        text: 'Preferred Reviewer Ranking',
        value: 'preferred_reviewer_ranking',
        align: 'center',
      },
      {
        text: '',
        value: 'save_pdf_file',
        align: 'center',
        sortable: false,
      },
    ],
  }),
  mounted() {
    this.countUsers();
    this.getInfoDashboard();
  },
  computed: {
    isFreeVersionWebSite() {
      return isFreeVersion();
    },
  },
  methods: {
    setChosenGroupCharacteristic(event, myResultsSc, othersResultsSc, chooseOtherResult) {
      helpFunction.setChosenGroupCharacteristic(event, myResultsSc, othersResultsSc,
        chooseOtherResult);
    },
    chooseOtherResult(event, nameResult, subGroup, colorU1, colorU2, borderColorU1, borderColorU2) {
      this.resetData();
      if (this.othersResultsScoreData[nameResult]) {
        this.setRadar(this.othersResultsScoreData[nameResult].split(/(?=[-+])/),
          'Contacts', subGroup, colorU1, colorU2, borderColorU1, borderColorU2);
      }

      if (this.myResultsScoreData[nameResult]) {
        this.setRadar(this.myResultsScoreData[nameResult].split(/(?=[-+])/),
          'Self', subGroup, colorU1, colorU2, borderColorU1, borderColorU2);
      }

      this.dashboardData = this.dashboardData.map((x) => {
        if (x.userId === this.expanded[0].userId) {
          return {
            ...x,
            chartBar: this.radarData,
          };
        }

        return x;
      });
      this.subGroup = subGroup;
    },
    saveCSVFile(item) {
      if (item.allType.userType) {
        this.createPdf = true;
        this.expanded.push(item);
        const nameForFileName = item.employee.replace(' ', '_');
        const d = new Date();
        const createdDate = `${(`0${d.getDate()}`).slice(-2)}-${(`0${d.getMonth() + 1}`).slice(-2)}-${d.getFullYear()}`;
        const fullFileName = `${nameForFileName} ${createdDate} ${(`0${d.getHours()}`).slice(-2)}-${(`0${d.getMinutes()}`).slice(-2)}`;
        const nameAndSurname = item.employee.split(' ');

        const title = `innerworks assessment for ${nameAndSurname[0]} ${nameAndSurname[1]}, ${createdDate}`;
        pdf.delay(1000).then(async () => {
          await pdf.saveCSVFile(document.getElementById('chart-compare'),
            document.getElementById('bubble-chart'),
            constants.cards[item.allType.userType].showText, item.allType.userType,
            false, 20, 115, fullFileName, title);
          this.createPdf = false;
          this.expanded = [];
        });
      }
    },
    changedFreeGroup(val, item) {
      this.dashboardData = this.dashboardData.map((x) => {
        if (x.userId === item.userId) {
          this.resetData();
          this.calculateDataForChart(x.allSelfResult, x.allOtherResult, val);

          return {
            ...x,
            countOther: x.allOtherResult[val].numberConnection,
            chartBar: this.radarData,
            chartCompare: this.chartCompare,
            departmentSummary: this.departmentSummary,
            selectedOptions: val,
          };
        }

        return x;
      });
    },
    open() {
      this.snack = true;
    },
    calculateCountPage() {
      return Math.ceil(this.pageCount / this.itemsPerPage);
    },
    pageCounts(currentPage) {
      this.loadingTable = true;
      this.page = currentPage;
      this.dashboardData = [];
      this.getInfoDashboard();
    },
    countUsers() {
      this.$api.admin.countUsers().then((x) => {
        this.pageCount = x;
      });
    },
    getInfoDashboard() {
      this.$api.admin.getInfoDashboard(process.env.QUESTIONNAIRE_ID, this.page - 1,
        this.sortField, this.sortDesc)
        .then((response) => {
          this.dashboardData = [];
          this.loadingTable = true;
          response.forEach((x) => {
            this.resetData();
            const type = this.calculateDataForChart(x.result, x.otherResult, 'general');

            const d = new Date(x.createdDate);
            const createdDate = `${(`0${d.getDate()}`).slice(-2)}-${(`0${d.getMonth() + 1}`)
              .slice(-2)}-${d.getFullYear()}`;

            const countConnection = x.otherResult.general
              ? x.otherResult.general.numberConnection : 0;

            this.dashboardData.push({
              userId: x.id,
              employee: x.employee,
              department: x.department,
              manager: x.manager,
              countOther: countConnection,
              scoreOverall: `${x.scoreOverall.generalPercent}%`,
              scoreOverallChart: x.scoreOverall,
              role: x.role,
              number_connections: countConnection,
              created_date: createdDate,
              type: type.userType,
              allType: type,
              preferred_reviewer_ranking: x.reviewerRanking,
              chartBar: this.radarData,
              chartCompare: this.chartCompare,
              departmentSummary: this.departmentSummary,
              itemsSelectGroups: x.userGroups,
              options: Object.keys(x.otherResult),
              selectedOptions: 'general',
              allOtherResult: x.otherResult,
              allSelfResult: x.result,
            });
            this.selectedGroup.push(x.userGroups[0]);

            this.loadingTable = false;
            this.$forceUpdate();
          });
        });
    },
    changeGroup(groupId, userId) {
      this.$api.admin.getInfoByGroup(userId, groupId).then((data) => {
        this.resetData();
        this.calculateDataForChart(data.result, data.otherResult, 'general');

        this.dashboardData = this.dashboardData.map((x) => {
          if (x.userId === userId) {
            const countConnection = data.otherResult.general
              ? data.otherResult.general.numberConnection : 0;

            return {
              ...x,
              countOther: countConnection,
              scoreOverallChart: data.scoreOverall,
              chartBar: this.radarData,
              chartCompare: this.chartCompare,
              departmentSummary: this.departmentSummary,
              itemsSelectGroups: x.itemsSelectGroups,
              selectedOptions: 'general',
              allOtherResult: data.otherResult,
              allSelfResult: data.result,
            };
          }
          return x;
        });
      });
    },
    changedTypeInTable(type) {
      if (type === 'u1') {
        this.dashboardData = this.dashboardData.map(x => ({
          ...x,
          type: x.allType.userType,
        }));
      } else {
        this.dashboardData = this.dashboardData.map(x => ({
          ...x,
          type: x.allType.otherType,
        }));
      }
    },
    resetData() {
      this.chartCompare = [];
      this.selfCoordinate = [];
      this.otherCoordinate = [];
      this.departmentSummary = [];
      this.departmentSummaryOtherResult = [];
      this.countOther = null;
      this.radarData = [
        {
          value: [],
          type: 'bar',
          areaStyle: {
            color: '#7811c9',
            colorHover: '#a111ff',
          },
          itemColor: {},
          name: 'Self',
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
        },
      ];
    },

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

    calculateDataForChart(result, otherResult, groupNameFreeVersion) {
      let otherType = '';
      let type = '';

      if (result && result.mainResult) {
        // eslint-disable-next-line prefer-destructuring
        type = helpFunction.Coordinates(result.mainResult)[2];
        this.setRadar(result.mainResult.split(/(?=[-+])/), 'Self');
        this.selfCoordinate = helpFunction.Coordinates(result.mainResult);
        this.myResultsScoreData = result;
      }

      if (otherResult && otherResult[groupNameFreeVersion]
        && otherResult[groupNameFreeVersion].mainResult) {
        // eslint-disable-next-line prefer-destructuring
        otherType = helpFunction.Coordinates(otherResult[groupNameFreeVersion]
          .mainResult)[2];
        this.setRadar(otherResult[groupNameFreeVersion]
          .mainResult.split(/(?=[-+])/), 'Contacts');
        this.otherCoordinate = helpFunction
          .Coordinates(otherResult[groupNameFreeVersion].mainResult);
        this.othersResultsScoreData = otherResult[groupNameFreeVersion];

        if (otherResult[groupNameFreeVersion].eachU1Result) {
          otherResult[groupNameFreeVersion].eachU1Result.forEach((element) => {
            this.departmentSummaryOtherResult.push(helpFunction.Coordinates(element));
          });
        }
      }
      this.chartOptionsBar(type, otherType);
      this.chartOptionsBarDepartmentSummary();
      return { userType: type, otherType };
    },
    chartOptionsBar(type, otherType) {
      Object.values(constants.cards).forEach((value) => {
        this.chartCompare.push({
          value: [],
          type: 'GUESS',
          data: [...value.value, value.title, value.showText],
        });
      });
      if (this.selfCoordinate[0] || this.selfCoordinate[1]) {
        this.chartCompare.push(
          {
            value: [],
            type: 'YOU_ARE',
            data: [this.selfCoordinate[0], this.selfCoordinate[1], `Self-scored - \n${type}`],
          },
        );
      }

      if (this.otherCoordinate) {
        this.chartCompare.push({
          value: [],
          type: 'COLLEAGUE',
          data: [this.otherCoordinate[0], this.otherCoordinate[1], `Contacts scored - \n${otherType}`],
        });
      }
    },
    chartOptionsBarDepartmentSummary() {
      Object.values(constants.cards).forEach((value) => {
        this.departmentSummary.push({
          value: [],
          type: 'GUESS',
          data: [...value.value, value.title, value.showText],
        });
      });

      const counts = {};
      this.departmentSummaryOtherResult.forEach((x) => {
        counts[x[2]] = (counts[x[2]] || 0) + 1;
      });
      this.departmentSummaryOtherResult.forEach((element) => {
        this.departmentSummary.push({
          value: [],
          type: 'EACH_COLLEAGUES',
          data: [element[0], element[1], element[2], counts[element[2]]],
        });
      });
    },
    customSort(items, index, isDesc) {
      if (index.length !== 0 && isDesc.length !== 0 && (this.sortField !== index[0]
        || this.sortDesc !== isDesc[0])) {
        // eslint-disable-next-line prefer-destructuring
        this.sortField = index[0];
        // eslint-disable-next-line prefer-destructuring
        this.sortDesc = isDesc[0];

        this.loadingTable = true;
        this.dashboardData = [];
        this.getInfoDashboard();
      }
      if (index.length === 0 && this.sortField !== '') {
        this.sortDesc = false;
        this.sortField = '';
        this.loadingTable = true;
        this.dashboardData = [];
        this.getInfoDashboard();
      }

      return items;
    },
    redirectToMenu() {
      this.$router.push({
        name: 'adminMenu',
      });
    },
  },
};
</script>

<style lang="scss">
  .admin-dashboard {
    .v-data-table-header  {
      background-color: $tableColor1;
    }
    td {
      font-family: Montserrat, sans-serif;
    }
    th span {
      font-family: Montserrat, sans-serif;
      font-size: 15px;
    }
    tbody tr:nth-child(even) {
      background-color: $tableColor1;
    }

    tbody tr:nth-child(odd) {
      background-color: $tableColor2;
    }

    .barChart {
      height: 319px;
      width: 350px;
      background-color: white;
      display: inline-block;
      justify-content: center;
      align-items: center;
      position: relative;
      margin: 10px 30px 43px 17px;
      border: 1px solid #ccc;
      padding: 0 7px 0 7px;
    }

    .bubbleChart {
      height: 349px;
      width: 350px;
      background-color: white;
      display: inline-block;
      position: relative;
      margin: 9px 30px 43px 17px;
      border: 1px solid #ccc;
      padding: 40px 7px 0 7px;
    }

    .select-group-for-chart {
      width: 15%;
      min-width: 107px;
      top: 5px;
      left: 43%;
    }

    .select-group-for-chart div {
      background-color: white;
    }

    .expand-space {
      position: relative;
    }
  }
  .v-data-footer {
    background-color: $tableColor1;
  }
  .v-pagination__item--active {
    background-color: $bgCardColor1 !important;
    border-color: $bgCardColor1 !important;
  }
  /*.col {*/
  /*  padding-top: 35px;*/
  /*}*/
  .barChartUsersResult .chartCompare {
    position: relative;
  }
  .departmentSummary .chartCompare {
    margin-top: 10px;
    height: 332px;
    width: 350px;
    background-color: white;
    display: inline-block;
    border: 1px solid #ccc;
    margin-bottom: 23px;
    margin-left: 5%;
    padding-bottom: 22px;
  }
  .departmentSummary .chartCompareType {
    height: 319px;
    padding-bottom: 24px;
  }
  .name-label-chart-left {
    top: 150px;
    left: 4px;
  }
  .name-label-chart-top {
    top: 0;
    right: 3px;
  }
  .name-label-chart-right {
    top: 150px;
    right: 4px;
  }
  .name-label-chart-bottom {
    top: 312px;
  }
  .chart-label {
    @media (max-height: $xxsMaxHeight) {
      font-size: 10px;
    }
    font-size: 12px;
  }
  .v-small-dialog__content {
    height: 300px;
  }
  .block {
    border: 1px solid #ccc;
    padding: 0 7px 0 7px;
    margin: 20px 5px 0 5px;
    background-color: white;
  }

  .blockBarChart {
    border: 1px solid #ccc;
    padding: 0 7px 0 7px;
    margin: 20px 5px 0 5px;
    background-color: white;
  }

  .barChartUsersResult .block {
    width: 600px;
  }
  .departmentSummary .block {
    width: 400px;
  }
  .departmentSummary .blockBarChart {
    width: 400px;
    height: 403px;
  }
  .barChartUsersResult {
    display: flex;
    flex: 1;
    overflow-x: auto;
    overflow-y: hidden;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
  }
  .departmentSummary {
    display: inline-block;
    top: 15%;
  }
  .dashboard-chart-padding {
    margin-top: 9px;
    display: block;
  }
  .dashboard-chart-padding-bottom {
    padding: 10px;
  }

  .select-group {
    width: 100%;
    max-width: 200px;
  }
  .select-type {
    width: 100%;
    max-width: 200px;
    margin-top: 7px !important;
  }
  .select-type .v-input__slot {
    background-color: $tableColor1 !important;
  }
  .select-type-text {
    width: 100%;
    max-width: 200px;
    text-align: center;
  }

  .position-title-chart {
    margin-top: 11px;
  }

  .select-type .v-text-field__details {
    display: none;
  }
  .v-sheet .v-text-field__details {
    display: none;
  }
  .search-panel-static {
    width: 350px;
    display: inline-block;
    position: absolute;
    right: 23px;
    z-index: 10000;
  }

  .position-search {
    height: 70px;
  }
  .icon-search {
    font-weight: bold;
  }
  .vl {
    border-left: 1px solid #BFBFBF;
    height: 32px;
  }
  .icon-search-position {
    padding-top: 5px;
    padding-left: 10px;
  }
  .departmentSummaryChart {
    height: 415px;
  }
  .button-save-pdf-text {
    color: white;
  }
  .label-bubble-chart {
    left: 37%;
  }
</style>
