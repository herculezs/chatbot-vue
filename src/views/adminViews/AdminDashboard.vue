<template>
  <div class="admin-dashboard">
    <Content>
      <h1 class="h4 text-center mb-3">Dashboard</h1>
      <v-app>
        <v-card>
          <v-data-table
            item-key="name"
            :headers="headers"
            :items="desserts"
            :page.sync="page"
            class="elevation-1"
            @click:row="clicked"
            single-expand
            :loading="loadingTable"
            :items-per-page="itemsPerPage"
            loading-text="Loading... Please wait"
            hide-default-footer
            @page-count="calculateCountPage()"
            @item-expanded="loadDetails">
            >
            <template v-slot:item.employee="props">
              <v-edit-dialog
                :return-value.sync="props.item.employee"
                @open="open"
              >
                {{ props.item.employee }}
                <template v-slot:input>
                  3244444444444444444444444444444444444444444444444444
                </template>
              </v-edit-dialog>
            </template>
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
        </v-card>
      </v-app>
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
    page: 7,
    snack: false,
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
    open() {
      this.snack = true;
    },
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
              userId: x.id,
              employee: x.employee,
              department: x.department,
              manager: x.manager,
              scoreOverall: `${x.scoreOverall.generalPercent}%`,
              numberConnections: x.numberConnection,
              type,
              reviewerRanking: x.reviewerRanking,
            });
            this.disableButton = false;
            this.loadingTable = false;
          });
        });
    },
    loadDetails({ item }) {
      console.log('item', item);
    },
    clicked(value) {
      console.log('value', value);
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
