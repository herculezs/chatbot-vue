<template>
  <div class="table-employers-list">
    <v-card>
      <div>
        <span class="class-title-employee-list">Employee List</span>
      </div>
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
          <v-toolbar
            flat
          >
            <v-text-field
              v-model="search"
              label="Search"
              :append-outer-icon="'mdi-send'"
              clear-icon="mdi-close-circle"
              class="mx-4"
              @click:append-outer="searchEmployee"
              @keydown="searchEmployee"
              clearable
              @change="searchEmployee"
              @click:clear="clearSearchEmployee"
            ></v-text-field>
          </v-toolbar>
        </template>
        <template v-slot:body="props">
          <draggable :list="employeeList"
                     tag="tbody"
                     :group="{ name: 'employeeList', put: false }"
                     class="drag-employers"
                     selected-class="multi-drag"
                     multi-drag>
            <tr
              v-for="(user, index) in props.items"
              :key="index"
            >
              <td> {{ user.name }} </td>
              <td> {{ user.surName }} </td>
              <td> {{ user.employeeDepartment }} </td>
            </tr>
          </draggable>
        </template>
      </v-data-table>
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
    department: {
      type: Object,
      default: () => {},
    },
    update: {
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
      headers: [
        {
          text: 'NAME', value: 'name', align: 'center',
        },
        {
          text: 'SECOND NAME', value: 'surName', align: 'center',
        },
        {
          text: 'DEPARTMENT', value: 'employeeDepartment', align: 'center',
        },
        {
          text: 'MANAGER', value: 'employeeManager', align: 'center',
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
    color: #b4b4b4;
    font-weight: bold;
  }
</style>
