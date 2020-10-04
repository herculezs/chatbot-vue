import api from '@api';

const getters = {
  getPersonalityTest: state => state.personalityTest,
};

const actions = {
  setPersonalityTest({ commit }, data) {
    return api.questionnaire.saveInvitationAnswer(data.formData, data.id).then((res) => {
      commit('setPersonalityTest', res);
    });
  },
};

const mutations = {
  setPersonalityTest(state, data) {
    state.personalityTest = data;
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
