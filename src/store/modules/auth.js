import api from '@api';

const getters = {
  getProfile: state => state.profile,
  getRegister: state => state.register,
};

const actions = {
  registerRequest({ commit }, data) {
    return api.auth.register(data).then((res) => {
      commit('setRegister', res);
    });
  },
  loginRequest({ commit }, data) {
    return api.auth.login(data).then((res) => {
      commit('setProfile', res);
    });
  },
};

const mutations = {
  setProfile(state, data) {
    state.profile = data;
  },
  setRegister(state, data) {
    state.register = data;
  },
};

const state = {
  profile: {},
  register: {},
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
