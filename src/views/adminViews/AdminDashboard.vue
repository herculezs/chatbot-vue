<template>
  <div class="admin-dashboard">
    <Content>
      <h1 class="h4 text-center mb-3">Dashboard</h1>
      <ButtonToMenu/>
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
            @page-count="calculateCountPage()">
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
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <div class="row">
                  <div class="col">
                      <div class="barChartUsersResult">
                        <div class="departmentSummary">
                          <div class="blockBarChart">
                            <div class="text-center">Consistency Score - Detail</div>
                            <ChartConsistencyOverall :data="item.scoreOverallChart">
                            </ChartConsistencyOverall>
                          </div>
                        </div>
                        <div class="departmentSummary">
                          <div class="blockBarChart">
                            <div class="text-center">Colleagues Result</div>
                            <Radar :data=item.chartBar></Radar>
                          </div>
                        </div>
                        <div class="departmentSummary">
                          <div class="block">
                            <div class="text-center">Colleagues Result</div>
                            <ChartCompare :data="item.chartCompare">
                            </ChartCompare>
                          </div>
                        </div>
                        <div class="departmentSummary">
                          <div class="block">
                            <div class="text-center">Department Summary</div>
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
import Radar from '@components/Radar/Radar.vue';
import constants from '@constants/index';
import ChartCompare from '@components/Charts/ChartCompare.vue';
import ButtonToMenu from '@components/Dashboard/ButtonToMenu.vue';

export default {
  name: 'adminDashboard',
  components: {
    ChartConsistencyOverall,
    Radar,
    ChartCompare,
    DepartmentSummaryChart,
    ButtonToMenu,
  },
  data: () => ({
    Stretch,
    page: 1,
    snack: false,
    pageCount: 0,
    itemsPerPage: 20,
    dashboardData: [],
    loadingTable: true,
    chartCompare: [],
    radarData: [],
    sortField: '',
    sortDesc: false,
    departmentSummary: [],
    departmentSummaryOtherResult: [],
    expanded: [],
    selectedGroup: [],
    headers: [
      { text: '', value: 'expand', align: 'end' },
      { text: 'Employee', value: 'employee', align: 'center' },
      {
        text: 'Created', value: 'createdDate', align: 'center', sortable: false,
      },
      { text: 'Department', value: 'department', align: 'center' },
      { text: 'Manager', value: 'manager', align: 'center' },
      {
        text: 'Consistency score overall',
        value: 'scoreOverall',
        align: 'center',
        sortable: false,
      },
      {
        text: 'Connections',
        value: 'numberConnections',
        align: 'center',
        sortable: false,
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
        value: 'reviewerRanking',
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
  },
  watch: {
  },
  methods: {
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
            const type = this.calculateDataForChart(x);
            const d = new Date(x.createdDate);
            const createdDate = `${(`0${d.getDate()}`).slice(-2)}-${(`0${d.getMonth() + 1}`)
              .slice(-2)}-${d.getFullYear()}`;

            this.dashboardData.push({
              userId: x.id,
              employee: x.employee,
              department: x.department,
              countOther: x.numberConnection,
              manager: x.manager,
              scoreOverall: `${x.scoreOverall.generalPercent}%`,
              scoreOverallChart: x.scoreOverall,
              numberConnections: x.numberConnection,
              createdDate,
              type,
              reviewerRanking: x.reviewerRanking,
              chartBar: this.radarData,
              chartCompare: this.chartCompare,
              departmentSummary: this.departmentSummary,
              itemsSelectGroups: x.userGroups,
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
        this.calculateDataForChart(data);

        this.dashboardData = this.dashboardData.map((x) => {
          if (x.userId === userId) {
            return {
              userId: x.userId,
              employee: x.employee,
              department: x.department,
              numberConnections: x.numberConnections,
              countOther: data.numberConnection,
              manager: x.manager,
              scoreOverall: x.scoreOverall,
              scoreOverallChart: data.scoreOverall,
              createdDate: x.createdDate,
              type: x.type,
              reviewerRanking: x.reviewerRanking,
              chartBar: this.radarData,
              chartCompare: this.chartCompare,
              departmentSummary: this.departmentSummary,
              itemsSelectGroups: x.itemsSelectGroups,
            };
          }

          return x;
        });
      });
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
          name: 'Me',
        },
        {
          value: [],
          type: 'bar',
          areaStyle: {
            color: '#ff5151',
            colorHover: 'rgba(255,81,81,0.73)',
          },
          name: 'Contacts',
        },
      ];
    },

    setRadar(data, name) {
      const average = this.radarData.find(item => item.name === name);
      average.value = Object.values(data);
    },

    calculateDataForChart(data) {
      let otherType = '';
      let type = '';
      if (data.result) {
        // eslint-disable-next-line prefer-destructuring
        type = helpFunction.Coordinates(data.result)[2];
        this.setRadar(data.result.split(/(?=[-+])/), 'Me');
        this.selfCoordinate = helpFunction.Coordinates(data.result);
      }

      if (data.otherResult) {
        // eslint-disable-next-line prefer-destructuring
        otherType = helpFunction.Coordinates(data.otherResult)[2];
        this.setRadar(data.otherResult.split(/(?=[-+])/), 'Contacts');
        this.otherCoordinate = helpFunction.Coordinates(data.otherResult);
        data.eachU1Result.forEach((element) => {
          this.departmentSummaryOtherResult.push(helpFunction.Coordinates(element));
        });
      }
      this.chartOptionsBar(type, otherType);
      this.chartOptionsBarDepartmentSummary();
      return type;
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
            data: [this.selfCoordinate[0], this.selfCoordinate[1], `You scored yourself as - \n${type}`],
          },
        );
      }

      if (this.otherCoordinate) {
        this.chartCompare.push({
          value: [],
          type: 'COLLEAGUE',
          data: [this.otherCoordinate[0], this.otherCoordinate[1], `Your contacts say - \n${otherType}`],
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
          data: [element[0], element[1], counts[element[2]]],
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
  }
  .admin-dashboard .v-data-table-header  {
    background-color: $tableColor1;
  }
  .admin-dashboard td {
    font-family: Montserrat, sans-serif;
  }
  .admin-dashboard th span {
    font-family: Montserrat, sans-serif;
    font-size: 15px;
  }
  .admin-dashboard tbody tr:nth-child(even) {
    background-color: $tableColor1;
  }

  .admin-dashboard tbody tr:nth-child(odd) {
    background-color: $tableColor2;
  }
  .v-data-footer {
    background-color: $tableColor1;
  }
  .v-pagination__item--active {
    background-color: $bgCardColor1 !important;
    border-color: $bgCardColor1 !important;
  }
  .admin-dashboard .barChart {
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
  .col {
    margin-bottom: 20px;
  }
  .barChartUsersResult .chartCompare {
    position: relative;
  }
  .departmentSummary .chartCompare {
    margin-top: 10px;
    height: 319px;
    width: 350px;
    background-color: white;
    display: inline-block;
    border: 1px solid #ccc;
    margin-bottom: 23px;
    margin-left: 5%;
    padding-bottom: 18px;
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
    top: 300px;
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
    height: 375px;
  }
  .barChartUsersResult {
    display: flex;
    flex: 1;
    overflow-x: auto;
    overflow-y: hidden;
    align-items: center;
    justify-content: center;
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
</style>
