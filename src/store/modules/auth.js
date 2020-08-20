import api from '@api';

const getters = {
  getProfile: state => state.profile,
};

const actions = {
  registerRequest({ commit }, data) {
    return api.auth.register(data).then((res) => {
      commit('setProfile', res);
    });
  },
  loginRequest({ commit }, data) {
    return api.auth.login(data).then((res) => {
      commit('setProfile', res);
    });
  },
  resetPasswordRequest({ commit }, data) {
    return api.auth.resetPassword(data).then((res) => {
      commit('setProfile', res);
    });
  },
  newPassword({ commit }, data) {
    return api.auth.newPassword(data.formData, data.userId).then((res) => {
      commit('setProfile', res);
    });
  },
  setSelfPersonalityType({ commit }, data) {
    commit('setSelfPersonalityType', data);
  },
  logout({ commit }) {
    commit('setProfile', {});
  },
};

const mutations = {
  setProfile(state, data) {
    state.profile = data;
  },
  setSelfPersonalityType(state, data) {
    state.profile.selfPersonalityType = data;
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
