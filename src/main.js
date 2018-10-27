import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate'
import russia from 'vee-validate/dist/locale/ru'
import Vue2TouchEvents from 'vue2-touch-events'
import VueCookie from 'vue-cookie'
import axios from 'axios'

import store from './store/store'

import 'vuetify/dist/vuetify.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Biograprhy from './components/Biography.vue'

Vue.use(Vuex)
Vue.use(Vuetify)
Vue.use(Vue2TouchEvents)
Vue.use(VueCookie)

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

Vue.component('biography', Biograprhy)

Vue.config.productionTip = false

axios.interceptors.request.use(function (request) {
  console.log('request: ' + request.data)

  return request
}, function (err) {
  return Promise.reject(err)
})
axios.interceptors.response.use(function (response) {
  console.log('response: ' + response.data)

  return response
}, function (err) {
  return Promise.reject(err)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
