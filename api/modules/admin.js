import http from '@utils/http';
import notifyError from '@helpers';

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
  getDataTestDashboard(id, page, search) {
    return new Promise((resolve, reject) => {
      http.post(`admin/get-data-test-dashboard/${id}?page=${page}`, { search }).then(
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
  addQuestionnaireResult(questionId, userId, questionResult, numberOfTimes) {
    return new Promise((resolve, reject) => {
      http.post(`admin/add-questionnaire-result/${questionId}?userId=${userId}`, { questionResult, numberOfTimes }).then(
        ({ data }) => {
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
};
