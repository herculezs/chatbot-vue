import http from '@utils/http';
import notifyError from '@helpers';

export default {
  fetchPersonalityTypeReport() {
    return new Promise((resolve, reject) => {
      http.get('user/personality-type-report').then(
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
