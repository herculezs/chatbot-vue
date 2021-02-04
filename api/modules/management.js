import http from '@utils/http';
import notifyError from '@helpers';

export default {
  fetchUserCompletedSurveys() {
    return new Promise((resolve, reject) => {
      http.post(`management/completed-surveys/${process.env.QUESTIONNAIRE_ID}`).then(
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
