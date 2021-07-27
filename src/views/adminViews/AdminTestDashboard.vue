<template>
  <div class="admin-dashboard-test">
    <Content>
      <h1 class="h4 text-center mb-3">Test Dashboard</h1>
      <ButtonToMenu/>
      <v-app>
        <v-card>
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
            <template v-slot:top>
              <v-toolbar
                flat
              >
                <v-text-field
                  v-model="search"
                  label="Search"
                  :append-outer-icon="'mdi-send'"
                  clear-icon="mdi-close-circle"
                  class="mx-4"
                  @click:append-outer="searchUser"
                  @keydown="searchUser"
                  clearable
                  @click:clear="clearSearchUser"
                ></v-text-field>
                <font-awesome-icon
                  :icon="'info-circle'"
                  :size="'3x'"
                  class="py-3 purple--text icon-info"
                  alt="information"
                />
                <tippy toSelector=".icon-info"
                       class="tooltip" :placement="'top'">
                  <template>
                    <div class="tooltip">
                      <span class="custom">To search a specific colum enter “column name:
                        search string. For example,
                        entering first:joe would search for “joe” in the First column</span>
                    </div>
                  </template>
                </tippy>
                <v-spacer></v-spacer>
                <v-dialog
                  v-model="dialog"
                  max-width="500px"
                >
                  <template v-slot:activator="{ on, attrs}">
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                      @click="editItem(userChangeForm)"
                    >
                      New User
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col
                            cols="12"
                            sm="6"
                            md="9"
                          >
                            <TelInput
                              v-model="userChangeForm.phone"
                              :diaCode="userChangeForm.diaCode"
                              :validPhone="$v.userChangeForm.phone"
                              @onDiaCode="countryChanged"
                              :placeHolder="configEnv.testdashboard.placeholderPhoneDashboard"
                              :defaultCountry="getDefaultState"
                            ></TelInput>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                          >
                            <v-text-field
                              label="First Name"
                              v-model="userChangeForm.name"
                            ></v-text-field>

                            <template v-if="$v.userChangeForm.name.$error">
                              <div
                                class="form__input-error"
                                v-if="!$v.userChangeForm.name.required"
                              >
                                Field is required
                              </div>
                            </template>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                          >
                            <v-text-field
                              label="Last Name"
                              v-model="userChangeForm.lastName"
                            ></v-text-field>
                            <template v-if="$v.userChangeForm.lastName.$error">
                              <div
                                class="form__input-error"
                                v-if="!$v.userChangeForm.lastName.required"
                              >
                                Field is required
                              </div>
                            </template>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                          >
                            <v-text-field
                              label="Your email"
                              v-model="userChangeForm.yourEmail"
                            ></v-text-field>
                            <template v-if="$v.userChangeForm.yourEmail.$error">
                              <div
                                class="form__input-error"
                                v-if="!$v.userChangeForm.yourEmail.mustBeCool"
                              >
                                Check correct email
                              </div>
                            </template>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                          >
                            <v-text-field
                              label="Password"
                              v-model="userChangeForm.password"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                          >
                            <v-select
                              :items="roles"
                              item-text="label"
                              item-value="value"
                              :label="roleLable"
                              v-model="userChangeForm.selectRole"
                              return-object
                              @change="answers => editRole(answers)"
                            ></v-select>
                            <template v-if="$v.userChangeForm.selectRole.$error">
                              <div
                                class="form__input-error"
                                v-if="!$v.userChangeForm.selectRole.roleValidate"
                              >
                                Field is required
                              </div>
                            </template>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="close"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="save"
                      >
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <QustionnareSelect
                  :expanded="expanded"
                  :item="item"
                />
              </td>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
              >
                mdi-pencil
              </v-icon>
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
import TelInput from '@components/InputTel/TelInput.vue';
import ButtonToMenu from '@components/Dashboard/ButtonToMenu.vue';
import configEnv from '@configEnv/index';
import { validationMixin } from 'vuelidate';
import QustionnareSelect from '@components/Dashboard/QuestionnareSelect.vue';

const {
  required,
} = require('vuelidate/lib/validators');

const roleValidate = (role) => {
  if (!(role.label && role.value)) {
    return false;
  }
  return true;
};

export default {
  name: 'adminDashboard',
  components: {
    TelInput,
    QustionnareSelect,
    ButtonToMenu,
  },
  data: () => ({
    configEnv,
    page: 1,
    search: '',
    searchField: '',
    snack: false,
    itemsPerPage: 0,
    dashboardData: [],
    totalPages: 0,
    dialogDelete: false,
    loadingTable: true,
    removeUserId: '',
    dialog: false,
    countAnswers: 10,
    currentUser: '',
    numberOfTimes: 1,
    disableSubmit1: true,
    disableSubmit2: true,
    expanded: [],
    selectRole: { label: 'Admin', value: 'ADMIN_USER' },
    editedIndex: -1,
    roles: [
      { label: 'ADMIN_USER', value: 'ADMIN_USER' },
      { label: 'SUPER_USER', value: 'SUPER_USER' },
      { label: 'SELENIUM_USER', value: 'SELENIUM_USER' },
      { label: 'USER', value: 'USER' }],
    userChangeForm: {
      id: '',
      phone: '',
      name: '',
      lastName: '',
      yourEmail: '',
      diaCode: '',
      isoCountryCode: '',
      password: '',
      selectRole: [],
    },
    defaultUserChangeForm: {
      id: '',
      phone: '',
      name: '',
      lastName: '',
      yourEmail: '',
      diaCode: '',
      isoCountryCode: '',
      password: '',
      selectRole: [],
    },
    headers: [
      {
        text: 'Phone', value: 'phone', align: 'center', sortable: false,
      },
      {
        text: 'First', value: 'name', align: 'center', sortable: false,
      },
      {
        text: 'Last', value: 'lastName', align: 'center', sortable: false,
      },
      {
        text: 'Email', value: 'yourEmail', align: 'center', sortable: false,
      },
      {
        text: 'Role', value: 'roles', align: 'center', sortable: false,
      },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
  }),
  validations: {
    userChangeForm: {
      phone: {
        required,
      },
      name: {
        required,
      },
      yourEmail: {
        required,
      },
      lastName: {
        required,
      },
      selectRole: {
        roleValidate,
      },
    },
  },
  mixins: [validationMixin],
  mounted() {
    this.getDataTestDashboard();
  },
  computed: {
    getDefaultState() {
      return configEnv.testdashboard.defaultStatePhone;
    },
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    },
    roleLable() {
      return this.editedIndex === -1 ? 'Role' : 'New Role';
    },
    disabled() {
      if (!this.disableSubmit2) {
        if (!this.disableSubmit1) return false;
      }
      return true;
    },
  },
  watch: {
    dialog(val) {
      // eslint-disable-next-line no-unused-expressions
      val || this.close();
    },
  },
  methods: {
    countryChanged(data) {
      this.userChangeForm.isoCountryCode = data.iso2;
      this.userChangeForm.diaCode = data.dialCode;
    },
    pageCounts(currentPage) {
      this.loadingTable = true;
      this.page = currentPage;
      this.dashboardData = [];
      this.getDataTestDashboard();
    },
    getDataTestDashboard() {
      const searchTestDashboard = {};
      if (this.search) {
        const splitSearch = this.search.split(/;/g);

        if (splitSearch.length && splitSearch[0].indexOf(':') !== -1) {
          splitSearch.forEach((x) => {
            const trimSearch = x.trim();
            const getColumn = this.headers.find(y => y.text.toLowerCase() === trimSearch.substring(0, trimSearch.indexOf(':')));
            if (getColumn) {
              const getTextColumn = getColumn.text.toLowerCase();
              searchTestDashboard[getTextColumn] = trimSearch.substring(trimSearch.indexOf(':') + 1, trimSearch.length).trim();
            }
          });
        } else {
          searchTestDashboard.findByAllFields = this.search;
        }
        searchTestDashboard.withSearch = true;
      } else {
        searchTestDashboard.withSearch = false;
      }

      this.$api.admin.getDataTestDashboard(process.env.QUESTIONNAIRE_ID,
        this.page - 1, searchTestDashboard)
        .then((response) => {
          this.dashboardData = [];
          this.page = response.number + 1;
          this.itemsPerPage = response.numberOfElements;
          this.totalPages = response.totalPages;

          if (response.content.length === 0) {
            this.loadingTable = false;
          }

          let resultRole;
          response.content.forEach((x) => {
            resultRole = this.roles.map(role => x.roles.map((y) => {
              if (role.value === y) {
                return role.label;
              }
              return null;
            })).filter(role => role[0] != null);
            this.dashboardData.push({
              id: x.id,
              phone: x.phone,
              name: x.name,
              lastName: x.lastName,
              yourEmail: x.email,
              diaCode: x.codeCountry,
              isoCode: x.isoCountryCode,
              roles: resultRole,
              selectRole: { value: x.roles[0], label: resultRole[0][0] },
            });
            this.loadingTable = false;
          });
        }).catch(() => {
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
    editRole(e) {
      this.userChangeForm.role = e.value;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    close() {
      this.editedIndex = -1;
      this.userChangeForm = Object.assign({}, this.defaultUserChangeForm);
      this.dialog = false;
    },
    searchUser(e) {
      if (e.keyCode === 13 || e.button === 0) {
        this.page = 1;
        this.getDataTestDashboard();
      }
    },
    clearSearchUser() {
      this.search = '';
      this.searchField = '';
      this.dashboardData = [];
      this.loadingTable = true;
      this.getDataTestDashboard();
    },
    removeWaitingUser(item) {
      this.dialogDelete = true;
      this.removeUserId = item.id;
    },
    editItem(item) {
      this.$forceUpdate();
      this.editedIndex = this.dashboardData.indexOf(item);
      this.userChangeForm = Object.assign({}, item);
      if (this.userChangeForm.phone === '') {
        this.userChangeForm.isoCountryCode = configEnv.testdashboard.defaultStatePhone;
        this.userChangeForm.phone = configEnv.testdashboard.defaultCodePhone;
      } else {
        this.userChangeForm.isoCountryCode = item.isoCode;
      }
      this.dialog = true;
    },
    deleteUserConfirm() {
      this.loadingTable = true;
      this.dashboardData = [];
      this.deleteUser();
    },
    getClassByLengthCountryCode() {
      if (this.diaCode) {
        return `code-length-${this.diaCode.length}`;
      }
      return 'scode-length-3';
    },
    save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        if (this.userChangeForm.id) {
          this.$api.admin.updateUserById(process.env.QUESTIONNAIRE_ID,
            this.prepareDataForRequest()).then(() => {
            this.loadingTable = true;
            this.getDataTestDashboard();
            this.dialog = false;
          });
        } else {
          this.$api.admin.createUser(process.env.QUESTIONNAIRE_ID, this.prepareDataForRequest())
            .then(() => {
              this.loadingTable = true;
              this.getDataTestDashboard();
              this.dialog = false;
            });
        }
      }
    },

    prepareDataForRequest() {
      const diaCode = this.userChangeForm.diaCode.charAt(0) === '+' ? this.userChangeForm.diaCode
        : `+${this.userChangeForm.diaCode}`;

      return {
        id: this.userChangeForm.id,
        name: this.userChangeForm.name,
        lastName: this.userChangeForm.lastName,
        youEmail: this.userChangeForm.yourEmail.toLowerCase(),
        phone: this.userChangeForm.phone,
        codeCountry: diaCode,
        isoCountryCode: this.userChangeForm.isoCountryCode,
        password: this.userChangeForm.password,
        role: this.userChangeForm.selectRole.value,
      };
    },
  },
};
</script>

<style lang="scss">
  .admin-dashboard-test .v-data-table-header  {
    background-color: $tableColor1;
  }
  .admin-dashboard-test td {
    font-family: Montserrat, sans-serif;
  }
  .admin-dashboard-test th span {
    font-family: Montserrat, sans-serif;
    font-size: 15px;
  }
  .admin-dashboard-test tbody tr:nth-child(even) {
    background-color: $tableColor1;
  }

  .admin-dashboard-test tbody tr:nth-child(odd) {
    background-color: $tableColor2;
  }
  .admin-dashboard-test .v-data-footer {
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
  .admin-dashboard-test .vti__country-code {
    display: none;
  }
  .admin-dashboard-test .form__input-tel .vti__input {
    padding-left: 20px !important;
  }
  .admin-dashboard-test .form__input-error {
    padding-left: 0;
  }
  .admin-dashboard-test .v-input__control .v-input__slot{
    margin-bottom: -10px;
  }
  .tippy-popper .tippy-backdrop {
    background: $bgCardColor4;
  }
  .tippy-popper .tippy-tooltip {
    background: $bgCardColor4;
    border-radius: 10px;
  }
</style>
