// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Echarts from 'echarts'
import router from './router'
import 'lib-flexible'
import iView from 'iview';
import TFetch from 'tfetch';
import VueCookie from 'vue-cookie'
import 'iview/dist/styles/iview.css';
require('swiper/dist/css/swiper.css')
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.config.productionTip = false
Vue.prototype.$echarts = Echarts

// import 'babel-polyfill' 
import Es6Promise from 'es6-promise' 
require('es6-promise').polyfill() 
Es6Promise.polyfill()

Vue.use(VueCookie);
Vue.cookie.delete('JSESSIONID')
// 引入下拉刷新 上拉加载
import EasyRefresh from 'vue-easyrefresh'
Vue.use(EasyRefresh)
// 引入全局过滤器
import * as filters from '../src/assets/js/filters'
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

const http = new TFetch({
  // baseUrl: './api',
  baseUrl: '../..',
  conf: {
    // headers: {
      // 'Accept': 'application/json',
      // 'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded', 默认
    // },
    credentials: 'include',
  },
  mode: 'cors',
  before: [() => {
    // Vue.cookie.set('sid', '75dc85b9-9f66-4940-9bd1-c9c8e98ad7a1')

  }],
  after: [(res) => {
    res.json().then(rst => {
        if (rst && rst.status && rst.data && rst.data.relogin) {
          // router.push(`/login?redirect=${router.currentRoute.fullPath}`)
          // router.push('/login')
        }
      })
  }],
  timeout: 15000,
})


Vue.prototype.$http = http
Vue.use(router);
Vue.use(iView);
Vue.use(VueAwesomeSwiper)
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
