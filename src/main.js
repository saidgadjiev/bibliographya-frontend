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
import { METRIKA_ID, TOKEN_NAME, REQUEST } from './config'
import Meta from 'vue-meta'
import VueCountdown from '@chenfengyuan/vue-countdown'
import { getUserToken } from './store/modules/user-module'
import VueOffline from 'vue-offline'

import store from './store/store'

import 'vuetify/src/stylus/app.styl'
import '@mdi/font/css/materialdesignicons.min.css'
import 'vue-tel-input/dist/vue-tel-input.css'
import { INTERNET_ERROR, SERVER_ERROR, TOO_MANY_REQUESTS } from './messages'

moment.tz.setDefault('Europe/Moscow')
require('moment/locale/ru')

Vue.use(VueMoment, {
  moment
})

Vue.use(VueOffline)

Vue.component(VueCountdown.name, VueCountdown)

Vue.use(Meta, {
  keyName: 'metaInfo', // the component option name that vue-meta looks for meta info on.
  attribute: 'data-vue-meta', // the attribute name vue-meta adds to the tags it observes
  ssrAttribute: 'data-vue-meta-server-rendered', // the attribute name that lets vue-meta know that meta info has already been server-rendered
  tagIDKeyName: 'vmid' // the property name that vue-meta uses to determine whether to overwrite or append a tag
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
Vue.config.devtools = true
axios.defaults.withCredentials = true

axios.interceptors.request.use(function (request) {
  if (navigator.onLine) {
    request.headers.common[TOKEN_NAME] = getUserToken()

    return request
  }

  return false
}, function (err) {
  return Promise.reject(err)
})

axios.interceptors.response.use(function (response) {
  return response
}, function (err) {
  if (store.getters['request/request'] === REQUEST.GET_ACCOUNT) {
    return Promise.reject(err)
  }
  if (axios.isCancel(err)) {
    if (!isProduction) {
      console.log('request canceled')
    }
  } else if (!err.response) {
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
      case 429:
        Vue.swal.fire({
          text: TOO_MANY_REQUESTS,
          type: 'error',
          showCloseButton: true
        })
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
