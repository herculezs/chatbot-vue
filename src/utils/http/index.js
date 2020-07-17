import nprogress from '@utils//nprogress';
import config from '@config';
import store from '@store';

const axios = require('axios').default;

const http = axios.create({
  baseURL: process.env.VUE_APP_URL,
  headers: config.http.defaultRequest.headers,
});
/**
 * Add a request and response interceptor
 */
const beforeRequestSuccess = (configurate) => {
  // eslint-disable-next-line
  configurate.headers.Authorization = `Bearer ${store.getters['auth/getToken']}`;
  nprogress.start();

  // store.dispatch('global/setAppLoading', true);

  return configurate;
};

const beforeRequestError = (error) => {
  nprogress.start();
  return Promise.reject(error);
};

const onSuccess = (response) => {
  // store.dispatch('global/setAppLoading', false);
  nprogress.done();

  return response;
};

const onError = (error) => {
  nprogress.done();

  // store.dispatch('global/setAppLoading', false);

  return Promise.reject(error);
};

http.interceptors.request.use(beforeRequestSuccess, beforeRequestError);
http.interceptors.response.use(onSuccess, onError);

export default http;
