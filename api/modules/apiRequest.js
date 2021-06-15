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
  getCurrentGeolocationBigData(latlng) {
    const latlngWithoutDelimetr = latlng.split(',');
    return new Promise((resolve, reject) => {
      axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-with-timezone?latitude=${latlngWithoutDelimetr[0]}&longitude=${latlngWithoutDelimetr[1]}&localityLanguage=en&key=23408d93b01e49dead10f19862b97391`).then(
        ({ data }) => {
          resolve(data);
        },
      ).catch((error) => {
        notifyError(error);
        reject(error);
      });
    });
  },
  getAvatarApi(email) {
    return new Promise((resolve, reject) => {
      axios.get(`https://www.avatarapi.com/js.aspx?email=${email}&size=128`).then(
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
