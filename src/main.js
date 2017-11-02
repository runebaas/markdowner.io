import Vue from 'vue';
import Vuetify from 'vuetify';
import VueAnalytics from 'vue-analytics';
import App from './App';

Vue.$isLocalhost = (window.location.host === 'localhost:8080');

Vue.use(Vuetify);
if (!Vue.$isLocalhost) {
  Vue.use(VueAnalytics, {
    id: 'UA-109142218-1',
    checkDuplicatedScript: true,
  });
}

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});
