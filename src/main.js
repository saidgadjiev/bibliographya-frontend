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
import AsyncComputed from 'vue-async-computed'

import store from './store/store'

import 'vuetify/dist/vuetify.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.use(Vuex)
Vue.use(Vuetify)
Vue.use(Vue2TouchEvents)
Vue.use(VueCookie)
Vue.use(AsyncComputed)

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
  return Promise.reject(err)
})
axios.interceptors.response.use(function (response) {
  if (response.status === 401) {
    router.push('/401')
  } else if (response.status === 403) {
    router.push('/403')
  } else {
    return response
  }
}, function (err) {
  return Promise.reject(err)
})

new Vue({
  router,
  store,
  render: h => h(App),
  mounted () {
    this.$store.dispatch('getAccount')
  }
}).$mount('#app')
