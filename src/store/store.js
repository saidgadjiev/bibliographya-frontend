import Vue from 'vue'
import Vuex from 'vuex'

import authModule from './modules/security-module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth: authModule
  }
})
