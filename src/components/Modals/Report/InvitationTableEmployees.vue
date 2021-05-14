<template>
  <div class="invitationTable">
    <b-modal
      modal-class="modal-sticky-bottom ask-contacts"
      class="ask-contacts"
      id="modal-multi-1"
      hide-footer
    >
      <div slot="modal-title">
        <span class="title-modal-invitation-table">Select colleague to survey ...</span>
      </div>
      <v-data-table
        class="table-invite"
        item-key="id"
        :headers="headers"
        :items="employeeList"
        :page.sync="page"
        :items-per-page="20"
        hide-default-footer
        @page-count="returnTotalPages()"
        @click:row="handleClick"
      >
        <template v-slot:body="props">
          <tbody>
          <tr
            v-for="(user, index) in props.items"
            :key="index"
            :id="'colleague_survey_' + (index + 1)"
            @click="handleClick(user)"
          >
            <td>{{user.name}}</td>
            <td>{{user.surName}}</td>
            <td>{{user.department}}</td>
            <td>{{user.manager}}</td>
            <td>{{user.phone}}</td>
            <td>{{user.email}}</td>
          </tr>
          </tbody>
        </template>
      </v-data-table>
      <v-pagination
        class="pagination-invite"
        v-model="page"
        :disabled="loadingTable"
        :length="totalPages"
        :total-visible="10"
        @input="pageCounts"
      ></v-pagination>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'InvitationTableEmployees',
  props: {
  },
  data() {
    return {
      loadingTable: false,
      totalPages: 0,
      page: 1,
      employeeList: [],
      headers: [
        {
          text: 'NAME', value: 'name', align: 'center', sortable: false,
        },
        {
          text: 'SECOND NAME', value: 'surName', align: 'center', sortable: false,
        },
        {
          text: 'DEPARTMENT', value: 'department', align: 'center', sortable: false,
        },
        {
          text: 'MANAGER', value: 'manager', align: 'center', sortable: false,
        },
        {
          text: 'PHONE NUMBER', value: 'phone', align: 'center', sortable: false,
        },
        {
          text: 'EMAIL', value: 'email', align: 'center', sortable: false,
        },
      ],
    };
  },
  mounted() {
    this.getListInvitation();
  },
  methods: {
    returnTotalPages() {
      return this.totalPages;
    },
    pageCounts(currentPage) {
      this.loadingTable = true;
      this.page = currentPage;
      this.employeeList = [];
    },
    handleClick(row) {
      window.location.href = row.link;
    },
    getListInvitation() {
      this.$api.questionnaire.getListInvitation().then((res) => {
        this.employeeList = [];
        this.page = res.number + 1;
        this.totalPages = res.totalPages;
        res.content.forEach((x) => {
          this.employeeList.push({
            name: x.name,
            surName: x.surName,
            phone: x.phone,
            manager: x.manager,
            email: x.corporateEmail,
            corporateEmail: x.corporateEmail,
            department: x.department,
            link: `${window.location.protocol}//${window.location.host}${x.link}`,
          });
          this.$emit('show-button');
        });
      });
    },
  },
};
</script>

<style lang="scss">
  .table-invite td {
    text-align: center;
    vertical-align: middle;
  }

  .pagination-invite .theme--light.v-pagination .v-pagination__item--active{
    background-color: $btnColor1;
  }

  .title-modal-invitation-table {
    font-size: 21px;
    display: inline-block;
    padding-bottom: 10px;
    font-family: Montserrat,serif;
  }
</style>
