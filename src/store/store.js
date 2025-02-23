import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/user-module'
import settings from './modules/ux-settings-module'
import alert from './modules/alert-module'
import request from './modules/request-module'
import routerM from './modules/router-module'
import { AlertPlugin } from './plugins/plugins'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    alert: alert,
    settings,
    request,
    routerM
  },
  plugins: [AlertPlugin]
})
