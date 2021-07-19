import api from '@api';

const getters = {
  getPersonalityTest: state => state.personalityTest,
  getPersonalityTestForManager: state => state.personalityTest,
};

const actions = {
  setPersonalityTest({ commit }, data) {
    return api.questionnaire.saveInvitationAnswer(data.formData, data.id, data.uniqueId,
      data.requestParam)
      .then((res) => {
        commit('setPersonalityTest', res);
      });
  },
  setPersonalityTestForManager({ commit }, formData) {
    commit('setPersonalityTestForManager', formData);
  },
};

const mutations = {
  setPersonalityTest(state, data) {
    state.personalityTest = data;
  },
  setPersonalityTestForManager(state, formData) {
    state.personalityTest = formData.formData;
  },
};

const state = {
  personalityTest: {},
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
