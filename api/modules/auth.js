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
  confirmDataForChangeDetails(formData) {
    return new Promise((resolve, reject) => {
      http.post('/user-auth/confirm-data-for-change-details', formData).then(
        ({ data }) => {
          Vue.notify({
            type: 'success',
            title: 'Success',
            text: 'User details is correct',
          });
          resolve(data);
        },
      ).catch((error) => {
        notifyError(error);
        reject(error);
      });
    });
  },
  confirmSecretAnswer(formData) {
    return new Promise((resolve, reject) => {
      http.post('/user-auth/confirm-secret-answer', formData).then(
        ({ data }) => {
          Vue.notify({
            type: 'success',
            title: 'Success',
            text: 'Secret answer is correct',
          });
          resolve(data);
        },
      ).catch((error) => {
        notifyError(error);
        reject(error);
      });
    });
  },
  updateUserDetails(formData) {
    return new Promise((resolve, reject) => {
      http.post('/user-auth/update-user-details', formData).then(
        ({ data }) => {
          Vue.notify({
            type: 'success',
            title: 'Success',
            text: 'New details saved successful',
          });
          resolve(data);
        },
      ).catch((error) => {
        notifyError(error);
        reject(error);
      });
    });
  },
  sendSmsToCheckPhoneNumber(formData) {
    return new Promise((resolve, reject) => {
      http.post('/user-auth/send-sms-before-update-phone-number', formData).then(
        ({ data }) => {
          Vue.notify({
            type: 'success',
            title: 'Success',
            text: 'Sent',
          });
          resolve(data);
        },
      ).catch((error) => {
        notifyError(error);
        reject(error);
      });
    });
  },
  saveSecretAnswer(formData, id) {
    return new Promise((resolve, reject) => {
      http.post(`/user-auth/${id}/save-secret-answer`, formData).then(
        ({ data }) => {
          Vue.notify({
            type: 'success',
            title: 'Success',
            text: 'Secret answer saved successful',
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
  sendCode(updatePhoneNumberDTO, userId) {
    return new Promise((resolve, reject) => {
      http.post(`user-auth/${userId}/send-code-for-update-phone-number`, updatePhoneNumberDTO).then(
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
  updateGeoLocationUsers(geoLocationDataDto, allowGetGeolocation, id) {
    return new Promise((resolve, reject) => {
      http.post(`user-auth/update-geo-location-user/${id}?allowGetGeolocation=${allowGetGeolocation}`, geoLocationDataDto).then(
        ({ data }) => {
          resolve(data);
        },
      ).catch((error) => {
        notifyError(error);
        reject(error);
      });
    });
  },
  checkBotGoogleCaptcha(token) {
    return new Promise((resolve, reject) => {
      http.post('user-auth/check-bot-google-captcha', { token }).then(
        ({ data }) => {
          resolve(data);
        },
      ).catch((error) => {
        notifyError(error);
        reject(error);
      });
    });
  },
  saveUserPhoto(userPhotoData, userId) {
    return new Promise((resolve, reject) => {
      http.post(`user-auth/save-user-photo/${userId}`, userPhotoData).then(
        ({ data }) => {
          resolve(data);
        },
      ).catch((error) => {
        notifyError(error);
        reject(error);
      });
    });
  },
  checkBankAccountValidate(userBankAccountData, userId) {
    return new Promise((resolve, reject) => {
      http.post(`user-auth/${userId}/check-bank-account-validate`, userBankAccountData).then(
        ({ data }) => {
          resolve(data);
        },
      ).catch((error) => {
        notifyError(error);
        reject(error);
      });
    });
  },
  uploadIdentificationCardUser(userPhotoData, userId, skipStep) {
    return new Promise((resolve, reject) => {
      http.post(`user-auth/${userId}/upload-identification-card-user?skipStep=${skipStep}`, userPhotoData).then(
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
