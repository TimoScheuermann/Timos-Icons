/* eslint-disable */
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import * as TCComponents from 'tccomponents_vue';
import 'tccomponents_vue/lib/tccomponents.css';
import Vue from 'vue';
import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.config.productionTip = false;

for (const component in TCComponents) {
  Vue.component(
    component
      .replace('TC', 'Tc')
      .replace('TL', 'Tl')
      .replace('TF', 'tf'),
    TCComponents[component]
  );
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
