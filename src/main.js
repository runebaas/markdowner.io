/* eslint-disable import/first,import/newline-after-import */
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueAnalytics from 'vue-analytics';
import VueHighlightJS from 'vue-highlightjs';
import * as runtime from 'offline-plugin/runtime';
import store from './store';
Vue.$store = store;
import App from './App';

Vue.$isLocalhost = (window.location.host === 'localhost:8080');

Vue.use(Vuetify);
Vue.use(VueHighlightJS);
if (!Vue.$isLocalhost) {
  Vue.use(VueAnalytics, {
    id: 'UA-109142218-1',
    checkDuplicatedScript: true,
  });
  Vue.$store.commit('hasUpdate', false);
  runtime.install({
    onUpdateReady: () => {
      runtime.applyUpdate();
    },
    onUpdated: () => {
      Vue.$store.commit('hasUpdate', true);
    },
  });
}

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});
