import http from '@utils/http';
import notifyError from '@helpers';
import Vue from 'vue';

export default {
  getInfoDashboard(id, page, sortField, sortDesc) {
    let url;
    if (!sortField) {
      url = `admin/get-info-dashboard/${id}?page=${page}`;
    } else {
      url = `admin/get-info-dashboard/${id}?page=${page}&sort-field=${sortField}&sort-desc=${sortDesc}`;
    }

    return new Promise((resolve, reject) => {
      http.post(url).then(
        ({ data }) => {
          resolve(data);
        },
      ).catch((error) => {
        notifyError(error);
        reject(error);
      });
    });
  },
  getDataTestDashboard(id, page, search, searchField) {
    return new Promise((resolve, reject) => {
      http.post(`admin/get-data-test-dashboard/${id}?page=${page}`, { search, searchField }).then(
        ({ data }) => {
          resolve(data);
        },
      ).catch((error) => {
        notifyError(error);
        reject(error);
      });
    });
  },
  deleteUserById(questionId, userId) {
    return new Promise((resolve, reject) => {
      http.post(`admin/delete-user/${questionId}?userId=${userId}`).then(
        ({ data }) => {
          resolve(data);
        },
      ).catch((error) => {
        notifyError(error);
        reject(error);
      });
    });
  },
  updateUserById(questionId, formData) {
    return new Promise((resolve, reject) => {
      http.put(`admin/update-user/${questionId}`, formData).then(
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
  createUser(questionId, userDto) {
    return new Promise((resolve, reject) => {
      http.post(`admin/create-user/${questionId}`, userDto).then(
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
  addQuestionnaireResult(questionId, userId, questionResult, numberOfTimes) {
    return new Promise((resolve, reject) => {
      http.post(`admin/add-questionnaire-result/${questionId}?userId=${userId}`, { questionResult, numberOfTimes }).then(
        ({ data }) => {
          Vue.notify({
            type: 'success',
            title: 'Success',
            text: 'Success',
          });
          resolve(data);
        },
      ).catch((error) => {
        notifyError(error);
        reject(error);
      });
    });
  },
  countUsers() {
    return new Promise((resolve, reject) => {
      http.get('admin/count-users').then(
        ({ data }) => {
          resolve(data);
        },
      ).catch((error) => {
        notifyError(error);
        reject(error);
      });
    });
  },
  uploadCSVEmployee(file) {
    return new Promise((resolve, reject) => {
      http.post('admin/upload-csv-employees', file).then(
        ({ data }) => {
          resolve(data);
        },
      ).catch((error) => {
        notifyError(error);
        reject(error);
      });
    });
  },
  checkValidEmployeeCSV(file) {
    return new Promise((resolve, reject) => {
      http.post('admin/check-valid-employee-csv', file).then(
        ({ data }) => {
          resolve(data);
        },
      ).catch((error) => {
        reject(error);
      });
    });
  },
  getInfoByGroup(userId, groupId) {
    let url;
    if (!groupId) {
      url = `admin/get-info-by-group/${process.env.QUESTIONNAIRE_ID}?userId=${userId}`;
    } else {
      url = `admin/get-info-by-group/${process.env.QUESTIONNAIRE_ID}?userId=${userId}&groupId=${groupId}`;
    }

    return new Promise((resolve, reject) => {
      http.post(url).then(
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
