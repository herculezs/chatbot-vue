import http from '@utils/http';

export default {
  fetchQuestionnaire() {
    return new Promise((resolve, reject) => {
      http.get('questionnaire').then(
        ({ data }) => {
          resolve(data);
        },
      ).catch((error) => {
        reject(error);
      });
    });
  },
};
