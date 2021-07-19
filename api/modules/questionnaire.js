import http from '@utils/http';
import notifyError from '@helpers';

export default {
  fetchQuestionnaire() {
    return new Promise((resolve, reject) => {
      http.get(`questionnaire/${process.env.QUESTIONNAIRE_ID}`).then(
        ({ data }) => {
          resolve(data);
        },
      ).catch((error) => {
        notifyError(error);
        reject(error);
      });
    });
  },
  fetchInvitationQuestionnaire(id) {
    return new Promise((resolve, reject) => {
      http.get(`questionnaire/invitation/${process.env.QUESTIONNAIRE_ID}/u2/${id}`).then(
        ({ data }) => {
          resolve(data);
        },
      ).catch((error) => {
        notifyError(error);
        reject(error);
      });
    });
  },
  saveAnswer(formData) {
    return new Promise((resolve, reject) => {
      http.post(`questionnaire/${process.env.QUESTIONNAIRE_ID}`, formData).then(
        ({ data }) => {
          resolve(data);
        },
      ).catch((error) => {
        notifyError(error);
        reject(error);
      });
    });
  },
  saveAnswerFreeVersion(formData, uniqueId) {
    return new Promise((resolve, reject) => {
      http.post(`questionnaire/free-version/${process.env.QUESTIONNAIRE_ID}`, { answers: formData, uniqueId }).then(
        ({ data }) => {
          resolve(data);
        },
      ).catch((error) => {
        notifyError(error);
        reject(error);
      });
    });
  },
  saveInvitationAnswer(formData, id, uniqueId, requestParam) {
    return new Promise((resolve, reject) => {
      http.post(`/questionnaire/invitation/${process.env.QUESTIONNAIRE_ID}/u2/${id}${requestParam}`, { answers: formData, uniqueId }).then(
        (res) => {
          resolve(res.data);
        },
      ).catch((error) => {
        notifyError(error);
        reject(error);
      });
    });
  },
  getInvitationAnswer(id) {
    return new Promise((resolve, reject) => {
      http.post(`/questionnaire/get-invitation/${process.env.QUESTIONNAIRE_ID}/u2/${id}`).then(
        (res) => {
          resolve(res.data);
        },
      ).catch((error) => {
        notifyError(error);
        reject(error);
      });
    });
  },
  getListInvitation() {
    return new Promise((resolve, reject) => {
      http.post(`/questionnaire/get-list-invitation/${process.env.QUESTIONNAIRE_ID}`).then(
        (res) => {
          resolve(res.data);
        },
      ).catch((error) => {
        notifyError(error);
        reject(error);
      });
    });
  },
};
