<template>
  <div class="admin-panel">
      <draggable class="admin-panel-content" :list="trashList"
                 handle=".handle"
                 :options="trashOptions">
        <div class="col-11">
          <div class="body-panel-table">
            <div class="col-9">
              <div class="table-employers">
                <div class="manager-name">
                  <v-toolbar>
                    <span>MANAGER: {{`${getProfile.name} ${getProfile.lastName}`.toUpperCase()}}
                    </span>
                  </v-toolbar>
                </div>
                <div class="switch-help">
                  <div class="text-help">
                    <v-app>
                      <v-toolbar>
                        <span>Help text:</span>
                        <v-switch class="show-switch-text"
                                  v-model="showHelp"
                                  @change="changeSwitch"
                                  inset
                        ></v-switch>
                      </v-toolbar>
                    </v-app>
                  </div>
                </div>
                <div class="manager-remind-time"
                     v-if="department != null && department.timeNextRemind">
                  <v-toolbar>
                    <span>
                      NEXT REMINDER: {{formatDateReminder()}}
                    </span>
                  </v-toolbar>
                </div>
                <div class="no-next-reminder" v-else></div>
                <SelectedEmployers :dataEmployee="tableData" :department.sync="department"
                                   :getDepartments="getDepartments"
                                   :showHelp="showHelp"
                                   v-on:enlarge-text="updateEmployeeList += $event"
                                   v-on:disable-clear-all="disableMoveItem = $event"
                />
              </div>
            </div>
            <div class="col-4 employee-list-main">
              <div class="list-employers">
                <div class="department">
                  <ejs-tooltip mouseTrail='true'
                               :cssClass="showHelp ? '' : 'custom'"
                               :content="showHelp ? 'Create, Select and Delete Groups' : null"
                               target=".input-department"
                               :showTipPointer=false>
                    <v-app class="input-department">
                      <v-toolbar>
                        GROUP:
                        <v-autocomplete
                          ref="autocomplete"
                          v-model="department"
                          :menu-props="{ closeOnClick: true, closeOnContentClick: true, }"
                          :search-input.sync="departmentName"
                          :items="items"
                          item-text="name"
                          item-value="id"
                          flat
                          hide-no-data
                          hide-details
                          return-object
                          label="Enter Group name"
                          solo
                          @change="selectOtherDepartments"
                          :disabled="disableAutoComplete"
                          data-app="true"
                          @keyup.enter.stop="newDepartmentEv"
                        >
                          <template v-slot:item="{ item }">
                            <v-list-item-content>
                              <v-list-item-title v-text="item.name"></v-list-item-title>
                            </v-list-item-content>
                            <v-btn icon color="blue darken-1"
                                   @click="openModalUpdateDepartment" text>
                              <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn icon color="red darken-1"
                                   @click.stop="openModalDeleteDepartment(item.id, item.name)" text>
                              <v-icon>mdi-delete</v-icon>
                            </v-btn>
                          </template>
                        </v-autocomplete>
                        <v-btn icon @click.prevent.stop="newDepartmentEv">
                          <v-icon :color="changeButtonColor">mdi-plus-circle-outline</v-icon>
                        </v-btn>
                      </v-toolbar>
                      <v-dialog v-model="showModalDepartmentDelete" max-width="500px">
                        <v-card>
                          <v-card-title class="headline">
                            Are you sure you want to delete {{removeDepartmentName}}?</v-card-title>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="closeModalDeleteDepartment">
                              Cancel</v-btn>
                            <v-btn color="red darken-1" text @click="confirmDeleteDepartment">
                              Yes</v-btn>
                            <v-spacer></v-spacer>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                      <v-dialog v-model="showModalDepartmentUpdate" max-width="500px">
                        <v-card>
                          <v-card-title class="headline">
                            Update Group:
                            <v-text-field
                              class="updatedDepartment"
                              v-model="departmentName"
                              hide-details
                              single-line
                            /></v-card-title>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text
                                   @click="closeModalAutoRemind">Cancel</v-btn>
                            <v-btn color="blue darken-1" text
                                   @click="confirmAutoRemind">Yes</v-btn>
                            <v-spacer></v-spacer>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-app>
                  </ejs-tooltip>
                  <div class="margin-group"></div>
                </div>
                <EmployeeList :department="department" :update="updateEmployeeList"
                              :removeGroup="removeGroup"
                              :showHelp="showHelp"
                              :getDepartments="getDepartments"
                              :disableMoveItem="disableMoveItem"
                />
              </div>
            </div>
          </div>
        </div>
      </draggable>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import SelectedEmployers from '@components/Manage/Tables/SelectedEmployers.vue';
import EmployeeList from '@components/Manage/Tables/EmployeeList.vue';
import draggable from 'vuedraggable';

export default {
  name: 'adminPanel',
  display: 'Two Lists',
  order: 1,
  components: {
    SelectedEmployers,
    EmployeeList,
    draggable,
  },
  data() {
    return {
      items: [],
      tableData: [],
      removeGroup: 1,
      department: null,
      disableAutoComplete: false,
      departmentId: null,
      newDepartment: null,
      departmentName: null,
      departmentTempName: null,
      removeDepartmentId: null,
      changeButtonColor: '',
      showModalDepartmentUpdate: false,
      showModalDepartmentDelete: false,
      updateEmployeeList: 1,
      postFontSize: 1,
      changeDate: 1,
      disableMoveItem: false,
      showHelp: false,
      timer: 0,
      removeDepartmentName: '',
      trashOptions: {
        group: {
          name: 'trash',
          ghostClass: 'ghost',
          put: ['selectedEmployers'],
          pull: false,
        },
      },
      trashList: [],
    };
  },
  computed: {
    ...mapGetters({
      getProfile: 'auth/getProfile',
    }),
  },
  watch: {
    departmentName() {
      if (this.departmentName === '') {
        this.removeGroup = this.removeGroup + 1;
        this.tableData = [];
      }
    },
  },
  beforeUpdate() {
    this.checkUpdated();
  },
  mounted() {
    this.changeSwitch();
    this.getDepartments();
    this.checkUpdated();
    const autocompleteInput = this.$refs.autocomplete.$refs.input;
    autocompleteInput.addEventListener('focus', this.focusAutoSelect, true);
    autocompleteInput.addEventListener('blur', this.blurAutoSelect, true);
  },
  methods: {
    changeSwitch(changeType) {
      if (changeType != null) {
        this.$api.manage.offTextHelp(changeType).then((res) => {
          this.showHelp = res;
        });
      } else {
        this.$api.manage.offTextHelp().then((res) => {
          if (res === '') {
            this.showHelp = true;
          } else {
            this.showHelp = res;
          }
        });
      }
    },
    focusAutoSelect() {
      this.changeButtonColor = '#ff0d00';
    },
    blurAutoSelect() {
      this.departmentTempName = this.departmentName;
      this.changeButtonColor = '';
      this.$refs.autocomplete.blur();
    },
    getDepartments() {
      this.$api.manage.getDepartments().then((res) => {
        this.items = [];
        this.department = res.find(x => x.selectedDepartment === true);
        res.forEach((x) => {
          this.items.push({
            name: x.name,
            id: x.id,
            daysAutoRemindEvery: x.daysAutoRemindEvery,
            autoRemindSwitchOff: x.autoRemindSwitchOff,
            selectedDepartment: x.selectedDepartment,
            timeNextRemind: x.timeNextRemind,
            countRetry: x.countRetry,
          });
        });
        this.loadDataAdminPanel();
      });
    },
    async selectOtherDepartments() {
      if (this.department) {
        await this.$api.manage.selectedDepartmentByDefault(this.department.id);
        await this.$api.manage.getDepartments().then((res) => {
          this.items = [];
          this.department = res.find(x => x.selectedDepartment === true);
          res.forEach((x) => {
            this.items.push({
              name: x.name,
              id: x.id,
              daysAutoRemindEvery: x.daysAutoRemindEvery,
              autoRemindSwitchOff: x.autoRemindSwitchOff,
              selectedDepartment: x.selectedDepartment,
              timeNextRemind: x.timeNextRemind,
              countRetry: x.countRetry,
            });
          });
          this.loadDataAdminPanel();
        });
      }
    },
    departmentSave() {
      if ((this.departmentName != null && this.departmentName !== '')
        || (this.departmentTempName != null && this.departmentTempName !== '')) {
        const departmentName = this.departmentTempName ? this.departmentTempName
          : this.departmentName;
        this.departmentName = '';
        const id = this.department ? this.department.id : null;
        this.disableAutoComplete = true;
        this.$api.manage.saveDepartment(departmentName, id).then(() => {
          this.getDepartments();
          this.showModalDepartmentUpdate = false;
          this.disableAutoComplete = false;
          this.departmentTempName = null;
        }).catch(() => {
          this.disableAutoComplete = false;
          this.departmentTempName = null;
          this.getDepartments();
        });
        this.checkUpdated();
      }
    },
    loadDataAdminPanel() {
      if (this.department) {
        this.$api.manage.getDataAdminPanel(this.department.id).then((res) => {
          this.tableData = [];
          res.forEach((x) => {
            this.tableData.push({
              id: x.employeeDto.id,
              name: x.employeeDto.name,
              surName: x.employeeDto.surName,
              phone: x.employeeDto.phone,
              email: x.employeeDto.corporateEmail,
              invitationType: x.employeeDto.invitationType,
              invitationSend: x.employeeDto.invitationSend,
              colorInvitation: x.employeeDto.colorInvitation,
              reminderSentOne: x.employeeDto.reminderSent1,
              colorReminder1: x.employeeDto.colorReminder1,
              reminderSentTwo: x.employeeDto.reminderSent2,
              colorReminder2: x.employeeDto.colorReminder2,
              completeU1: x.employeeDto.completeU1,
              countCompleteU2: x.employeeDto.countCompleteU2,
              countAllGroup: x.employeeDto.countAllGroup,
              countCompleteEmployee: x.employeeDto.countCompleteEmployee,
            });
          });
        });
      }
    },
    closeModalAutoRemind() {
      this.showModalDepartmentUpdate = false;
    },
    confirmAutoRemind() {
      this.departmentSave();
    },
    newDepartmentEv() {
      if (this.department) {
        this.department.id = null;
      }
      this.departmentSave();
    },
    openModalUpdateDepartment() {
      this.showModalDepartmentUpdate = true;
    },
    openModalDeleteDepartment(id, name) {
      this.removeDepartmentId = id;
      this.removeDepartmentName = name;
      this.showModalDepartmentDelete = true;
    },
    closeModalDeleteDepartment() {
      this.showModalDepartmentDelete = false;
    },
    confirmDeleteDepartment() {
      if (this.removeDepartmentId) {
        this.$api.manage.deleteDepartment(this.removeDepartmentId).then(() => {
          this.tableData = [];
          this.items = [];
          this.removeGroup = this.removeGroup + 1;
          this.getDepartments();
          this.showModalDepartmentDelete = false;
          this.removeDepartmentName = '';
        });
      }
    },
    formatDateReminder() {
      return `${this.$moment(this.department.timeNextRemind).locale('en-GB')
        .format('dddd, MMMM D [at] hh:mm a')}`;
    },
    checkUpdated() {
      const that = this;
      clearTimeout(this.timer);
      that.timer = setTimeout(function tick() {
        if (that.department) {
          that.$api.manage.checkUpdatedData(that.department.id).then((res) => {
            if (res) {
              that.getDepartments();
            }
            that.timer = setTimeout(tick, 30000);
          });
        }
      }, 30000);
    },
  },
};
</script>

<style lang="scss">
  td {
    text-align: center;
    vertical-align: middle;
  }
  .admin-panel-content {
    display: flex;
  }
  .admin-panel-content .department .v-autocomplete__content {
    max-width: 233px;
    min-width: 223px !important;
  }
  .input-department {
    min-width: 250px;
    max-width: 360px;
    display: inline-block;
    top: 20px;
  }
  .department {
    font-weight: bold;
    font-size: 20px;
    display: inline-block;
  }
  .manager-name {
    max-width: 430px;
    font-weight: bold;
    font-size: 20px;
    display: inline-block;
    margin-right: 40%;
  }
  .manager-remind-time {
    font-weight: bold;
    font-size: 20px;
    display: inline-block;
    margin-right: 30%;
  }
  .test {
    display: none;
  }
  .remove {
    height: 18vh;
  }
  .footer{
    height: 24.5vh;
  }
  .multi-drag {
    opacity: 0.7;
    padding: 5px;
    background-color: #cccccc;
  }
  .body-panel-table {
    display: flex;
  }
  .admin-panel-content > .sortable-ghost {
    display: none;
  }
  .v-application .v-application--wrap{
    min-height: initial;
  }
  .updatedDepartment {
    margin-left: 10px;
    margin-bottom: 14px;
  }
  .padding-adaptive {
    margin-left: 13px;
  }
  .no-next-reminder {
    margin-top: 70px;
  }
  .margin-group {
    margin-top: 70px;
    @media (max-width: 1170px) {
      margin-top: 140px;
    }
  }
  .plus-icon {
    color: #005fff;
  }
  .switch-help {
    width: 200px;
    display: inline-block;
  }
  .show-switch-text {
    padding-top: 18px !important;
    padding-left: 20px !important;
  }
  .text-help {
    font-weight: bold;
    font-size: 20px;
  }
  .employee-list-main {
    flex: 0 0 35.5% !important;
    max-width: 35.5% !important;
  }
  .e-tooltip-wrap.e-popup {
    background: $bgCardColor4;
    color: white;
    border-radius: 10px;
    padding: 5px 10px 4px;
  }
  .custom.e-tooltip-wrap.e-popup {
    padding: 0;
  }
  .custom-padding.e-tooltip-wrap.e-popup {
    margin-bottom: 1000px;
  }
</style>
