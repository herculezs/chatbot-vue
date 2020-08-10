import http from '@utils/http';
import Vue from 'vue';

export default {
  register(formData) {
    return new Promise((resolve, reject) => {
      // const test = {
      //   _id: '5f2ac71cc013f74540cb96dd',
      //   created: 1596639004698,
      //   updated: 1596639004698,
      //   phone: '+380673779236',
      //   name: 'oles',
      //   phoneVerified: false,
      //   passwordCreated: false,
      //   enabled: true,
      //   accountNonExpired: true,
      //   authorities: null,
      //   username: 'oles',
      //   accountNonLocked: true,
      //   credentialsNonExpired: true,
      // };
      //
      // return resolve(test);

      http.post('user-auth/register', formData).then(
        ({ data }) => {
          Vue.notify({
            type: 'success',
            title: 'Success',
            text: 'The registration was successfully',
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
            text: 'Hello user',
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
