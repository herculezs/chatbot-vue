import http from '@utils/http';
import notifyError from '@helpers';

export default {
  fetchPersonalityTypeReport() {
    return new Promise((resolve, reject) => {
      http.get(`user/personality-type-report/${process.env.QUESTIONNAIRE_ID}`).then(
        ({ data }) => {
          resolve(data);
        },
      ).catch((error) => {
        notifyError(error);
        reject(error);
      });
    });
  },
  fetchPersonalityTypeReportFreeVersion(uniqueId) {
    return new Promise((resolve, reject) => {
      http.get(`user/personality-type-report/free-version/${process.env.QUESTIONNAIRE_ID}?uniqueId=${uniqueId}`).then(
        ({ data }) => {
          resolve(data);
        },
      ).catch((error) => {
        notifyError(error);
        reject(error);
      });
    });
  },
  setPersonalityType(formData) {
    return new Promise((resolve, reject) => {
      http.post('/user/personality-type', formData).then(
        ({ data }) => {
          resolve(data);
        },
      ).catch((error) => {
        notifyError(error);
        reject(error);
      });
    });
  },
  countOtherCompleteTestForU1() {
    return new Promise((resolve, reject) => {
      http.get(`user/count-other-complete-test/${process.env.QUESTIONNAIRE_ID}`).then(
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
