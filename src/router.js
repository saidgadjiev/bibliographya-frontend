import Vue from 'vue'
import Router from 'vue-router'
import Biographies from './views/Biographies.vue'
import Profile from './views/Profile.vue'
import SignIn from './views/SignIn.vue'
import SignUp from './views/SignUp.vue'
import Details from './views/Details'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'biographies',
      component: Biographies
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/signIn',
      name: 'signIn',
      component: SignIn
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: SignUp
    },
    {
      path: '/details',
      name: 'details',
      component: Details
    }
  ]
})
