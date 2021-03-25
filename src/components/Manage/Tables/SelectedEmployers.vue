<template>

  <v-app>
    <v-card>
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
        <v-btn  class="buttons-selected-employers">Auto-remind</v-btn>
        <v-btn class="buttons-selected-employers">Send-Reminders</v-btn>
        <v-btn @click="openModalClearAll" class="buttons-selected-employers">Clear All</v-btn>
        <v-dialog v-model="clearAll" max-width="500px">
          <v-card>
            <v-card-title class="headline">
              Are you sure you want to delete this user?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeModalClearAll">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="clearAllConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-card>
  </v-app>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  name: 'TablesEmployers',
  components: {
    draggable,
  },
  data() {
    return {
      showButton: false,
      clearAll: false,
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
      console.log('1');
      this.showButton = this.tableList.length > 0;
    },
  },
  methods: {
    openModalClearAll() {
      this.clearAll = true;
    },
    closeModalClearAll() {
      this.clearAll = false;
    },
    clearAllConfirm() {
      // logic clearAll
      this.clearAll = false;
    },
    log(evt) {
      // request to BE update selectedEmployers
      window.console.log('---2313', evt);
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
</style>
