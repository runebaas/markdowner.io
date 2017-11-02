/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'markdowner',
    }),
  ],
  state: {
    settings: {
      selectedLanguage: 'reStructuredText',
      useDarkTheme: false,
      renderMarkdown: false,
    },
  },
  mutations: {
    setLanguage(state, language) {
      state.settings.selectedLanguage = language;
    },
    toggleDarkTheme(state) {
      state.settings.useDarkTheme = !state.settings.useDarkTheme;
    },
    toggleRenderMarkdown(state) {
      state.settings.renderMarkdown = !state.settings.renderMarkdown;
    },
  },
});

export default store;
