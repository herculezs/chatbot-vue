import http from '@utils/http';

export default {
  register(formData) {
    console.log('formData', formData);

    return new Promise((resolve, reject) => {
      http.post('user-auth/register', formData).then(
        ({ data }) => {
          console.log(data);

          const test = {
            _id: '5f2ac71cc013f74540cb96dd',
            created: 1596639004698,
            updated: 1596639004698,
            phone: '+380673779236',
            name: 'oles',
            phoneVerified: false,
            passwordCreated: false,
            enabled: true,
            accountNonExpired: true,
            authorities: null,
            username: 'oles',
            accountNonLocked: true,
            credentialsNonExpired: true,
          };


          resolve(test);
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
