import Vue from 'vue'
import Vuex from 'vuex'

import authModule from './modules/user-module'
import biographyModule from './modules/biography-module'
import alert from './modules/alert-module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth: authModule,
    biography: biographyModule,
    alert: alert
  }
})
