import notifyError from '@helpers';

const axios = require('axios').default;

export default {
  getCurrentGeolocation() {
    return new Promise((resolve, reject) => {
      axios.get('https://ip-api.io/json?api_key=251556b5-95d8-4887-8304-5f6d23c7c17a').then(
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
