import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'v-markdown-editor/dist/index.css';
import VueSession from 'vue-session';
import VeeValidate, { Validator } from 'vee-validate';
import ja from 'vee-validate/dist/locale/ja';
import App from './App.vue';
import router from './router';
var VueResource = require('vue-resource');


Vue.use(BootstrapVue);
Vue.config.productionTip = false;
Vue.use(VueSession);
Validator.localize('ja', ja);
Vue.use(VeeValidate, { locale: ja, fieldsBagName: 'veeFields' });
Vue.use(require('vue-moment'));
Vue.use(VueResource);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
// <!--  <link rel="icon" href="<%= BASE_URL %>b-logo.webp"> -->