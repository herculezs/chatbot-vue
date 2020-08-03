/* eslint-disable no-tabs */
const defaultConfig = {
  env: 'development',
  http: {
    defaultRequest: {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        Accept: '*/*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
      },
    },
  },
};

export default Object.assign(defaultConfig);
