import Vue from 'vue';
import Vuex from 'vuex';
import camelCase from 'lodash/camelCase';

/* ----------   Other   ----------*/
import plugins from '@store/plugins';

Vue.use(Vuex);

const requireModules = require.context('./modules', false, /\.js$/);
const modules = {};

requireModules.keys().forEach((fileName) => {
  const moduleName = camelCase(fileName.replace(/(\.\/|\.js)/g, ''));

  modules[moduleName] = requireModules(fileName).default;
});

export default new Vuex.Store({
  modules,
  plugins,
});
