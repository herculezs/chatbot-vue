import store from '@store';
import router from '@router';

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
};

const onError = (error) => {
  if (error.response.status === 401) {
    store.dispatch('auth/logout');
    router.push('/login');
  }

  return Promise.reject(error);
};

http.interceptors.request.use(beforeRequestSuccess);
http.interceptors.response.use(null, onError);

export default http;
