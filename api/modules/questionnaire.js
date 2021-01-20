import http from '@utils/http';
import notifyError from '@helpers';

export default {
  fetchQuestionnaire() {
    return new Promise((resolve, reject) => {
      http.get('questionnaire/PERSONALITY_BIG5').then(
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
      http.get(`questionnaire/invitation/PERSONALITY_BIG5/u2/${id}`).then(
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
      http.post('questionnaire/PERSONALITY_BIG5', formData).then(
        ({ data }) => {
          resolve(data);
        },
      ).catch((error) => {
        notifyError(error);
        reject(error);
      });
    });
  },
  saveInvitationAnswer(formData, id) {
    return new Promise((resolve, reject) => {
      http.post(`/questionnaire/invitation/PERSONALITY_BIG5/u2/${id}`, formData).then(
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
