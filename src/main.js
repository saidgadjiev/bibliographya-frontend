import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource'
import VeeValidate from 'vee-validate'
import russia from 'vee-validate/dist/locale/ru'
import Vue2TouchEvents from 'vue2-touch-events'

import store from './store/store'

import 'vuetify/dist/vuetify.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Biograprhy from './components/Biography.vue'

Vue.use(Vuex)
Vue.use(Vuetify)
Vue.use(VueResource)
Vue.use(Vue2TouchEvents)

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

Vue.http.interceptors.push({
  request: function (request) {
    console.log('request: ' + request.data)
    return request
  },
  response: function (response) {
    console.log('response: ' + response.data)
    return response
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
