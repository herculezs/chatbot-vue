import Vue from 'vue';

const notifyError = error => Vue.notify({
  type: 'error',
  text: error.response.data.message || 'Something error',
});

export default notifyError;
