import http from '@utils/http';
import notifyError from '@helpers';

export default {
  getInfoDashboard(id, page) {
    return new Promise((resolve, reject) => {
      http.post(`admin/get-info-dashboard/${id}?page=${page}`).then(
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
