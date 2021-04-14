<template>
  <div class="admin-panel">
      <draggable class="admin-panel-content" :list="trashList"
                 handle=".handle"
                 :options="trashOptions">
        <div class="col-11">
          <div class="manager-name">
            <v-toolbar>
              <span>MANAGER: {{`${getProfile.name} ${getProfile.lastName}`.toUpperCase()}} </span>
            </v-toolbar>
          </div>
          <div class="department">
            <div class="padding-adaptive">
            <v-app class="input-department">
              <v-toolbar>
                GROUP:
                <v-autocomplete
                  v-model="department"
                  :search-input.sync="departmentName"
                  :items="items"
                  item-text="name"
                  item-value="id"
                  flat
                  hide-no-data
                  hide-details
                  return-object
                  label="What you department?"
                  solo
                  :hide-selected="true"
                  @change="selectOtherDepartments"
                  :disabled="disableAutoComplete"
                >
                  <!--       @keyup.prevent="newDepartmentEv"           -->
                  <template v-slot:item="{ item }">
                    <v-list-item-content>
                      <v-list-item-title v-text="item.name"></v-list-item-title>
                    </v-list-item-content>
                    <v-btn icon color="blue darken-1"
                           @click="openModalUpdateDepartment" text>
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon color="red darken-1"
                           @click.stop="openModalDeleteDepartment(item.id)" text>
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </template>
                </v-autocomplete>
                <v-btn icon @click.prevent="newDepartmentEv">
                  <v-icon>mdi-plus-circle-outline</v-icon>
                </v-btn>
              </v-toolbar>
              <v-dialog v-model="showModalDepartmentDelete" max-width="500px">
                <v-card>
                  <v-card-title class="headline">
                    Are you sure?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeModalDeleteDepartment">
                      Cancel</v-btn>
                    <v-btn color="red darken-1" text @click="confirmDeleteDepartment">Yes</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="showModalDepartmentUpdate" max-width="500px">
                <v-card>
                  <v-card-title class="headline">
                    Update Department:
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
            </div>
          </div>
          <div class="manager-remind-time" v-if="department != null && department.timeNextRemind">
            <v-toolbar>
              <span>
                NEXT REMINDER: {{formatDateReminder()}}
              </span>
            </v-toolbar>
          </div>
          <div class="no-next-reminder" v-else></div>
          <div class="body-panel-table">
            <div class="col-10">
              <div class="table-employers">
                <SelectedEmployers :dataEmployee="tableData" :department.sync="department"
                                   :getDepartments="getDepartments"
                                   v-on:enlarge-text="updateEmployeeList += $event"
                />
              </div>
            </div>
            <div class="col-3 employee-list-main">
              <div class="list-employers">
                <EmployeeList :department="department" :update="updateEmployeeList"/>
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
      department: null,
      disableAutoComplete: false,
      departmentId: null,
      newDepartment: null,
      departmentName: null,
      removeDepartmentId: null,
      showModalDepartmentUpdate: false,
      showModalDepartmentDelete: false,
      updateEmployeeList: 1,
      postFontSize: 1,
      changeDate: 1,
      timer: 0,
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
  mounted() {
    this.getDepartments();
    this.checkUpdated();
  },
  methods: {
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
    },
    departmentSave() {
      if (this.departmentName != null) {
        const id = this.department ? this.department.id : null;
        this.disableAutoComplete = true;
        this.$api.manage.saveDepartment(this.departmentName, id).then(() => {
          this.getDepartments();
          this.showModalDepartmentUpdate = false;
          this.disableAutoComplete = false;
        }).catch(() => {
          this.disableAutoComplete = false;
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
              reminderSentOne: x.employeeDto.reminderSent1,
              reminderSentTwo: x.employeeDto.reminderSent2,
              completeU1: x.employeeDto.completeU1,
              countCompleteU2: x.employeeDto.countCompleteU2,
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
    openModalDeleteDepartment(id) {
      this.removeDepartmentId = id;
      this.showModalDepartmentDelete = true;
    },
    closeModalDeleteDepartment() {
      this.showModalDepartmentDelete = false;
    },
    confirmDeleteDepartment() {
      if (this.removeDepartmentId) {
        this.$api.manage.deleteDepartment(this.removeDepartmentId).then(() => {
          this.getDepartments();
          this.showModalDepartmentDelete = false;
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
    width: 360px;
    display: inline-block;
    top: 20px;
  }
  .department {
    font-weight: bold;
    font-size: 20px;
    display: inline-block;
  }
  .manager-name {
    margin-left: 13px;
    font-weight: bold;
    font-size: 20px;
    display: inline-block;
    margin-right: 40%;
  }
  .manager-remind-time {
    margin-left: 13px;
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
    margin-top: 60px;
  }
</style>
