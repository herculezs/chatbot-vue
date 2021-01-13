import Vue from 'vue';
import Notifications from 'vue-notification';
import moment from 'moment';
import api from '@api';
import store from '@store';
import router from '@/router';
import globalMixin from '@/mixins/global';
import events from '@utils/events';
import VueCarousel from 'vue-carousel';
import VueTelInput from 'vue-tel-input';
import { BootstrapVue } from 'bootstrap-vue';
import VueSocialSharing from 'vue-social-sharing';
import Vue2TouchEvents from 'vue2-touch-events';

import VueGtag from 'vue-gtag';
import App from './App.vue';

Vue.use(VueGtag, {
  config: { id: 'UA-180628402-1' },
}, router);

// eslint-disable-next-line
require('moment/locale/lv');

Vue.config.productionTip = false;
Vue.prototype.$moment = moment;
Vue.prototype.$api = api;
Vue.prototype.$events = events;

Vue.mixin(globalMixin);
Vue.use(Notifications);
Vue.use(VueCarousel);
Vue.use(VueTelInput);
Vue.use(BootstrapVue);
Vue.use(VueSocialSharing);
Vue.use(Vue2TouchEvents);

window.app = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
