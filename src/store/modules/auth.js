import api from '@api';

const getters = {
  getProfile: state => state.profile,
};


const actions = {
  registerRequest({ commit }, data) {
    api.auth.register(data).then((res) => {
      commit('setProfile', res.data);
    });
  },
  loginRequest({ commit }, data) {
    api.auth.login(data).then((res) => {
      commit('setProfile', res.data);
    });
  },
  newPasswordRequest({ commit }, data) {
    api.auth.newPassword(data).then((res) => {
      commit('setPassword', res.data);
    });
  },
  resetPasswordRequest({ commit }, data) {
    api.auth.resetPassword(data).then((res) => {
      commit('setPassword', res.data);
    });
  },
};

const mutations = {
  setProfile(state, data) {
    state.profile = data;
  },
  setPassword(state, data) {
    state.profile.password = data;
  },
};

const state = {
  profile: {},
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
