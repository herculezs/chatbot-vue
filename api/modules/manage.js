import http from '@utils/http';
import notifyError from '@helpers';
import Vue from 'vue';

export default {
  getCompanyEmployee(page, search, departmentId, sortField, sortDesc) {
    let url;
    if (!sortField) {
      url = `manage/get-company-employee?page=${page}&departmentId=${departmentId}`;
    } else {
      url = `manage/get-company-employee?page=${page}&departmentId=${departmentId}&sort-field=${sortField}&sort-desc=${sortDesc}`;
    }

    return new Promise((resolve, reject) => {
      http.post(url, { surName: search })
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
    let url;
    if (departmentId) {
      url = `manage/save-department?department=${department}&departmentId=${departmentId}`;
    } else {
      url = `manage/save-department?department=${department}`;
    }
    return new Promise((resolve, reject) => {
      http.post(url)
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
  getDataAdminPanel(departmentId) {
    return new Promise((resolve, reject) => {
      http.post(`manage/get-data-admin-panel/${process.env.QUESTIONNAIRE_ID}?departmentId=${departmentId}`)
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
  saveAutoReminders(department, everyDays) {
    return new Promise((resolve, reject) => {
      http.post(`manage/save-auto-reminders/${process.env.QUESTIONNAIRE_ID}?departmentId=${department}&everyDays=${everyDays}`)
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
  retryAutoReminders(department, everyDays, completedEmployee) {
    return new Promise((resolve, reject) => {
      http.post(`manage/retry-auto-reminders/${process.env.QUESTIONNAIRE_ID}?departmentId=${department}&everyDays=${everyDays}`,
        { completedEmployee })
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
  resetAutoReminders(department) {
    return new Promise((resolve, reject) => {
      http.get(`manage/reset-auto-reminders?departmentId=${department}`)
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
  pauseAutoReminders(department) {
    return new Promise((resolve, reject) => {
      http.get(`manage/pause-auto-reminders?departmentId=${department}`)
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
  resumeAutoReminders(department) {
    return new Promise((resolve, reject) => {
      http.get(`manage/resume-auto-reminders?departmentId=${department}`)
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
  selectedDepartmentByDefault(department) {
    return new Promise((resolve, reject) => {
      http.get(`manage/select-default-department?departmentId=${department}`)
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
  checkUpdatedData(department) {
    return new Promise((resolve, reject) => {
      http.post(`manage/check-updated-data?departmentId=${department}`)
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
  deleteDepartment(departmentId) {
    return new Promise((resolve, reject) => {
      http.post(`manage/delete-department?departmentId=${departmentId}`)
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
  offTextHelp(showHelp) {
    let url;
    if (showHelp != null) {
      url = `manage/off-text-help?show-help=${showHelp}`;
    } else {
      url = 'manage/off-text-help';
    }
    return new Promise((resolve, reject) => {
      http.post(url)
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
};
