<template>
  <div class="admin-dashboard">
    <Content>
      <h1 class="h4 text-center mb-3">Dashboard</h1>
      <div data-app>
        <v-data-table
          item-key="name"
          :headers="headers"
          :items="desserts"
          :page.sync="page"
          :show-expand="true"
          :loading="loadingTable"
          :items-per-page="itemsPerPage"
          loading-text="Loading... Please wait"
          hide-default-footer
          @page-count="calculateCountPage()"
          class="elevation-1"
        >
        </v-data-table>
        <div class="text-center pt-2">
          <v-pagination
            v-model="page"
            :disabled="disableButton"
            :length="calculateCountPage()"
            :total-visible="10"
            @input="pageCounts"
          ></v-pagination>
        </div>
      </div>
      <v-progress-linear
        indeterminate
        color="yellow darken-2"
      ></v-progress-linear>
    </Content>
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import Stretch from 'vue-loading-spinner/src/components/Stretch';
import helpFunction from '@helpers/helpFuction';

export default {
  name: 'adminDashboard',
  components: {
  },
  data: () => ({
    Stretch,
    page: 1,
    pageCount: 0,
    itemsPerPage: 20,
    desserts: [],
    disableButton: true,
    loadingTable: true,
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
    calculateCountPage() {
      return Math.floor(this.pageCount / this.itemsPerPage);
    },
    pageCounts(currentPage) {
      this.loadingTable = true;
      this.page = currentPage;
      this.desserts = [];
      this.disableButton = true;
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
            let type = '';
            if (x.type) {
              // eslint-disable-next-line prefer-destructuring
              type = helpFunction.Coordinates(x.type)[2];
            }

            this.desserts.push({
              employee: x.employee,
              department: x.department,
              manager: x.manager,
              scoreOverall: `${x.scoreOverall.generalPercent}%`,
              numberConnections: x.numberConnection,
              type,
              reviewerRanking: x.reviewerRanking,
            });
            this.disableButton = false;
          });
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
</style>
