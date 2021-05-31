import notifyError from '@helpers';

const axios = require('axios').default;

export default {
  getCurrentGeolocation() {
    return new Promise((resolve, reject) => {
      axios.get('https://geolocation-db.com/json/e4f42070-ad2d-11eb-adf1-cf51da9b3410').then(
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
