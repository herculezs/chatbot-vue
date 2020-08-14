import http from '@utils/http';
import notifyError from '@helpers';

export default {
  fetchQuestionnaire() {
    return new Promise((resolve, reject) => {
      http.get('questionnaire/PERSONALITY_TEST').then(
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
      http.post('questionnaire/PERSONALITY_TEST', formData).then(
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
