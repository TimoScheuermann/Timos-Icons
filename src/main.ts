/* eslint-disable */
import App from '@/App.vue';
import router, { getTitle } from '@/router';
import store from '@/store';
import * as TCComponents from 'tccomponents_vue';
import 'tccomponents_vue/lib/tccomponents.css';
import Vue from 'vue';
import { Route } from 'vue-router';
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
router.beforeEach((to: Route, from: Route, next) => {
  const title = getTitle(to);
  document.title = title;

  const twitter = document.querySelector('meta[property="twitter:title"]');
  if (twitter) twitter.setAttribute('content', title);

  const og = document.querySelector('meta[property="og:title"]');
  if (og) og.setAttribute('content', title);

  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
