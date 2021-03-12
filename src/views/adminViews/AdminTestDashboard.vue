<template>
  <div class="admin-dashboard">
    <Content>
      <h1 class="h4 text-center mb-3">Test Dashboard</h1>
      <button
        class="form button button_theme-default
         button_size-m button_theme button_theme"
        @click.prevent="redirectToMenu"
      >
        Back
      </button>
      <v-app>
        <v-card>
          <v-text-field
            v-model="search"
            label="Search by Phone"
            :append-outer-icon="'mdi-send'"
            clear-icon="mdi-close-circle"
            class="mx-4"
            @click:append-outer="searchUser"
            @keydown="searchUser"
            clearable
            @click:clear="clearSearchUser"
          ></v-text-field>
          <v-data-table
            item-key="id"
            :headers="headers"
            :items="dashboardData"
            :page.sync="page"
            class="elevation-1"
            show-expand
            single-expand
            :expanded.sync="expanded"
            :loading="loadingTable"
            :items-per-page="itemsPerPage"
            loading-text="Loading... Please wait"
            hide-default-footer
            @page-count="returnTotalPages()">
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <div class="row">
                  <div class="col">
                    <div class="text-center quiz-score">
                      <h4>Quiz score a number of times</h4>
                    </div>
                    <v-col
                      v-for="count in countAnswers"
                      :key="count"
                      class="d-flex"
                      cols="6"
                      sm="1"
                    >
                      <v-select
                        :items="items"
                        :label="'Question ' + count"
                        :value="questionResult[count]"
                        return-object
                        @change="answers => selectResult(answers, count, item.id)"
                      ></v-select>
                    </v-col>
                      <v-col
                        class="d-flex"
                        cols="4"
                        sm="1"
                      >
                        <v-select
                          :items="NumberOfTimes"
                          :value="numberOfTimes"
                          label="Number Of Times"
                          return-object
                          @change="answers => selectNumberOfTimes(answers, item.id)"
                        ></v-select>
                      </v-col>
                    <v-col
                      class="d-flex"
                      cols="4"
                      sm="1"
                    >
                      <v-btn
                        class="button-send"
                        elevation="7"
                        :disabled="disabled"
                        @click="sendQuestionnaireResult"
                      >Submit</v-btn>
                      </v-col>
                  </div>
                </div>
              </td>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon
                @click="removeWaitingUser(item)"
              >
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
          <div class="text-center pt-2">
            <v-pagination
              v-model="page"
              :disabled="loadingTable"
              :length="totalPages"
              :total-visible="10"
              @input="pageCounts"
            ></v-pagination>
          </div>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">
                Are you sure you want to delete this user?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteUserConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card>
      </v-app>
    </Content>
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import Stretch from 'vue-loading-spinner/src/components/Stretch';

export default {
  name: 'adminDashboard',
  components: {
  },
  data: () => ({
    Stretch,
    page: 1,
    search: null,
    snack: false,
    itemsPerPage: 0,
    dashboardData: [],
    totalPages: 0,
    dialogDelete: false,
    loadingTable: true,
    removeUserId: '',
    countAnswers: 10,
    currentUser: '',
    questionResult: {},
    numberOfTimes: 1,
    disableSubmit1: true,
    disableSubmit2: true,
    expanded: [],
    items: ['1', '2', '3', '4', '5', '6'],
    NumberOfTimes: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    headers: [
      {
        text: 'Phone', value: 'phone', align: 'center', sortable: false,
      },
      {
        text: 'First Name', value: 'name', align: 'center', sortable: false,
      },
      {
        text: 'Last Name', value: 'lastName', align: 'center', sortable: false,
      },
      {
        text: 'Your Email', value: 'yourEmail', align: 'center', sortable: false,
      },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
  }),
  mounted() {
    this.getDataTestDashboard();
  },
  computed: {
    disabled() {
      if (!this.disableSubmit2) {
        if (!this.disableSubmit1) return false;
      }
      return true;
    },
  },
  watch: {
    expanded() {
      this.questionResult = {};
      this.numberOfTimes = 1;
      this.currentUser = '';
      this.disableSubmit2 = true;
      this.disableSubmit1 = true;
    },
  },
  methods: {
    pageCounts(currentPage) {
      this.loadingTable = true;
      this.page = currentPage;
      this.dashboardData = [];
      this.getDataTestDashboard();
    },
    getDataTestDashboard() {
      this.$api.admin.getDataTestDashboard(process.env.QUESTIONNAIRE_ID, this.page - 1, this.search)
        .then((response) => {
          this.dashboardData = [];
          this.page = response.number + 1;
          this.itemsPerPage = response.numberOfElements;
          this.totalPages = response.totalPages;
          response.content.forEach((x) => {
            this.dashboardData.push({
              id: x.id,
              phone: x.phone,
              name: x.name,
              lastName: x.lastName,
              yourEmail: x.email,
            });
            this.loadingTable = false;
          });
          this.search = null;
        }).catch(() => {
          this.search = null;
          this.loadingTable = false;
        });
    },
    deleteUser() {
      this.$api.admin.deleteUserById(process.env.QUESTIONNAIRE_ID, this.removeUserId)
        .then(() => {
          this.getDataTestDashboard();
          this.dialogDelete = false;
        });
    },
    returnTotalPages() {
      return this.totalPages;
    },
    selectResult(answer, question, userId) {
      if (this.currentUser === userId) {
        this.questionResult[question] = answer;
        if (Object.keys(this.questionResult).length === 10) {
          this.disableSubmit2 = false;
        }
      } else {
        this.questionResult = {};
        this.questionResult[question] = answer;
        this.currentUser = userId;
      }
    },
    sendQuestionnaireResult() {
      this.$api.admin.addQuestionnaireResult(process.env.QUESTIONNAIRE_ID, this.currentUser,
        this.questionResult, this.numberOfTimes);
    },
    selectNumberOfTimes(count, userId) {
      if (this.currentUser === userId) {
        this.numberOfTimes = count;
        this.disableSubmit1 = false;
      } else {
        this.numberOfTimes = 1;
        this.numberOfTimes = count;
        this.disableSubmit1 = false;
        this.currentUser = userId;
      }
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    searchUser(e) {
      if (e.keyCode === 13 || e.button === 0) {
        this.page = 1;
        this.loadingTable = true;
        this.getDataTestDashboard();
      }
    },
    clearSearchUser() {
      this.search = null;
    },
    redirectToMenu() {
      this.$router.push({
        name: 'adminMenu',
      });
    },
    removeWaitingUser(item) {
      this.dialogDelete = true;
      this.removeUserId = item.id;
    },
    deleteUserConfirm() {
      this.loadingTable = true;
      this.dashboardData = [];
      this.deleteUser();
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
  .col {
    display: flex;
    width: 400px;
    flex-wrap: wrap;
  }
  .numberOfTimes {
    width: 200px;
  }
  .button-send {
    margin: 13px;
  }
  .quiz-score {
    width: 100%;
    margin-top: 10px;
  }
</style>
