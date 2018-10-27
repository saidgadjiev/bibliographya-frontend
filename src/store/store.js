import Vue from 'vue'
import Vuex from 'vuex'

import authModule from './modules/user-module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth: authModule
  }
})
