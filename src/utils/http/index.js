// import config from '@config';
import store from '@store';

const axios = require('axios').default;

const http = axios.create({
  baseURL: process.env.VUE_APP_URL,
});

/**
 * Add a request and response interceptor
 */
// eslint-disable-next-line consistent-return
const beforeRequestSuccess = (configurate) => {
  const { token } = store.getters['auth/getProfile'];

  if (token) {
    // eslint-disable-next-line
    configurate.headers.Authorization = `Bearer ${token}`;
  }

  return configurate;

  // store.dispatch('global/setAppLoading', true);
};

// const beforeRequestError = (error) => {
//   return Promise.reject(error);
// };

// const onSuccess = (response) => {
//   // store.dispatch('global/setAppLoading', false);
//   return response;
// };
//
// const onError = (error) => {
//   // store.dispatch('global/setAppLoading', false);
//   return Promise.reject(error);
// };

http.interceptors.request.use(beforeRequestSuccess);
// http.interceptors.response.use(onSuccess, onError);

export default http;
