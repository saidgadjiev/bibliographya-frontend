import Vue from 'vue'
import Router from 'vue-router'
import Biographies from './views/Biographies.vue'
import Profile from './views/Profile.vue'
import SignIn from './views/SignIn.vue'
import SignUp from './views/SignUp.vue'
import BiographyDetails from './views/BiographyDetails.vue'
import EditProfile from './views/EditProfile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'biographies',
      component: Biographies
    },
    {
      path: '/biography/:id',
      name: 'biography',
      component: BiographyDetails,
      props: (route) => ({ biographyId: parseInt(route.params.id), name: route.params.name })
    },
    {
      path: '/edit/profile',
      name: 'editProfile',
      component: EditProfile
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        loginRequired: true
      }
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
    }
  ]
})
