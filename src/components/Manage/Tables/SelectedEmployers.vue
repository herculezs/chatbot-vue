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
                     @change="log"
          >
            <tr
              v-for="(user, index) in props.items"
              :key="index"
            >
              <td> {{ user.name }} </td>
              <td> {{ user.surName }} </td>
              <td> {{ user.email }} </td>
              <td> {{ user.phone}} </td>
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
        <v-btn class="buttons-selected-employers">Send-Reminders</v-btn>
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
                type="number"
            /> days(s)</v-card-title>
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
    department: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      showButton: false,
      showModalClearAll: false,
      showModalAutoRemind: false,
      setUpRemind: false,
      numberValue: 1,
      tableList: [
        {
          name: 'John', surName: 'fdsfdsafsd', id: 1, email: 'test1@test.test', phone: '+380938798318',
        },
        {
          name: 'Joao', surName: 'fdsfdsafsd', id: 2, email: 'test23@test.test', phone: '+3804324324',
        },
        {
          name: 'Jean', surName: 'fdsfdsafsd', id: 3, email: 'test43@test.test', phone: '+3804324324',
        },
        {
          name: 'Gerard', surName: 'fdsfdsafsd', id: 4, email: 'test@test.test', phone: '+3804324324',
        },
      ],
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
          value: 'invitationSent',
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
    openModalClearAll() {
      this.showModalClearAll = true;
    },
    closeModalClearAll() {
      this.showModalClearAll = false;
    },
    confirmClearAll() {
      // logic clearAll
      this.showModalClearAll = false;
    },
    openModalAutoRemind() {
      this.showModalAutoRemind = true;
    },
    closeModalAutoRemind() {
      this.showModalAutoRemind = false;
    },
    confirmAutoRemind() {
      // logic clearAll
      this.setUpRemind = true;
      this.showModalAutoRemind = false;
    },
    log(evt) {
      console.log(this.department);
      if (evt.added) {
        this.$api.manage.saveEmployeeToManager(this.department, evt.added.map(x => x.element.id));
      }
      if (evt.removed) {
        console.log('removed', evt);
      }
      // this.$api.manage.saveEmployeeToManager(evt);
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
</style>
