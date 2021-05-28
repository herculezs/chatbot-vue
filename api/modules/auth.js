import http from '@utils/http';
import Vue from 'vue';
import notifyError from '@helpers';

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
        notifyError(error);
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
        notifyError(error);
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
            text: 'Code validation successful',
          });
          resolve(data);
        },
      ).catch((error) => {
        notifyError(error);
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
            text: 'Reset password successful',
          });
          resolve(data);
        },
      ).catch((error) => {
        notifyError(error);
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
            text: 'New password successful',
          });
          resolve(data);
        },
      ).catch((error) => {
        notifyError(error);
        reject(error);
      });
    });
  },
  updatePhoneNumber(updatePhoneNumberDTO, id) {
    return new Promise((resolve, reject) => {
      http.post(`/user-auth/${id}/new-phone-number`, updatePhoneNumberDTO).then(
        ({ data }) => {
          Vue.notify({
            type: 'success',
            title: 'Success',
            text: 'Phone was successfully update',
          });
          resolve(data);
        },
      ).catch((error) => {
        notifyError(error);
        reject(error);
      });
    });
  },
  sendCode(updatePhoneNumberDTO) {
    return new Promise((resolve, reject) => {
      http.post('user-auth/send-code-for-update-phone-number', updatePhoneNumberDTO).then(
        ({ data }) => {
          Vue.notify({
            type: 'success',
            title: 'Success',
            text: 'The new code was successfully sent',
          });
          resolve(data);
        },
      ).catch((error) => {
        notifyError(error);
        reject(error);
      });
    });
  },
};
