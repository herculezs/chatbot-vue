import http from '@utils/http';

export default {
  register(formData) {
    return new Promise((resolve, reject) => {
      http.post('user-auth/registers', formData).then(
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
          resolve(data);
        },
      ).catch((error) => {
        reject(error);
      });
    });
  },
  validateCode(formData) {
    return new Promise((resolve, reject) => {
      http.post('user-auth', formData).then(
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
  newPassword(formData) {
    return new Promise((resolve, reject) => {
      http.post(`/user-auth/${formData}/new-password`).then(
        ({ data }) => {
          resolve(data);
        },
      ).catch((error) => {
        reject(error);
      });
    });
  },
};
