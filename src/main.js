import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import Vuetify from 'vuetify/lib'
import VeeValidate from 'vee-validate'
import russia from 'vee-validate/dist/locale/ru'
import axios from 'axios'
import VueSweetalert2 from 'vue-sweetalert2'
import VueLogger from 'vuejs-logger'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'
import VueYandexMetrika from 'vue-yandex-metrika'
import { METRIKA_ID } from './config'

import store from './store/store'

import 'vuetify/src/stylus/app.styl'
import '@mdi/font/css/materialdesignicons.min.css'
import { INTERNET_ERROR, SERVER_ERROR } from './messages'

moment.tz.setDefault('Europe/Moscow')
require('moment/locale/ru')

Vue.use(VueMoment, {
  moment
})

Vue.use(Vuex)
Vue.use(Vuetify, {
  iconfont: 'fa'
})
Vue.use(VueSweetalert2)

const isProduction = process.env.NODE_ENV === 'production'

const options = {
  isEnabled: true,
  logLevel: isProduction ? 'error' : 'debug',
  stringifyArguments: false,
  showLogLevel: true,
  showMethodName: true,
  separator: '|',
  showConsoleColors: true
}

Vue.use(VueLogger, options)

const config = {
  locale: 'ru',
  events: 'input|blur',
  dictionary: {
    ru: {
      messages: russia.messages
    }
  }
}

Vue.use(VueYandexMetrika, {
  id: METRIKA_ID,
  router: router,
  env: process.env.NODE_ENV,
  debug: true
})

Vue.use(VeeValidate, config)

Vue.config.productionTip = false

axios.defaults.withCredentials = true

axios.interceptors.request.use(function (request) {
  return request
}, function (err) {
  Vue.$log.error(err)
  return Promise.reject(err)
})

axios.interceptors.response.use(function (response) {
  return response
}, function (err) {
  if (!err.response) {
    Vue.swal.fire({
      text: INTERNET_ERROR,
      type: 'error',
      showCloseButton: true
    })
  } else {
    switch (err.response.status) {
      case 401:
        router.push('/signIn')
        break
      case 403:
        router.push('/403')
        break
      case 500:
        Vue.swal.fire({
          text: SERVER_ERROR,
          type: 'error',
          showCloseButton: true
        })
        break
    }
  }

  return Promise.reject(err)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
