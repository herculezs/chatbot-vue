import http from '@utils/http';
import Vue from 'vue';

export default {
  fetchQuestionnaire() {
    return new Promise((resolve, reject) => {
      http.get('questionnaire').then(
        ({ data }) => {
          resolve(data);
        },
      ).catch((error) => {
        reject(error);
        Vue.notify({
          type: 'error',
          title: error.response.data.error,
          text: error.response.data.message,
        });
      });
    });
  },
};
