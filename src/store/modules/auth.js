import api from '@api';

const getters = {
  getProfile: state => state.profile,
  getRedirectAuth: state => state.redirectAuth,
  getSecurityCode: state => state.securityCode,
};

const actions = {
  setSecurityCode({ commit, state }, data) {
    return api.auth.validateCode(data, state.profile.id).then(() => {
      commit('setSecurityCode', data.code);
    });
  },
  updatePhoneNumber({ commit, state }, data) {
    return api.auth.updatePhoneNumber(data, state.profile.id).then((res) => {
      commit('updatePhoneNumber', res);
    });
  },
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
      commit('setId', { id: res });
    });
  },
  newPassword({ commit }, data) {
    return api.auth.newPassword(data.formData, data.userId).then((res) => {
      commit('setProfile', res);
    });
  },
  setSelfPersonalityTypeRequest({ commit }, formData) {
    return api.personalityTypeReport.setPersonalityType(formData).then(() => {
      commit('setSelfPersonalityType', formData.selfPersonalityType);
    });
  },
  setCompletedFeedbackRequest({ commit }, formData) {
    return api.feedback.setFeedBack(formData).then(() => {
      commit('setCompletedFeedback', process.env.FEEDBACK_ID);
    });
  },
  updateIdentificationData({ commit }, data) {
    commit('updateIdentificationData', data);
  },
  logout({ commit }) {
    commit('setProfile', {});
    commit('setRedirectAuth', 'questionnaire');
  },
  setRedirectAuth({ commit }, path) {
    commit('setRedirectAuth', path);
  },
  updateProfile({ commit }, data) {
    commit('setProfile', data);
  },
  updateSavedSecretAnswers({ commit }) {
    commit('setSavedSecretAnswers', commit);
  },
};

const mutations = {
  setProfile(state, data) {
    state.profile = data;
  },
  setId(state, data) {
    state.profile = {
      ...state.profile,
      id: data.id,
    };
  },
  setSecurityCode(state, data) {
    state.securityCode = data;
  },
  setSelfPersonalityType(state, data) {
    state.profile.selfPersonalityType = data;
  },
  setCompletedFeedback(state, data) {
    state.profile.completedFeedbacks = [
      ...state.profile.completedFeedbacks,
      data,
    ];
  },
  updatePhoneNumber(state, data) {
    state.profile.phone = data.phone;
    state.profile.isoCountryCode = data.isoCountryCode;
    state.profile.codeCountry = data.codeCountry;
    state.profile.phoneReal = null;
    state.profile.token = data.token;
  },
  setRedirectAuth(state, path) {
    state.redirectAuth = path;
  },
  setSavedSecretAnswers(state) {
    state.profile = {
      ...state.profile,
      userWithoutSecretAnswer: true,
    };
  },
  updateIdentificationData(state, data) {
    state.profile = {
      ...state.profile,
      userWithIdentificationCard: data.userWithIdentificationCard,
      userWithCreditCard: data.userWithCreditCard,
    };
  },
};

const state = {
  profile: {},
  securityCode: null,
  redirectAuth: 'questionnaire',
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
