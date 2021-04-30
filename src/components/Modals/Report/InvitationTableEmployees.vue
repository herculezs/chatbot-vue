<template>
  <div class="invitationTable">
    <b-modal
      modal-class="modal-sticky-bottom ask-contacts"
      class="ask-contacts"
      id="modal-multi-1"
      hide-footer
    >
      <v-data-table
        class="table-invite"
        item-key="id"
        :headers="headers"
        :items="employeeList"
        :page.sync="page"
        hide-default-footer
        @page-count="returnTotalPages()"
        @click:row="handleClick"
      >
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
      totalPages: 100,
      page: 1,
      employeeList: [
        {
          name: '1111111111', surName: 'ALst', email: 'fsfes@gmteast', phone: '+380954168132', department: 'IW', manager: 'TEMP', link: 'https://google.com',
        },
        {
          name: '1111111111', surName: 'ALst', email: 'fsfes@gmteast', phone: '+380954168132', department: 'IW', manager: 'TEMP', link: 'https://google.com',
        },
        {
          name: '1111111111', surName: 'ALst', email: 'fsfes@gmteast', phone: '+380954168132', department: 'IW', manager: 'TEMP', link: 'https://google.com',
        },
        {
          name: '1111111111', surName: 'ALst', email: 'fsfes@gmteast', phone: '+380954168132', department: 'IW', manager: 'TEMP', link: 'https://google.com',
        },
        {
          name: '1111111111', surName: 'ALst', email: 'fsfes@gmteast', phone: '+380954168132', department: 'IW', manager: 'TEMP', link: 'https://google.com',
        },
        {
          name: '1111111111', surName: 'ALst', email: 'fsfes@gmteast', phone: '+380954168132', department: 'IW', manager: 'TEMP', link: 'https://google.com',
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
      // this.$api.questionnaire.getListInvitation().then((res) => {
      //   // res.content.forEach((x) => {
      //   //   this.employeeList.push({
      //   //     name: x.name,
      //   //     surName: x.surName,
      //   //     phone: x.phone,
      //   //     manager: x.manager,
      //   //     email: x.corporateEmail,
      //   //     corporateEmail: x.corporateEmail,
      //   //     department: x.department,
      //   //   });
      //   // });
      // });
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
</style>
