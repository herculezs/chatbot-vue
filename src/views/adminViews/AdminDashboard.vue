<template>
  <div class="admin-dashboard">
    <Content>
      <h1 class="h4 text-center mb-3">Dashboard</h1>
      <v-app>
        <v-card>
          <v-data-table
            item-key="userId"
            :headers="headers"
            :items="dashboardData"
            :page.sync="page"
            class="elevation-1"
            show-expand
            :loading="loadingTable"
            :items-per-page="itemsPerPage"
            loading-text="Loading... Please wait"
            hide-default-footer
            @page-count="calculateCountPage()">
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <div class="row">
                  <div class="col">
                    <div>
                      <div class="barChartUsersResult">
                        <div class="text-center">Colleagues result</div>
                        <Radar :data=item.chartBar></Radar>

                        <ChartCompare :data="item.chartCompare">
                        </ChartCompare>
                      </div>
<!--                      {{item.otherResult}}-->
                    </div>
                  </div>
                </div>
              </td>
            </template>
            <template v-slot:item.scoreOverall="props">
              <v-edit-dialog
                :return-value.sync="props.item.scoreOverall"
                @open="open"
              >
                {{ props.item.scoreOverall }}
                <template v-slot:input>
                  <ChartConsistencyOverall :data="props.item.scoreOverallChart">
                  </ChartConsistencyOverall>
                </template>
              </v-edit-dialog>
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
import Radar from '@components/Radar/Radar.vue';
import constants from '@constants/index';
import ChartCompare from '@components/Charts/ChartCompare.vue';

export default {
  name: 'adminDashboard',
  components: {
    ChartConsistencyOverall,
    Radar,
    ChartCompare,
  },
  data: () => ({
    Stretch,
    page: 7,
    snack: false,
    pageCount: 0,
    itemsPerPage: 20,
    dashboardData: [],
    loadingTable: true,
    chartCompare: [],
    radarData: [],
    headers: [
      { text: 'Employee', value: 'employee', align: 'center' },
      { text: 'Department', value: 'department', align: 'center' },
      { text: 'Manager', value: 'manager', align: 'center' },
      { text: 'Consistency score overall', value: 'scoreOverall', align: 'center' },
      { text: 'Number connection\'s', value: 'numberConnections', align: 'center' },
      { text: 'Type', value: 'type', align: 'center' },
      { text: 'Preferred Reviewer Ranking', value: 'reviewerRanking', align: 'center' },
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
      return Math.floor(this.pageCount / this.itemsPerPage);
    },
    pageCounts(currentPage) {
      this.loadingTable = true;
      this.page = currentPage;
      this.dashboardData = [];
      this.getInfoDashboard(process.env.QUESTIONNAIRE_ID);
    },
    countUsers() {
      this.$api.admin.countUsers().then((x) => {
        this.pageCount = x;
      });
    },
    getInfoDashboard() {
      this.$api.admin.getInfoDashboard(process.env.QUESTIONNAIRE_ID, this.page)
        .then((response) => {
          response.forEach((x) => {
            this.chartCompare = [];
            this.selfCoordinate = [];
            this.otherCoordinate = [];
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
            }

            this.chartOptionsBar(type, otherType);
            this.dashboardData.push({
              userId: x.id,
              employee: x.employee,
              department: x.department,
              manager: x.manager,
              scoreOverall: `${x.scoreOverall.generalPercent}%`,
              scoreOverallChart: x.scoreOverall,
              numberConnections: x.numberConnection,
              type,
              reviewerRanking: x.reviewerRanking,
              chartBar: this.radarData,
              chartCompare: this.chartCompare,
            });
            this.loadingTable = false;
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
    height: 350px;
    width: 300px;
    background-color: white;
    display: inline-block;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-top: 10px;
    left: 40%;
    transform: translateX(-50%);
  }
  .col {
    height: 500px;
  }
  .chartCompare {
    height: 350px;
    width: 400px;
    background-color: white;
    display: inline-block;
    transform: translateX(-50%);
    position: relative;
    margin-bottom: 18px;
    padding-bottom: 18px;
    left: 50%;
  }
  .name-label-chart-left {
    top: 180px;
    left: 4px;
  }
  .name-label-chart-top {
    top: 40px;
  }
  .name-label-chart-right {
    top: 180px;
    right: 4px;
  }
  .name-label-chart-bottom {
    top: 330px;

  }
  .chart-label {
    @media (max-height: $xxsMaxHeight) {
      font-size: 10px;
    }
    font-size: 12px;
  }
  .v-small-dialog__content {
    height: 350px;
  }
</style>
