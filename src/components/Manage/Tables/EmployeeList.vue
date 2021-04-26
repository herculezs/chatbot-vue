<template>
  <div class="table-employers-list">
    <v-card>
      <div>
        <span class="class-title-employee-list">Employee List</span>
      </div>
      <ejs-tooltip mouseTrail='true'
                   :cssClass="showHelp ? '' : 'custom'"
                   :content="showHelp ? 'Click on title to sort ascending or descending' : null"
                   target=".v-data-table-header"
                   :showTipPointer=false>
        <ejs-tooltip
                     :cssClass="showHelp ? '' : 'custom'"
                     :content="showHelp ? 'Click on individual users to select or\n' +
                      ' shift+click for block selection' : null"
                     :offsetX="-10"
                     :offsetY="-25"
                     target="#data-in-table"
                     :showTipPointer=false
                     >
          <v-data-table
            item-key="id"
            :headers="headers"
            hide-default-footer
            :items-per-page="20"
            :page.sync="page"
            :loading="loadingTable"
            :custom-sort="customSort"
            :items="employeeList">
            <template v-slot:top>
              <ejs-tooltip mouseTrail='true'
                           :cssClass="showHelp ? '' : 'custom'"
                           :content="showHelp ? 'Search by any of these fields' : null"
                           target="#tooltipSearch"
                           :showTipPointer=false>
                <v-toolbar
                  flat
                >
                  <v-text-field
                    id="tooltipSearch"
                    ref="searchInput"
                    v-model="search"
                    label="Search"
                    :append-icon="'mdi-send'"
                    class="mx-4"
                    @click:append="searchEmployee"
                    @keydown="searchEmployee"
                    @change="searchEmployee"
                  >
                    <template v-slot:append-outer>
                      <v-btn :class="{test: hiddenClear}" icon @click="clearSearchEmployee">
                        <v-icon>mdi-close-circle</v-icon>
                      </v-btn>
                    </template>
                  </v-text-field>
                </v-toolbar>
              </ejs-tooltip>
            </template>
            <template v-slot:body="props">
              <draggable :list="employeeList"
                         tag="tbody"
                         :group="{ name: 'employeeList', put: false }"
                         class="drag-employers"
                         selected-class="multi-drag"
                         multi-drag>
                <tr
                  id="data-in-table"
                  v-for="(user, index) in props.items"
                  :key="index">
                  <td> {{ user.name }} </td>
                  <td> {{ user.surName }} </td>
                  <td> {{ user.employeeDepartment }} </td>
                  <td> {{ user.manager }} </td>
                </tr>
              </draggable>
            </template>
          </v-data-table>
        </ejs-tooltip>
      </ejs-tooltip>
    </v-card>
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="totalPages"
        :total-visible="7"
        @input="pageCounts"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  name: 'EmployeeList',
  components: {
    draggable,
  },
  mounted() {
    this.getEmployee();
  },
  props: {
    showHelp: {
      type: Boolean,
      default: true,
    },
    department: {
      type: Object,
      default: () => {},
    },
    update: {
      type: Number,
    },
    removeGroup: {
      type: Number,
    },
  },
  watch: {
    department() {
      this.getEmployee();
    },
    update() {
      this.getEmployee();
    },
    search() {
      this.hiddenClear = this.search.length === 0;
    },
    removeGroup() {
      if (this.removeGroup > 1) {
        this.employeeList = [];
      }
    },
  },
  data() {
    return {
      totalPages: 0,
      loadingTable: true,
      search: '',
      page: 1,
      employeeList: [],
      sortField: '',
      sortDesc: false,
      hiddenClear: true,
      headers: [
        {
          text: 'NAME', value: 'name', align: 'center', width: '80px',
        },
        {
          text: 'SECOND NAME', value: 'surName', align: 'center', width: '135px',
        },
        {
          text: 'DEPARTMENT', value: 'employeeDepartment', align: 'center', width: '130px',
        },
        {
          text: 'MANAGER', value: 'employeeManager', align: 'center', width: '111px',
        },
      ],
    };
  },
  methods: {
    searchEmployee(e) {
      if (e && (e.keyCode === 13 || e.button === 0)) {
        this.page = 1;
        this.loadingTable = true;
        this.getEmployee();
      }
    },
    clearSearchEmployee() {
      this.search = '';
      this.hiddenClear = true;
      this.loadingTable = true;
      this.getEmployee();
    },
    pageCounts(currentPage) {
      this.loadingTable = true;
      this.page = currentPage;
      this.getEmployee();
    },
    customSort(items, index, isDesc) {
      if (index.length !== 0 && isDesc.length !== 0 && (this.sortField !== index[0]
        || this.sortDesc !== isDesc[0])) {
        // eslint-disable-next-line prefer-destructuring
        this.sortField = index[0];
        // eslint-disable-next-line prefer-destructuring
        this.sortDesc = isDesc[0];
        this.getEmployee();
      }
      return items;
    },
    getEmployee() {
      if (this.department) {
        this.$api.manage.getCompanyEmployee(this.page - 1, this.search,
          this.department.id, this.sortField, this.sortDesc)
          .then((res) => {
            this.employeeList = [];
            this.page = res.number + 1;
            this.totalPages = res.totalPages;
            res.content.forEach((x) => {
              this.employeeList.push({
                id: x.id,
                name: x.name,
                surName: x.surName,
                phone: x.phone,
                email: x.corporateEmail,
                employeeDepartment: x.department,
                manager: x.manager,
              });
            });
          });
      }
    },
  },
};
</script>

<style lang="scss">
  .list-employers .table-row-employers {
    width: 395px;
    height: 20px;
  }
  .v-pagination__item--active {
    background-color: #1976d2 !important;
    border-color: #1976d2 !important;
  }

  .table-employers-list .v-input__control .v-input__slot{
    margin-bottom: -10px;
  }
  .table-employers-list .class-title-employee-list {
    font-size: 20px;
    text-align: center;
    display: block;
    color: #535353;
    font-weight: bold;
  }

  .table-employers-list .v-input__append-outer {
    padding-left: 15px;
  }

  .table-employers-list .v-input__append-outer {
    padding-left: 15px;
  }

  .table-employers-list .v-btn {
    width: auto !important;
    height: auto !important;
  }

  .tooltip .tooltip-inner {
    background: $bgCardColor4;
    color: white;
    margin-top: -75px;
    border-radius: 16px;
    padding: 5px 10px 4px;
    max-width: 250px;
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

</style>
