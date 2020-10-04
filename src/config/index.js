/* eslint-disable no-tabs */
const defaultConfig = {
  env: 'development',
  http: {
    defaultRequest: {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json',
      },
    },
  },
};

export default Object.assign(defaultConfig);
