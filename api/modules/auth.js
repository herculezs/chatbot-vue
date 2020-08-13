import http from '@utils/http';
import Vue from 'vue';

export default {
  register(formData) {
    return new Promise((resolve, reject) => {
      http.post('user-auth/register', formData).then(
        ({ data }) => {
          Vue.notify({
            type: 'success',
            title: 'Success',
            text: `Hello ${data.name}`,
          });
          resolve(data);
        },
      ).catch((error) => {
        Vue.notify({
          type: 'error',
          title: error.response.data.error,
          text: error.response.data.message,
        });
        reject(error);
      });
    });
  },
  login(formData) {
    return new Promise((resolve, reject) => {
      http.post('user-auth/login', formData).then(
        ({ data }) => {
          Vue.notify({
            type: 'success',
            title: 'Success',
            text: `Hello ${data.name}`,
          });
          resolve(data);
        },
      ).catch((error) => {
        Vue.notify({
          type: 'error',
          title: error.response.data.error,
          text: error.response.data.message,
        });
        reject(error);
      });
    });
  },
  validateCode(formData, id) {
    return new Promise((resolve, reject) => {
      http.post(`user-auth/${id}/validate-code`, formData).then(
        ({ data }) => {
          Vue.notify({
            type: 'success',
            title: 'Success',
            text: 'The validation code was successfully',
          });
          resolve(data);
        },
      ).catch((error) => {
        Vue.notify({
          type: 'error',
          title: error.response.data.error,
          text: error.response.data.message,
        });
        reject(error);
      });
    });
  },
  resetPassword(formData) {
    return new Promise((resolve, reject) => {
      http.post('user-auth/reset-password', formData).then(
        ({ data }) => {
          Vue.notify({
            type: 'success',
            title: 'Success',
            text: 'The reset password was successfully',
          });
          resolve(data);
        },
      ).catch((error) => {
        Vue.notify({
          type: 'error',
          title: error.response.data.error,
          text: error.response.data.message,
        });
        reject(error);
      });
    });
  },
  newPassword(formData, id) {
    return new Promise((resolve, reject) => {
      http.post(`/user-auth/${id}/new-password`, formData).then(
        ({ data }) => {
          Vue.notify({
            type: 'success',
            title: 'Success',
            text: 'The new password was successfully',
          });
          resolve(data);
        },
      ).catch((error) => {
        Vue.notify({
          type: 'error',
          title: error.response.data.error,
          text: error.response.data.message,
        });
        reject(error);
      });
    });
  },
};
