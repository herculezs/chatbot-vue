<template>
  <div class="admin-panel">
      <draggable class="admin-panel-content" :list="trashList"
                 handle=".handle"
                 :options="trashOptions">
        <div class="col-11">
          <div class="manager-name">
            <v-toolbar>
              <span>Manager: {{`${getProfile.name} ${getProfile.lastName}`}} </span>
            </v-toolbar>
          </div>
          <div class="department">
            <div>
            <v-app class="input-department">
              <v-toolbar>
                Department:
                <v-autocomplete
                  :search-input.sync="department"
                  :items="items"
                  item-text="name"
                  item-value="id"
                  cache-items
                  flat
                  hide-no-data
                  hide-details
                  return-object
                  label="What you department?"
                  solo
                >
                  <template v-slot:item="{ item }">
                    <v-list-item-content>
                      <v-list-item-title v-text="item.name"></v-list-item-title>
                      <v-list-item-subtitle v-text="item.symbol"></v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn icon color="blue darken-1"
                             @click.prevent="openModalUpdateDepartment" text>
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </template>
                </v-autocomplete>
                <v-btn icon @click.prevent="newDepartmentEv">
                  <v-icon>mdi-plus-circle-outline</v-icon>
                </v-btn>
              </v-toolbar>
              <v-dialog v-model="showModalDepartmentUpdate" max-width="500px">
                <v-card>
                  <v-card-title class="headline">
                    Update Department:
                    <v-text-field
                      class="updatedDepartment"
                      @keypress="isNumber($event)"
                      v-model="department"
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
          <div class="body-panel-table">
            <div class="col-10">
              <div class="table-employers">
                <TablesEmployers :department="department"/>
              </div>
            </div>
            <div class="col-3 employee-list-main">
              <div class="list-employers">
                <EmployeeList/>
              </div>
            </div>
          </div>
        </div>
      </draggable>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import TablesEmployers from '@components/Manage/Tables/SelectedEmployers.vue';
import EmployeeList from '@components/Manage/Tables/EmployeeList.vue';
import draggable from 'vuedraggable';

export default {
  name: 'adminPanel',
  display: 'Two Lists',
  order: 1,
  components: {
    TablesEmployers,
    EmployeeList,
    draggable,
  },
  data() {
    return {
      items: [],
      department: null,
      departmentId: null,
      newDepartment: null,
      showModalDepartmentUpdate: false,
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
  },
  methods: {
    getDepartments() {
      this.$api.manage.getDepartments().then((res) => {
        res.forEach((x) => {
          console.log(x);
          this.items.push({ name: x.name, id: x.id });
        });
        console.log(this.items);
      });
    },
    departmentSave() {
      if (this.department != null) {
        this.$api.manage.saveDepartment(this.department, this.departmentId).then(() => {
          this.getDepartments();
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
      this.departmentId = null;
      this.departmentSave();
    },
    openModalUpdateDepartment() {
      this.showModalDepartmentUpdate = true;
      console.log(this.department);
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
</style>
