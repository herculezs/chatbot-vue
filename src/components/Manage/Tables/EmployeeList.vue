<template>
  <div class="table-employers-list">
    <v-card>
      <v-data-table
        item-key="id"
        :headers="headersEmployeeList"
        hide-default-footer
        :items-per-page="20"
        :page.sync="page"
        :loading="loadingTable"
        :items="employeeList">
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-text-field
              v-model="search"
              label="Search by Surname"
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
                     :group="{ name: 'employeeList', put: false }"
                     class="drag-employers"
                     @change="log"
                     selected-class="multi-drag"
                     multi-drag>
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
  data() {
    return {
      totalPages: 0,
      loadingTable: true,
      search: '',
      page: 1,
      employeeList: [],
      headersEmployeeList: [
        {
          text: 'EMPLOYEE LIST', value: 'name', align: 'center', sortable: false,
        },
      ],
    };
  },
  methods: {
    searchEmployee(e) {
      if (e.keyCode === 13 || e.button === 0) {
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
    log(evt) {
      window.console.log('11111', evt);
    },
    pageCounts(currentPage) {
      this.loadingTable = true;
      this.page = currentPage;
      this.getEmployee();
    },
    getEmployee() {
      this.$api.manage.getCompanyEmployee(this.page - 1, this.search)
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
            });
          });
        });
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
</style>
