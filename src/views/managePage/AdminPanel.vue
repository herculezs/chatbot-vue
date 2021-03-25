<template>
  <div class="admin-panel">
      <draggable class="admin-panel-content" :list="trashList"
                 handle=".handle"
                 :options="trashOptions"
                 @move="log"
                 @change="log">
        <div class="col-11">
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
                <TablesEmployers/>
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
  computed: {
    ...mapGetters({
      getProfile: 'auth/getProfile',
    }),
  },
  data() {
    return {
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
  methods: {
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
    background-color: #cccccc;
  }
  .body-panel-table {
    display: flex;
  }
  .admin-panel-content > .sortable-ghost {
    display: none;
  }
</style>
