import notifyError from '@helpers';

const axios = require('axios').default;

export default {
  getCurrentGeolocation(latlng) {
    return new Promise((resolve, reject) => {
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=AIzaSyChuPbSkBYeR-bosJgEuGzRwNoJ6Aoxh8o`).then(
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
