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
          resolve(data);
        },
      ).catch((error) => {
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
            title: 'Test',
            text: 'Hello user! This is a notification!',
          });
          resolve(data);
        },
      ).catch((err) => {
        Vue.notify({
          type: 'error',
          title: 'Important message',
          text: err.response.data.message,
        });
        reject(err);
      });
    });
  },
  validateCode(formData, id) {
    return new Promise((resolve, reject) => {
      http.post(`user-auth/${id}/validate-code`, formData).then(
        ({ data }) => {
          resolve(data);
        },
      ).catch((error) => {
        reject(error);
      });
    });
  },
  resetPassword(formData) {
    return new Promise((resolve, reject) => {
      http.post('user-auth/reset-password', formData).then(
        ({ data }) => {
          resolve(data);
        },
      ).catch((error) => {
        reject(error);
      });
    });
  },
  newPassword(formData, id) {
    return new Promise((resolve, reject) => {
      http.post(`/user-auth/${id}/new-password`, formData).then(
        ({ data }) => {
          resolve(data);
        },
      ).catch((error) => {
        reject(error);
      });
    });
  },
};
