import http from '@utils/http';

export default {
  test() {
    return new Promise((resolve, reject) => {
      http.get('/api/test').then(
        ({ data }) => {
          resolve(data);
        },
      ).catch((error) => {
        reject(error);
      });
    });
  },
};
