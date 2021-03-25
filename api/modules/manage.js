import http from '@utils/http';
import notifyError from '@helpers';


export default {
  getCompanyEmployee(page, search) {
    return new Promise((resolve, reject) => {
      http.post(`manage/get-company-employee?page=${page}`, { surName: search })
        .then(
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
