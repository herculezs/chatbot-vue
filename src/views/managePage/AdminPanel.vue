<template>
  <div class="admin-panel">
    <div class="admin-panel-content">
      <div class="col-12">
        <div class="manager-name">
          <span>Manager: {{`${getProfile.name} ${getProfile.lastName}`}} </span>
        </div>
        <div class="department">
          <span>Department: <v-text-field
            label="Sales"
            class="input-department"
            solo>
          </v-text-field>
          </span>
        </div>
        <div class="body-panel-table">
          <div class="col-10">
            <div class="table-employers">
              <v-card>
                <v-data-table
                  item-key="id"
                  :headers="headers"
                  hide-default-footer
                  :items="tableList">
                  <template v-slot:body="props">
                    <draggable tag="tbody" :list="tableList"
                               :group="{ name: 'people'}"
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
              </v-card>
            </div>
          </div>
          <div class="col-2">
            <div class="list-employers">
              <v-card>
                <v-data-table
                  item-key="id"
                  :headers="headersEmployeeList"
                  hide-default-footer
                  :items="employeeList">
                  <template v-slot:body="props">
                    <draggable :list="employeeList"
                               :group="{ name: 'people', put: false }"
                               class="drag-employers"
                               @change="log"
                               :move="checkMoveEmployersList"
                               @end="dragEmployers"
                               selected-class="multi-drag"
                               multi-drag
                    >
                      <tr
                        v-for="(user, index) in props.items"
                        :key="index"
                      >
                        <td class="table-row-employers"> {{ `${user.name} ${user.surName}` }} </td>
                      </tr>
                    </draggable>
                  </template>
                </v-data-table>
              </v-card>
            </div>
          </div>
        </div>
      </div>
    </div>
    <draggable class="trashPlace" :list="trashList"
               :group="{ name: 'people'}"
               @change="log">
    </draggable>
  </div>
</template>
<script>
import draggable from 'vuedraggable';
import { mapGetters } from 'vuex';

export default {
  name: 'adminPanel',
  display: 'Two Lists',
  order: 1,
  components: {
    draggable,
  },
  computed: {
    ...mapGetters({
      getProfile: 'auth/getProfile',
    }),
  },
  data() {
    return {
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
      employeeList: [
        {
          name: 'Juan', surName: 'fdsfdsafsd', id: 5, email: '3213123@test.test', phone: '+380432432434',
        },
        {
          name: 'Edgard', surName: 'fdsfdsafsd', id: 6, email: 'wqe233@test.test', phone: '+38077777777',
        },
        {
          name: 'Johnson', surName: 'fdsfdsafsd', id: 7, email: 'erw343@test.test', phone: '+3805555555',
        },
      ],
      trashList: [],
      headersEmployeeList: [
        {
          text: 'EMPLOYEE LIST', value: 'name', align: 'center', sortable: false,
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
  watch: {
  },
  mounted() {
    this.$api.admin.getCompanyEmployee().then((res) => {
      console.log(res);
    });
  },
  methods: {
    checkMoveEmployersList(evt) {
      if (evt.from.className === 'drag-employers' && evt.to.className === 'trashPlace') {
        return false;
      }
      return true;
    },
    dragEmployers(event) {
      if (event.from.className === 'drag-employers'
      && event.to.className === 'admin-panel-content') {
        return false;
      }
      return true;
    },
    add() {
      this.list.push({ name: 'Juan' });
    },
    replace() {
      this.list = [{ name: 'Edgard' }];
    },
    clone(el) {
      return {
        name: `${el.name} cloned`,
      };
    },
    log(evt) {
      window.console.log('11111', evt);
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
  .trashPlace {
    position: relative;
    bottom: 0;
    width: 100%;
    height: 200px;
  }
  .list-employers .table-row-employers {
    width: 51.9%;
  }
  .dropitem + .footer {
    background: red;
    color: white;
  }
  .input-department {
    margin-bottom:100px ;
    width: 150px;
    display: inline-block;
  }
  .department {
    font-weight: bold;
    font-size: 20px;
    display: inline-block;
  }
  .manager-name {
    font-weight: bold;
    font-size: 20px;
    display: inline-block;
    margin-right: 40%;
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
    border: 2px solid red;
  }
  .body-panel-table {
    display: flex;
  }
</style>
