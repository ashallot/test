// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Iview from 'iview'
import VCharts from 'v-charts'
// const VCharts = () => import('v-charts')
import './assets/css/iview.css'
import axios from 'axios'
import qs from 'qs'
import auth from '@/utils/auth'

// axios setting
axios.defaults.baseURL = 'https://t.govlan.com/'
axios.defaults.timeout = 4000

axios.interceptors.request.use((config) => {
  Iview.LoadingBar.start()
  if (config.method === 'get') {
    if (config.params === undefined) {
      config.params = {}
    }
    config.params.token = '76c1a4b5a711644c43f854412758ee02'// auth.get().token
    config.params.adminId = '48'// auth.get().adminId
  }
  if (config.method === 'post' && config.url.indexOf('login') === -1) {
    config.data['token'] = '76c1a4b5a711644c43f854412758ee02'// auth.get().token
    config.data['adminId'] = '48'// auth.get().adminId
    config.data = qs.stringify(config.data)
  }
  return config
}, (error) => {
  Iview.Message.error('传参错误!')
  return Promise.reject(error)
})
// response
axios.interceptors.response.use(function (response) {
  // Do something with response data
  Iview.LoadingBar.finish()
  if (process.env.NODE_ENV === 'development') {
    // console.log(response)
  }
  console.log('callback....')
  if (response.data.status.code === '302') {
    auth.logout()
    window.location.href = 'https://t.govlan.com/govlan/logout'
    // router.push('/login')
  }
  if (response.data.status.code !== '200') {
    Iview.Message.error(response.data.status.message)
  }
  return response
}, function (error) {
  console.log(error)
  // Do something with response error
  // console.log(error)
  Iview.LoadingBar.finish()
  Iview.Message.error('系统错误!')
  return Promise.reject(error)
})
// Vue prototype
Vue.prototype.$http = axios
Vue.prototype.$auth = auth
Vue.prototype.$backPage = () => { history.back() }

Vue.config.productionTip = false

Vue.use(Iview)
Vue.use(VCharts)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
