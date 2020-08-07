// import config from '@config';
import store from '@store';

const axios = require('axios').default;

const http = axios.create({
  baseURL: process.env.VUE_APP_URL,
});

/**
 * Add a request and response interceptor
 */
const beforeRequestSuccess = (configurate) => {
  // eslint-disable-next-line
  configurate.headers.Authorization = `Bearer ${store.getters['auth/getProfile'].token}`;

  // store.dispatch('global/setAppLoading', true);

  return configurate;
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
