/* eslint-disable */
import api from '@/store/api';

const TestStore = {
  namespaced: true,
  state: {
    testInfo: null,
    isLoading: false,
  },
  getters: {
    testInfo: state => state.testInfo,
    isLoading: state => state.isLoading,
  },
  mutations: {
    setTestInfo: (state, testInfo) => (state.testInfo = testInfo),
    setIsLoading: (state, loading) => (state.isLoading = loading),
  },
  actions: {
    async getTestInfo({ commit }) {
      commit('setIsLoading', true);
      return api
        .get('/redfish/v1/Systems/system/Test')  // 根据实际 API 路径调整
        .then(response => {
          commit('setTestInfo', response.data);
        })
        .catch(error => {
          console.log('Failed to get Test information:', error);
          commit('setTestInfo', null);
        })
        .finally(() => {
          commit('setIsLoading', false);
        });
    },
  },
};

export default TestStore; 