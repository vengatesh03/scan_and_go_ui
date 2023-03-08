// Polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { ColorThemePlugin } from '../services/vuestic-ui'
import store from '../store/index'
import router from '../router/index'
import { VuesticPlugin } from '../services/vuestic-ui/components'
import '../i18n/index'
// Vue.use(require('vue-resource'));
import VueResource from 'vue-resource'
import Notifications from 'vue-notification'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import { navigationRoutes } from '../components/admin/app-sidebar/NavigationRoutes'
import { sidebar } from '../i18n/sidebar.js'
import Multiselect from 'vue-multiselect'

Vue.use(Loading)
Vue.use(Notifications)
Vue.use(VueResource)

Vue.use(VuesticPlugin)
Vue.component('multiselect', Multiselect)

Vue.use(ColorThemePlugin, {
  primary: '#6c7fee',
  secondary: '#6e7ff1',
  success: '#8ddc88',
  info: '#71baff',
  danger: '#f8706d',
  warning: '#ffd652',
  gray: '#8396a5',
  dark: '#34495e',
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})

Vue.http.interceptors.push(function (request,next) {
  var accessToken = Vue.$cookies.get('x-access-token')
  request.headers.set('x-access-token', accessToken)
  next((response) => {
    if((response.status == 401) || (response.status == 403)) {
      this.$router.push({ name: 'login' })
    }else{
       if(Vue.$cookies.get('roles') != null){
        sidebar()
      }
    }
  });
}, response => {
})
