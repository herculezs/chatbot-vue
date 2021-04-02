<template>
    <v-card>
      <v-app class="table-v-app">
        <v-data-table
          item-key="id"
          :headers="headers"
          :items="tableList"
          :footer-props="{
      'items-per-page-options': [],
      'items-per-page-text': '',
      }">
        <template v-slot:body="props">
          <draggable tag="tbody" :list="tableList"
                     :group="{ name: 'selectedEmployers', put: 'employeeList'}"
                     @change="updateBlock"
          >
            <tr
              v-for="(user, index) in props.items"
              :key="index"
            >
              <td> {{ user.name }} </td>
              <td> {{ user.surName }} </td>
              <td>{{ user.email }} </td>
              <td>{{ user.phone }} </td>
              <td> {{ user.invitationSend }}</td>
              <td> {{ user.reminderSentOne }} </td>
              <td> {{ user.reminderSentTwo }} </td>
            </tr>
          </draggable>
        </template>
      </v-data-table>
      <div v-if="showButton">
        <v-btn v-if="setUpRemind" @click.prevent="openModalAutoRemind"
               class="buttons-selected-employers">
          Remind every {{ numberValue }} day(s)</v-btn>
        <v-btn v-else @click.prevent="openModalAutoRemind"
               class="buttons-selected-employers">
          Auto-remind</v-btn>
        <v-btn @click.prevent="sendReminders" class="buttons-selected-employers">
          Send-Reminders</v-btn>
        <v-btn @click.prevent="openModalClearAll" class="buttons-selected-employers">
          Clear All</v-btn>
        <v-dialog v-model="showModalClearAll" max-width="500px">
          <v-card>
            <v-card-title class="headline">
              Are you sure?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeModalClearAll">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="confirmClearAll">Yes</v-btn>
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
      showModalAutoRemind: false,
      setUpRemind: false,
      numberValue: 1,
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
          text: 'REMINDER #1 SENT',
          value: 'reminderSentOne',
          align: 'center',
          sortable: false,
        },
        {
          text: 'REMINDER #2 SENT',
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
    },
    dataEmployee() {
      this.tableList = this.dataEmployee;
    },
    department() {
      if (this.department.daysAutoRemindEvery) {
        this.numberValue = this.department.daysAutoRemindEvery;
        this.setUpRemind = true;
      } else {
        this.numberValue = 1;
        this.setUpRemind = false;
      }
    },
  },
  methods: {
    isNumber($event) {
      const keyCode = ($event.keyCode ? $event.keyCode : $event.which);
      if (((keyCode > 31 && (keyCode < 48 || keyCode > 57)))) {
        $event.preventDefault();
      }
      if (this.numberValue < 0 || this.numberValue > 10) {
        $event.preventDefault();
      }
    },
    sendReminders() {
      if (this.department) {
        this.openModalLeastLeastOneType = !this.checkLeastOneType.includes(true);
        this.$api.manage.sendReminders(this.department.id).then(() => {
          this.getDepartments();
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
    closeModalAutoRemind() {
      this.showModalAutoRemind = false;
    },
    confirmAutoRemind() {
      if (this.department) {
        this.$api.manage.saveAutoReminders(this.department.id, this.numberValue).then((x) => {
          console.log(x);
          this.setUpRemind = true;
          this.showModalAutoRemind = false;
        });
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
</style>
