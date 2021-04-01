import http from '@utils/http';
import notifyError from '@helpers';
import Vue from 'vue';

export default {
  getCompanyEmployee(page, search, department) {
    return new Promise((resolve, reject) => {
      http.post(`manage/get-company-employee?page=${page}&department=${department}`, { surName: search })
        .then(
          ({ data }) => {
            resolve(data);
          },
        ).catch((error) => {
          notifyError(error);
          reject(error);
        });
    });
  },
  saveDepartment(department, departmentId) {
    return new Promise((resolve, reject) => {
      http.post(`manage/save-department?department=${department}&departmentId=${departmentId}`)
        .then(
          ({ data }) => {
            resolve(data);
          },
        ).catch((error) => {
          notifyError(error);
          reject(error);
        });
    });
  },
  saveEmployeeToManager(department, idsEmployee) {
    return new Promise((resolve, reject) => {
      http.post('manage/save-employee-to-manager', { department, idsEmployee })
        .then(
          ({ data }) => {
            resolve(data);
          },
        ).catch((error) => {
          notifyError(error);
          reject(error);
        });
    });
  },
  getDataAdminPanel(department) {
    return new Promise((resolve, reject) => {
      http.post(`manage/get-data-admin-panel?department=${department}`)
        .then(
          ({ data }) => {
            resolve(data);
          },
        ).catch((error) => {
          notifyError(error);
          reject(error);
        });
    });
  },
  getDepartments() {
    return new Promise((resolve, reject) => {
      http.post('manage/get-all-departments')
        .then(
          ({ data }) => {
            resolve(data);
          },
        ).catch((error) => {
          notifyError(error);
          reject(error);
        });
    });
  },
  clearAllAdminPanel(department) {
    return new Promise((resolve, reject) => {
      http.post(`manage/clear-all-admin-panel?department=${department}`)
        .then(
          ({ data }) => {
            resolve(data);
            Vue.notify({
              type: 'success',
              title: 'Success',
              text: 'Success',
            });
          },
        ).catch((error) => {
          notifyError(error);
          reject(error);
        });
    });
  },
  removeOneEmployee(department, employeeId) {
    return new Promise((resolve, reject) => {
      http.post(`manage/remove-one-employee?department=${department}&employeeId=${employeeId}`)
        .then(
          ({ data }) => {
            resolve(data);
          },
        ).catch((error) => {
          notifyError(error);
          reject(error);
        });
    });
  },
  sendReminders(department) {
    return new Promise((resolve, reject) => {
      http.post(`manage/send-reminders?departmentId=${department}`)
        .then(
          ({ data }) => {
            resolve(data);
          },
        ).catch((error) => {
          notifyError(error);
          reject(error);
        });
    });
  },
  saveAutoReminders(department, everyDays) {
    return new Promise((resolve, reject) => {
      http.post(`manage/save-auto-reminders?departmentId=${department}&everyDays=${everyDays}`)
        .then(
          ({ data }) => {
            resolve(data);
          },
        ).catch((error) => {
          notifyError(error);
          reject(error);
        });
    });
  },
  // updateInvitationSent(department, email, phone, employeeId) {
  //   return new Promise((resolve, reject) => {
  //     http.post(`manage/update-invitation-sent?email=${email}
  //     &phone=${phone}&departmentId=${department}&employeeId=${employeeId}`)
  //       .then(
  //         ({ data }) => {
  //           resolve(data);
  //         },
  //       ).catch((error) => {
  //         notifyError(error);
  //         reject(error);
  //       });
  //   });
  // },
};
