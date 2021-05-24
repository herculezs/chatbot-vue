<template>
    <v-card>
      <v-app class="table-v-app">
        <ejs-tooltip mouseTrail='true'
                     :cssClass="showHelp ? '' : 'custom'"
                     :content="showHelp ? tableList.length <= 0 ?
                      'Enter GROUP name and drag-and-drop users here to construct your groups' :
                      'To remove, drag the name back to the employee list' : null"
                     target="#selectedEmployeeTable"
                     :showTipPointer=false>
          <v-data-table
                  class="table-manager"
                  item-key="id"
                  :headers="headers"
                  :items="tableList"
                  :items-per-page="-1"
                  hide-default-footer
                  :loading="disableButtonAndLoadTable"
          >
            To remove, drag the name back to the employee list
            <template v-slot:body="props">
              <draggable tag="tbody"
                         id="selectedEmployeeTable"
                         :list="tableList" :disabled="disableDropDown()"
                         :group="{ name: 'selectedEmployers', put: 'employeeList'}"
                         @change="updateBlock"
                         draggable=".draggableListUser"
              >
                <tr
                        v-for="(user, index) in props.items"
                        :key="index"
                        class="draggableListUser"
                >
                  <td> {{ user.name }} </td>
                  <td> {{ user.surName }} </td>
                  <td class="emails"> {{ user.email }} </td>
                  <td> {{ user.phone }} </td>
                  <td :class="checkCorrectColor(user.colorInvitation)">
                    {{ user.invitationSend }}</td>
                  <td :class="checkCorrectColor(user.colorReminder1)">
                    {{ checkComplete(user.completeU1, user.countCompleteU2,
                    user.reminderSentOne, user.invitationSend, user.reminderSentTwo, false,
                    user.id, user.invitationSend)}}
                  </td>
                  <td :class="checkCorrectColor(user.colorReminder2)">
                    {{ checkComplete(user.completeU1, user.countCompleteU2,
                    user.reminderSentTwo, user.reminderSentOne, user.reminderSentTwo, true,
                    user.id, user.invitationSend)}}
                  </td>
                </tr>
                <tr
                        v-for="(user, index) in tempUser"
                        :key="'A'+ index"
                >
                  <td> {{ user.temp1 }} </td>
                  <td> {{ user.temp2 }} </td>
                  <td> {{ user.temp3 }} </td>
                  <td> {{ user.temp4 }} </td>
                  <td> {{ user.temp5 }} </td>
                  <td> {{ user.temp6 }} </td>
                  <td> {{ user.temp7 }} </td>
                </tr>
              </draggable>
            </template>
          </v-data-table>
        </ejs-tooltip>
      <div class="footer-selected-employee" v-if="showButton">
        <v-spacer></v-spacer>
        <v-btn v-if="currentButtonSend === true" @click.prevent="buttonPause"
               dark
               id="button-reset-pause"
               class="buttons-selected-employers">
          PAUSE/STOP</v-btn>
        <!--suppress XmlDuplicatedId -->
        <v-btn v-else-if="checkRetryAutoRemind"
               @click.prevent="openModalAutoRemind"
               :disabled="disableButtonAndLoadTable"
               id="send_remind"
               class="buttons-selected-employers">
          MORE <br/>REMINDERS</v-btn>
        <!--suppress XmlDuplicatedId -->
        <v-btn v-else-if="checkSendAutoRemind"
               :disabled="disableButtonSend || disableButtonAndLoadTable || disableSend"
               @click.prevent="openModalAutoRemind"
               id="send_remind"
               class="buttons-selected-employers">
          Send</v-btn>
        <!--suppress XmlDuplicatedId -->
        <v-btn v-else-if="currentButtonSend === null"
               :disabled="disableButtonSend || disableButtonAndLoadTable || disableSend"
               @click.prevent="openModalAutoRemind"
               id="send_remind"
               class="buttons-selected-employers">
          Send</v-btn>
        <v-btn v-else-if="currentButtonSend === false" @click.prevent="resumeAutoRemind"
               class="buttons-selected-employers"
               dark
        >
          Resume</v-btn>

        <v-btn @click.prevent="openModalClearAll" :disabled="disableClearAll"
               class="buttons-selected-employers">
          Clear All</v-btn>
        <v-dialog
          v-model="showCancelModal"
          width="210"
        >
          <v-card>
            <v-card-title>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="buttons-selected-employers"
                      @click="buttonPauseCansel">PAUSE</v-btn>
              <v-btn color="buttons-selected-employers"
                     id="button-reset"
                     @click="buttonRESET">RESET</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="showModalClearAll" max-width="500px">
          <v-card>
            <v-card-title class="headline">
              Are you sure?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeModalClearAll">Cancel</v-btn>
              <v-btn color="red darken-1" text @click="confirmClearAll">Yes</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-app class="modal-error">
          <v-dialog
            v-model="errorTheSameEmployeeModal"
            width="500"
          >
            <v-card>
              <v-card-title class="headline red lighten-2">
                Error
              </v-card-title>
              <v-card-text>
                <br/>
                <h4>
                  This group is has the same employees
                  as {{errorTheSameEmployee.duplicateGroupName}}.
                  Please amend the employees or refer
                  to the results for {{errorTheSameEmployee.originalGroupName}}
                </h4>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  text
                  @click="errorTheSameEmployeeModal = false"
                >
                  Okay
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-app>
        <v-dialog v-model="showModalAutoRemind" max-width="500px">
          <v-card>
            <v-card-title class="headline">
              Remind every
              <v-text-field
                class="remindEvery"
                id="remind-every-select-time"
                @keypress="isNumber($event)"
                v-model.number="numberValue"
                hide-details
                single-line
            /> day(s)</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeModalAutoRemind">Cancel</v-btn>
              <v-btn color="blue darken-1" id="confirm_remind" text @click="confirmAutoRemind">
                Yes</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      </v-app>
    </v-card>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  name: 'TablesEmployers',
  components: {
    draggable,
  },
  props: {
    showHelp: {
      type: Boolean,
      default: true,
    },
    dataEmployee: {
      type: Array,
      default: () => [],
    },
    department: {
      type: Object,
      default: () => {},
    },
    getDepartments: {
      type: Function,
    },
  },
  data() {
    return {
      openModalLeastLeastOneType: false,
      checkLeastOneType: [],
      showButton: false,
      showModalClearAll: false,
      showCancelModal: false,
      showModalAutoRemind: false,
      setUpRemind: false,
      currentButtonSend: null,
      disableButtonSend: true,
      disableClearAll: false,
      allPeopleGetAllReminders: false,
      disableSend: false,
      errorTheSameEmployeeModal: false,
      numberValue: 1,
      checkSecondStage: false,
      employeeCompleted: [],
      employeeIncompletedAndCompleted: new Set(),
      tableList: [],
      tempUser: [],
      disableButtonAndLoadTable: false,
      errorTheSameEmployee: {},
      headers: [
        {
          text: 'NAME', value: 'name', align: 'center', sortable: false,
        },
        {
          text: 'SECOND NAME', value: 'surName', align: 'center', sortable: false,
        },
        {
          text: 'EMAIL', value: 'email', align: 'center', sortable: false,
        },
        {
          text: 'PHONE', value: 'phone', align: 'center', sortable: false,
        },
        {
          text: 'INVITATION SENT',
          value: 'invitationSend',
          align: 'center',
          sortable: false,
        },
        {
          text: 'REMINDER # SENT',
          value: 'reminderSentOne',
          align: 'center',
          sortable: false,
        },
        {
          text: 'REMINDER # SENT',
          value: 'reminderSentTwo',
          align: 'center',
          sortable: false,
        },
      ],
    };
  },
  computed: {
    checkRetryAutoRemind() {
      return (this.currentButtonSend === null
        && (this.department.countRetry === 2 && this.checkSecondStage))
        || (this.department.countRetry === 1 && this.allPeopleGetAllReminders
          && this.tableList.length >= 5);
    },
    checkSendAutoRemind() {
      return this.currentButtonSend === null
        && (this.department.countRetry === 2 && this.allPeopleGetAllReminders);
    },
  },
  mounted() {
    this.showButton = this.tableList.length > 0;
    if (this.tableList.length === 0) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < 10; i++) {
        this.tempUser.push({
          temp1: '', temp2: '', temp3: '', temp4: '', temp5: '', temp6: '', temp7: '',
        });
      }
    }
  },
  updated() {
    if (this.tableList.length !== 0) {
      this.allPeopleGetAllReminders = this.tableList.every(x => x.reminderSentTwo
      || this.employeeCompleted.find(y => y === x.id));
      this.checkSecondStage = this.tableList.every(x => (x.reminderSentOne && !x.reminderSentTwo)
        || this.employeeCompleted.find(y => y === x.id));
    }
  },
  watch: {
    disableClearAll() {
      this.$emit('disable-clear-all', this.disableClearAll);
    },
    tableList() {
      this.showButton = this.tableList.length > 0;
      this.disableButtonSend = !(this.tableList.length >= 5);
      this.employeeCompleted = [];
      this.employeeIncompletedAndCompleted = new Set();
      this.disableSend = this.tableList.every(x => x.reminderSentTwo);
      if (this.tableList.length <= 9) {
        this.tempUser = [];
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < 9 - this.tableList.length; i++) {
          this.tempUser.push({
            temp1: '', temp2: '', temp3: '', temp4: '', temp5: '', temp6: '', temp7: '',
          });
        }
      }
      if (this.tableList.length > 10) {
        this.tempUser = [];
      }
    },
    dataEmployee() {
      this.tableList = this.dataEmployee;
    },
    department() {
      if (this.department) {
        this.getDinamicHeaders();
        if (this.department.autoRemindSwitchOff === true) {
          this.disableClearAll = true;
        }
        if (this.department.autoRemindSwitchOff === false) {
          this.disableClearAll = true;
        }

        if (this.department.daysAutoRemindEvery) {
          this.numberValue = this.department.daysAutoRemindEvery;
          this.currentButtonSend = this.department.autoRemindSwitchOff;
          this.setUpRemind = true;
        } else {
          this.numberValue = 1;
          this.setUpRemind = false;
          this.currentButtonSend = null;
          this.disableClearAll = false;
        }
      }
    },
  },
  methods: {
    disableDropDown() {
      if (this.department && this.department.countRetry === 2) {
        return this.disableClearAll || (this.department.countRetry === 2);
      }
      return this.disableClearAll;
    },
    getDinamicHeaders() {
      if (this.department) {
        this.headers = [
          {
            text: 'NAME', value: 'name', align: 'center', sortable: false,
          },
          {
            text: 'SECOND NAME', value: 'surName', align: 'center', sortable: false,
          },
          {
            text: 'EMAIL', value: 'email', align: 'center', sortable: false,
          },
          {
            text: 'PHONE', value: 'phone', align: 'center', sortable: false,
          },
          {
            text: 'INVITATION SENT',
            value: 'invitationSend',
            align: 'center',
            sortable: false,
          },
          {
            text: `REMINDER #${this.department.countRetry + (this.department.countRetry - 1)} SENT`,
            value: 'reminderSentOne',
            align: 'center',
            sortable: false,
          },
          {
            text: `REMINDER #${this.department.countRetry + this.department.countRetry} SENT`,
            value: 'reminderSentTwo',
            align: 'center',
            sortable: false,
          },
        ];
      }
    },
    checkCorrectColor(colorField) {
      if (colorField === 'PURPLE') {
        return 'complete-people-u1 complete-people-u2-equal-total';
      }
      if (colorField === 'GREEN') {
        return 'complete-people-u1 complete-people-u2-less-total';
      }
      if (colorField === 'RED') {
        return 'complete-people-u1 complete-people-u2-less4';
      }
      if (colorField === 'BOLD') {
        return 'complete-people-u1';
      }

      return '';
    },
    addedAndFilterCompletedUsers(id) {
      this.employeeCompleted.push(id);
      this.employeeIncompletedAndCompleted.add(id);
    },
    addedAndFilterIncompletedUsers(id) {
      this.employeeIncompletedAndCompleted.add(id);
    },
    checkComplete(completeU1, countCompleteU2, remind, checkBeforeData, checkIncomplete,
      lastReminder, id, checkInvitation) {
      if (checkInvitation) {
        if (completeU1 && countCompleteU2 === this.tableList.length - 1) {
          if (this.tableList.length > this.employeeIncompletedAndCompleted.size) {
            this.addedAndFilterCompletedUsers(id);
          }
          if (checkIncomplete === null) {
            return 'Complete';
          }
          if (remind && checkIncomplete && lastReminder) {
            return 'Complete';
          }

          if (!checkIncomplete) {
            return 'Complete';
          }

          return remind;
        }
      }
      if (checkBeforeData) {
        if (!completeU1 && lastReminder && checkIncomplete) {
          if (this.tableList.length > this.employeeIncompletedAndCompleted.size) {
            this.addedAndFilterIncompletedUsers(id);
          }
          return 'Incomplete';
        }
        if ((completeU1 && countCompleteU2 === 0) || (completeU1 && countCompleteU2 <= 4)
        || (completeU1 && countCompleteU2 > 3 && countCompleteU2 <= this.tableList.length)) {
          if (checkIncomplete && lastReminder) {
            if (this.tableList.length > this.employeeIncompletedAndCompleted.size) {
              this.addedAndFilterIncompletedUsers(id);
            }
            return 'Incomplete';
          }
        }
      }
      if (this.tableList.length > this.employeeIncompletedAndCompleted.size) {
        this.addedAndFilterIncompletedUsers(id);
      }
      return remind;
    },
    onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    },
    isNumber($event) {
      const keyCode = ($event.keyCode ? $event.keyCode : $event.which);
      if (((keyCode > 31 && (keyCode < 48 || keyCode > 57)))) {
        $event.preventDefault();
      }
      if (this.numberValue < 0 || this.numberValue > 10) {
        $event.preventDefault();
      }
    },
    resumeAutoRemind() {
      if (this.department) {
        this.$api.manage.resumeAutoReminders(this.department.id).then(() => {
          this.currentButtonSend = true;
          this.disableClearAll = true;
          this.getDepartments();
          this.setUpRemind = false;
          this.showCancelModal = false;
        });
      }
    },
    openModalClearAll() {
      this.showModalClearAll = true;
    },
    closeModalClearAll() {
      this.showModalClearAll = false;
    },
    confirmClearAll() {
      this.clearAll();
      this.showModalClearAll = false;
    },
    openModalAutoRemind() {
      this.showModalAutoRemind = true;
    },
    buttonPause() {
      this.showCancelModal = true;
    },
    buttonRESET() {
      if (this.department) {
        this.$api.manage.resetAutoReminders(this.department.id).then(() => {
          this.currentButtonSend = null;
          this.disableClearAll = false;
          this.numberValue = 1;
          this.getDepartments();
          this.setUpRemind = false;
          this.showCancelModal = false;
        });
      }
    },
    buttonPauseCansel() {
      if (this.department) {
        this.$api.manage.pauseAutoReminders(this.department.id).then(() => {
          this.currentButtonSend = false;
          this.setUpRemind = false;
          this.showCancelModal = false;
          this.disableClearAll = true;
        });
      }
    },
    closeModalAutoRemind() {
      this.showModalAutoRemind = false;
    },
    confirmAutoRemind() {
      if (this.checkRetryAutoRemind) {
        if (this.department) {
          const competedFilter = this.employeeCompleted.filter(this.onlyUnique);
          this.disableButtonAndLoadTable = true;
          this.$api.manage.retryAutoReminders(this.department.id, this.numberValue,
            competedFilter).then(() => {
            this.currentButtonSend = true;
            this.disableClearAll = true;
            this.getDepartments();
            this.setUpRemind = true;
            this.showModalAutoRemind = false;
            this.disableButtonAndLoadTable = false;
          }).catch(() => {
            this.disableButtonAndLoadTable = false;
          });
        }
      } else if (this.checkSendAutoRemind) {
        if (this.department) {
          this.disableButtonAndLoadTable = true;
          this.$api.manage.saveAutoReminders(this.department.id, this.numberValue).then((data) => {
            this.errorTheSameEmployee = {
              duplicateGroupName: data.duplicateGroupName,
              originalGroupName: data.originalGroupName,
            };
            this.errorTheSameEmployeeModal = data.findSimilar;
            this.currentButtonSend = true;
            this.disableClearAll = true;
            this.getDepartments();
            this.setUpRemind = true;
            this.showModalAutoRemind = false;
            this.disableButtonAndLoadTable = false;
          }).catch(() => {
            this.disableButtonAndLoadTable = false;
          });
        }
      } else if (this.currentButtonSend === null) {
        if (this.department) {
          this.disableButtonAndLoadTable = true;
          this.$api.manage.saveAutoReminders(this.department.id, this.numberValue).then((data) => {
            this.errorTheSameEmployee = {
              duplicateGroupName: data.duplicateGroupName,
              originalGroupName: data.originalGroupName,
            };
            this.errorTheSameEmployeeModal = data.findSimilar;
            this.currentButtonSend = true;
            this.disableClearAll = true;
            this.getDepartments();
            this.setUpRemind = true;
            this.showModalAutoRemind = false;
            this.disableButtonAndLoadTable = false;
          }).catch(() => {
            this.disableButtonAndLoadTable = false;
          });
        }
      }
      this.setUpRemind = true;
      this.showModalAutoRemind = false;
    },
    clearAll() {
      if (this.department) {
        this.$api.manage.clearAllAdminPanel(this.department.id).then(() => {
          this.getDepartments();
        });
      }
    },
    updateBlock(evt) {
      if (evt.added && (evt.added.element || evt.added[0].element)) {
        if (evt.added.element) {
          this.$api.manage.saveEmployeeToManager(this.department.id,
            [evt.added.element.id]).then(() => {
            this.getDepartments();
          });
        } else {
          this.$api.manage.saveEmployeeToManager(this.department.id,
            evt.added.map(x => x.element.id)).then(() => {
            this.getDepartments();
          });
        }
      }
      if (evt.removed && evt.removed.element) {
        this.$api.manage.removeOneEmployee(this.department.id,
          evt.removed.element.id).then(() => {
          this.getDepartments();
          this.$emit('enlarge-text', 1);
        });
      }
      if (evt.moved && evt.moved.element) {
        this.getDepartments();
      }
    },
  },
};
</script>

<style lang="scss">
  .buttons-selected-employers {
    margin-left: 10px;
    margin-right: 20px;
    margin-bottom: 15px;
    background-color: $btnColor1 !important;
    color: white !important;
  }
  .table-v-app .v-application--wrap{
    min-height: initial;
  }
  .remindEvery {
    max-width: 60px;
    padding-bottom: 9px;
    padding-left: 12px;
  }
  .invitation-sent-selected {
    display: flex;
  }
  .button-confirm {
    margin-top: 15px;
    margin-right: 10px;
    margin-left: 10px;
  }
  .table-v-app .v-label {
    top: 3px;
    margin-right: 10px;
  }
  .select-type-text {
    position: relative;
    top: 21px;
    right: 10px;
    font-weight: bold;
  }
  .select-type-td {
    cursor: pointer;
  }
  .footer-selected-employee {
    margin-top: 15px;
  }
  .complete-people-u1 {
    font-weight: bold;
  }
  .complete-people-u2-less4 {
    color: #ec6b66;
  }
  .complete-people-u2-less-total {
    color: #17cc00;
  }
  .complete-people-u2-equal-total {
    color: #6a27ff;
  }
  .no-item-text {
    padding-left: 40px;
    font-size: 18px;
    color: #9a9a9a;
    font-family: sans-serif Montserrat;
    font-weight: bold;
    font-style: italic;
  }
  .table-manager {
    min-height: 500px;
  }
</style>
