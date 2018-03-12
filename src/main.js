// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Layout from './components/layout.vue'
import IndexPage from './pages/index.vue'
import DetailPage from './pages/detail.vue'
import OrderListPage from './pages/orderList.vue'

import DetailCouPage from './pages/detail/count.vue'
import DetailForPage from './pages/detail/forecast.vue'
import DetailAnaPage from './pages/detail/analysis.vue'
import DetailPubPage from './pages/detail/publish.vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource';

import store from './store'

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.config.productionTip = false;

let router = new VueRouter({
  mode:'history',
  routes:[
    {
      path:'/',
      component:IndexPage
    },
    {
      path:'/orderList',
      component:OrderListPage
    },
    {
      path:'/detail',
      component:DetailPage,
      redirect:'/detail/analysis',
      children:[
        {
          path:'count',
          component:DetailCouPage
        },
        {
          path:'forecast',
          component:DetailForPage
        },
        {
          path:'analysis',
          component:DetailAnaPage
        },
        {
          path:'publish',
          component:DetailPubPage
        }
      ]
    }
  ]
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  // components: { App },
  // template: '<App/>'
  components:{ Layout },
  template: '<Layout/>'
})
