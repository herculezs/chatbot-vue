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
            text: 'The validation code was successfully',
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
            text: 'The reset password was successfully',
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
            text: 'The new password was successfully',
          });
          resolve(data);
        },
      ).catch((error) => {
        notifyError(error);
        reject(error);
      });
    });
  },
  updatePhoneNumber(phoneNumber, id) {
    return new Promise((resolve, reject) => {
      http.post(`/user-auth/${id}/new-phone-number?phoneNumber=${phoneNumber.replace('+', '%2B')}`).then(
        ({ data }) => {
          Vue.notify({
            type: 'success',
            title: 'Success',
            text: 'New code resent',
          });
          resolve(data);
        },
      ).catch((error) => {
        notifyError(error);
        reject(error);
      });
    });
  },
  newCode(id) {
    return new Promise((resolve, reject) => {
      http.post(`user-auth/${id}/resend-code`).then(
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
