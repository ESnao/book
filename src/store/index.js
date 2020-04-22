import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
import Cookies from 'js-cookie';

Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
  },
  getters: {},
  actions: {
    headerList({ commit }, data) {
      return Axios.post('/guest/menu/get', data);
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      Cookies.set('token', token);
    }
  }
};
