<template>
  <div class="admin-dashboard">
    <Content>
      <h1 class="h4 text-center mb-3">Dashboard</h1>
      <table class="dashboard-table">
        <tr>
          <th>Employee</th>
          <th>Department</th>
          <th>Manager</th>
          <th>Colleagues result</th>
          <th>Consistency score overall</th>
          <th>Number connections</th>
          <th>Type</th>
          <th>Department Summary</th>
          <th>Preferred Reviewer Ranking</th>
        </tr>
      </table>
      <button
      @click="getInfoDashboard"
      >123</button>
    </Content>
  </div>
</template>

<script>
export default {
  name: 'adminDashboard',
  methods: {
    getInfoDashboard() {
      this.$api.admin.getInfoDashboard();
    },
  },
};
</script>

<style lang="scss">
  th {
    padding: 20px 30px;
    width: 10px;
    text-align: center;
  }
  .dashboard-table {
    margin-left: auto;
    margin-right: auto;
  }


  .dashboard-table tr:nth-child(even) {
    background-color: $tableColor1;
  }

  .dashboard-table tr:nth-child(odd) {
    background-color: $tableColor2;
  }
</style>
