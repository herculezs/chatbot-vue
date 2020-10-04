import http from '@utils/http';
import notifyError from '@helpers';

export default {
  setFeedBack(formData) {
    return new Promise((resolve, reject) => {
      http.post('feedback', formData).then(
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
