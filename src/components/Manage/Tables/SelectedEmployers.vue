<template>
    <v-card>
      <v-app class="table-v-app">
        <v-data-table
          item-key="id"
          :headers="headers"
          :items="tableList"
          hide-default-footer
          :items-per-page="tableList.length"
          :footer-props="{
      'items-per-page-options': [],
      'items-per-page-text': '',
      }">
        <template v-slot:body="props">
          <draggable tag="tbody" :list="tableList" :disabled="disableClearAll"
                     :group="{ name: 'selectedEmployers', put: 'employeeList'}"
                     @change="updateBlock"
          >
            <tr
              v-for="(user, index) in props.items"
              :key="index"
            >
              <td> {{ user.name }} </td>
              <td> {{ user.surName }} </td>
              <td class="emails"> {{ user.email }} </td>
              <td> {{ user.phone }} </td>
              <td :class="checkCorrectColor(user.completeU1, user.countCompleteU2)">
                {{ user.invitationSend }}</td>
              <td :class="checkCorrectColor(user.completeU1, user.countCompleteU2)">
                {{ checkComplete(user.completeU1, user.countCompleteU2,
                user.reminderSentOne, user.invitationSend, user.reminderSentTwo, false,
                user.id)}}</td>
              <td :class="checkCorrectColor(user.completeU1, user.countCompleteU2)">
                {{ checkComplete(user.completeU1, user.countCompleteU2,
                user.reminderSentTwo, user.reminderSentOne, user.reminderSentTwo, true,
                user.id)}}</td>
            </tr>
          </draggable>
        </template>
      </v-data-table>
      <div class="footer-selected-employee" v-if="showButton">
        <v-spacer></v-spacer>
        <v-btn v-if="currentButtonSend === true" @click.prevent="buttonPause"
               color="primary"
               dark
               class="buttons-selected-employers">
          Pause</v-btn>
        <v-btn v-else-if="currentButtonSend === null && retry"
               @click.prevent="openModalAutoRemind"
               class="buttons-selected-employers">
          Retry</v-btn>
        <v-btn v-else-if="currentButtonSend === null" :disabled="disableButtonSend"
               @click.prevent="openModalAutoRemind"
               class="buttons-selected-employers">
          Send</v-btn>
        <v-btn v-else-if="currentButtonSend === false" @click.prevent="resumeAutoRemind"
               class="buttons-selected-employers"
               color="primary"
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

        <v-dialog v-model="showModalAutoRemind" max-width="500px">
          <v-card>
            <v-card-title class="headline">
              Remind every
              <v-text-field
                class="remindEvery"
                @keypress="isNumber($event)"
                v-model.number="numberValue"
                hide-details
                single-line
            /> day(s)</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeModalAutoRemind">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="confirmAutoRemind">Yes</v-btn>
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
      retry: false,
      numberValue: 1,
      employeeCompleted: [],
      employeeIncompleted: [],
      employeeIncompletedAndCompleted: [],
      tableList: [],
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
  mounted() {
    this.showButton = this.tableList.length > 0;
  },
  watch: {
    tableList() {
      this.showButton = this.tableList.length > 0;
      this.disableButtonSend = !(this.tableList.length >= 5);
      this.employeeCompleted = [];
      this.employeeIncompleted = [];
      this.employeeIncompletedAndCompleted = [];
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
    employeeIncompletedAndCompleted() {
      this.retry = this.employeeIncompletedAndCompleted
        .filter(this.onlyUnique).length === this.tableList.length;
    },
  },
  methods: {
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
    checkCorrectColor(completeU1, countCompleteU2) {
      if (completeU1 && countCompleteU2 === 0) {
        return 'complete-people-u1';
      } if (completeU1 && countCompleteU2 <= 4) {
        return 'complete-people-u1 complete-people-u2-less4';
      } if (completeU1 && countCompleteU2 > 3 && countCompleteU2 <= this.tableList.length - 1) {
        return 'complete-people-u1 complete-people-u2-less-total';
      }
      if (completeU1 && countCompleteU2 === this.tableList.length - 1) {
        return 'complete-people-u1 complete-people-u2-equal-total';
      }
      return '';
    },
    checkComplete(completeU1, countCompleteU2, remind, checkBeforeData, checkIncomplete,
      lastReminder, id) {
      if (checkBeforeData) {
        if (!completeU1 && lastReminder) {
          if (this.tableList.length !== this.employeeIncompleted.length) {
            this.employeeIncompleted.push(id);
            this.employeeIncompletedAndCompleted.push(id);
          }

          return 'Incomplete';
        }
        if (completeU1 && countCompleteU2 === 0) {
          if (checkIncomplete && lastReminder) {
            if (this.tableList.length !== this.employeeIncompleted.length) {
              this.employeeIncompleted.push(id);
              this.employeeIncompletedAndCompleted.push(id);
            }

            return 'Incomplete';
          }
        } if (completeU1 && countCompleteU2 <= 4) {
          if (checkIncomplete && lastReminder) {
            if (this.tableList.length !== this.employeeIncompleted.length) {
              this.employeeIncompleted.push(id);
              this.employeeIncompletedAndCompleted.push(id);
            }

            return 'Incomplete';
          }
        } if (completeU1 && countCompleteU2 > 3
        && countCompleteU2 <= this.tableList.length) {
          if (checkIncomplete && lastReminder) {
            if (this.tableList.length !== this.employeeIncompleted.length) {
              this.employeeIncompleted.push(id);
              this.employeeIncompletedAndCompleted.push(id);
            }

            return 'Incomplete';
          }
        }
        if (completeU1 && countCompleteU2 === this.tableList.length) {
          if (checkIncomplete && !lastReminder) {
            return remind;
          }
          if (this.tableList.length !== this.employeeCompleted.length) {
            this.employeeCompleted.push(id);
            this.employeeIncompletedAndCompleted.push(id);
          }
          return 'Complete';
        }
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
      if (this.retry) {
        if (this.department) {
          const competedFilter = this.employeeCompleted.filter(this.onlyUnique);
          const inCompetedFilter = this.employeeIncompleted.filter(this.onlyUnique);

          this.$api.manage.retryAutoReminders(this.department.id, this.numberValue,
            competedFilter, inCompetedFilter).then(() => {
            this.currentButtonSend = true;
            this.disableClearAll = true;
            this.getDepartments();
            this.setUpRemind = true;
            this.showModalAutoRemind = false;
          });
        }
        this.setUpRemind = true;
        this.showModalAutoRemind = false;
      } else {
        if (this.department) {
          this.$api.manage.saveAutoReminders(this.department.id, this.numberValue).then(() => {
            this.currentButtonSend = true;
            this.disableClearAll = true;
            this.getDepartments();
            this.setUpRemind = true;
            this.showModalAutoRemind = false;
          });
        }
        this.setUpRemind = true;
        this.showModalAutoRemind = false;
      }
    },
    clearAll() {
      if (this.department) {
        this.$api.manage.clearAllAdminPanel(this.department.id).then(() => {
          this.getDepartments();
        });
      }
    },
    updateBlock(evt) {
      if (evt.added) {
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
      if (evt.removed) {
        this.$api.manage.removeOneEmployee(this.department.id, evt.removed.element.id).then(() => {
          this.getDepartments();
          this.$emit('enlarge-text', 1);
        });
      }
      if (evt.moved) {
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
</style>
