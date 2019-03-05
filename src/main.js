import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate'
import russia from 'vee-validate/dist/locale/ru'
import axios from 'axios'
import InfiniteLoading from 'vue-infinite-loading'
import VueSweetalert2 from 'vue-sweetalert2'
import VueLogger from 'vuejs-logger'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'

import store from './store/store'

import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import { SERVER_ERROR, INTERNET_ERROR } from './messages'
import { REQUEST } from './config'

require('moment/locale/ru')

Vue.use(VueMoment, {
  moment
})

Vue.use(Vuex)
Vue.use(Vuetify)
Vue.use(VueSweetalert2)

Vue.component('infinite-loading', InfiniteLoading)

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
        if (store.getters['request/request'] !== REQUEST.SIGN_IN) {
          router.push('/403')
        }
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

  Vue.$log.error(err)

  return Promise.reject(err)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
