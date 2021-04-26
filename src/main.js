import './installCompositionApi';
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
import { library } from '@fortawesome/fontawesome-svg-core';
import VTooltip from 'v-tooltip';
import VueI18n from 'vue-i18n';
import VueMeta from 'vue-meta';
import vuetify from '@/plugins/vuetify';
import VueFileAgent from 'vue-file-agent';
// eslint-disable-next-line no-unused-vars
import VueFileAgentStyles from 'vue-file-agent/dist/vue-file-agent.css';
import VuePapaParse from 'vue-papa-parse';
import { TooltipPlugin } from '@syncfusion/ej2-vue-popups';

import 'echarts';

import {
  faUserSecret, faUserAlt, faEnvelope, faUserTag, faUserFriends, faMobile, faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

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
Vue.use(VueI18n);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(VTooltip);
Vue.use(VueMeta);
Vue.use(VueFileAgent);
Vue.use(VuePapaParse);
Vue.use(TooltipPlugin);

library.add(faUserSecret);
library.add(faUserAlt);
library.add(faEnvelope);
library.add(faUserTag); // role
library.add(faUserFriends); // depart
library.add(faMobile); // phone
library.add(faTrashAlt); // phone


window.app = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
