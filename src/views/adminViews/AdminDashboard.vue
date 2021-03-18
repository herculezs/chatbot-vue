<template>
  <div class="admin-dashboard">
    <Content>
      <ButtonToMenu/>
      <v-app>
        <v-card>
          <v-data-table
            item-key="userId"
            :headers="headers"
            :items="dashboardData"
            :page.sync="page"
            class="elevation-1"
            show-expand
            single-expand
            :loading="loadingTable"
            :items-per-page="itemsPerPage"
            loading-text="Loading... Please wait"
            hide-default-footer
            :custom-sort="customSort"
            @page-count="calculateCountPage()">
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <div class="row">
                  <div class="col">
                      <div class="barChartUsersResult">
                        <div class="departmentSummary">
                          <div class="blockBarChart">
                            <div class="text-center">Consistency score overall</div>
                            <ChartConsistencyOverall :data="item.scoreOverallChart">
                            </ChartConsistencyOverall>
                          </div>
                        </div>
                        <div class="departmentSummary">
                          <div class="blockBarChart">
                            <div class="text-center">Colleagues result</div>
                            <Radar :data=item.chartBar></Radar>
                          </div>
                        </div>
                        <div class="departmentSummary">
                          <div class="block">
                            <div class="text-center">Colleagues result</div>
                            <ChartCompare :data="item.chartCompare">
                            </ChartCompare>
                          </div>
                        </div>
                        <div class="departmentSummary">
                          <div class="block">
                            <div class="text-center">Department summary</div>
                            <DepartmentSummaryChart :respondentsCount=item.countOther
                                                    :data="item.departmentSummary">
                            </DepartmentSummaryChart>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              </td>
            </template>
<!--            <template v-slot:item.numberConnections="props">-->
<!--              <v-edit-dialog-->
<!--                :return-value.sync="props.item.numberConnections"-->
<!--                @open="open"-->
<!--              >-->
<!--                {{ props.item.numberConnections }}-->
<!--                <template v-slot:input>-->
<!--                </template>-->
<!--              </v-edit-dialog>-->
<!--            </template>-->
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
    headers: [
      { text: 'Employee', value: 'employee', align: 'center' },
      { text: 'Department', value: 'department', align: 'center' },
      { text: 'Manager', value: 'manager', align: 'center' },
      {
        text: 'Consistency score overall',
        value: 'scoreOverall',
        align: 'center',
        sortable: false,
      },
      {
        text: 'Number connection\'s',
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
            this.chartCompare = [];
            this.selfCoordinate = [];
            this.otherCoordinate = [];
            this.departmentSummary = [];
            this.departmentSummaryOtherResult = [];
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

            let type = '';
            let otherType = '';

            if (x.result) {
              // eslint-disable-next-line prefer-destructuring
              type = helpFunction.Coordinates(x.result)[2];
              this.setRadar(x.result, 'Me');
              this.selfCoordinate = helpFunction.Coordinates(x.result);
            }

            if (x.otherResult) {
              // eslint-disable-next-line prefer-destructuring
              otherType = helpFunction.Coordinates(x.otherResult)[2];
              this.setRadar(x.otherResult, 'Contacts');
              this.otherCoordinate = helpFunction.Coordinates(x.otherResult);
              x.eachU1Result.forEach((element) => {
                this.departmentSummaryOtherResult.push(helpFunction.Coordinates(element));
              });
            }

            this.chartOptionsBar(type, otherType);
            this.chartOptionsBarDepartmentSummary();
            this.dashboardData.push({
              userId: x.id,
              employee: x.employee,
              department: x.department,
              countOther: x.reviewerRanking,
              manager: x.manager,
              scoreOverall: `${x.scoreOverall.generalPercent}%`,
              scoreOverallChart: x.scoreOverall,
              numberConnections: x.numberConnection,
              type,
              reviewerRanking: x.reviewerRanking,
              chartBar: this.radarData,
              chartCompare: this.chartCompare,
              departmentSummary: this.departmentSummary,
            });
            this.loadingTable = false;
            this.$forceUpdate();
          });
        });
    },

    setRadar(data, name) {
      const average = this.radarData.find(item => item.name === name);
      average.value = Object.values(data);
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
  .v-data-footer {
    background-color: $tableColor1;
  }
  .v-pagination__item--active {
    background-color: $bgCardColor1 !important;
    border-color: $bgCardColor1 !important;
  }
  .barChart {
    height: 300px;
    width: 225px;
    background-color: white;
    display: inline-block;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: 10px 30px 23px 40px;
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
    width: 320px;
  }
  .barChartUsersResult {
    display: flex;
    flex-wrap: wrap;
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
</style>
