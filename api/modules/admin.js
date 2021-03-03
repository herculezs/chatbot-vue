import http from '@utils/http';
import notifyError from '@helpers';

export default {
  getInfoDashboard() {
    return new Promise((resolve, reject) => {
      http.post('admin/get-info-dashboard').then(
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
