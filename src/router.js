import Vue from 'vue'
import Router from 'vue-router'
import CategoriesList from './views/CategoriesList'
import BiographiesList from './views/BiographiesList'
import Profile from './views/Profile.vue'
import SignIn from './views/SignIn.vue'
import SignUp from './views/SignUp.vue'
import BiographyDetails from './views/BiographyDetails.vue'
import EditProfile from './views/EditProfile'
import EditBiography from './views/EditBiographyDetails'
import CreateBiographyDetails from './views/CreateBiographyDetails'
import CreatedByMeBiographies from './views/CreatedByMeBiographies'
import BiographiesModeration from './views/BiographiesModeration'
import store from './store/store'
import error403 from './components/error/403'
import error404 from './components/error/404'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'categories',
      component: CategoriesList
    },
    {
      path: '/category/:categoryName',
      name: 'biographies',
      component: BiographiesList,
      props: (route) => ({ categoryName: route.params.categoryName })
    },
    {
      path: '/biography/:id',
      name: 'biography',
      component: BiographyDetails,
      props: (route) => ({
        biographyId: parseInt(route.params.id),
        categoryName: route.params.categoryName
      })
    },
    {
      path: '/edit/profile',
      name: 'editProfile',
      component: EditProfile,
      meta: {
        loginRequired: true,
        expression: function (to) {
          console.log(to)
        }
      }
    },
    {
      path: '/create/biography',
      name: 'createBiography',
      component: CreateBiographyDetails
    },
    {
      path: '/created',
      name: 'createdByMe',
      component: CreatedByMeBiographies
    },
    {
      path: '/moderation',
      name: 'moderation',
      component: BiographiesModeration
    },
    {
      path: '/edit/biography/:id',
      name: 'editBiography',
      component: EditBiography,
      props: (route) => ({ biographyId: parseInt(route.params.id) })
      /* async beforeEnter (to, from, next) {
        if (!store.getters.isAuthenticated) {
          next('/signIn')

          return
        }
        if (!store.getters.isAuthorized(settings.roles.ROLE_ADMIN)) {
          let biography = await biographyService.getBiographyById(to.params.id)
            .then(
              response => {
                return response.data
              }
            )

          if (biography.creatorName !== store.getters.getUser.name) {
            next('/403')

            return
          }
        }

        next()
      } */
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
    },
    {
      path: '/403',
      name: 'error403',
      component: error403
    },
    {
      path: '*',
      name: 'error404',
      component: error404
    }
  ]
})

router.beforeEach((to, from, next) => {
  let meta = to.meta

  if (meta.loginRequired && !store.getters.isAuthenticated) {
    next('/signIn')

    return
  }
  if ((to.path === '/signIn' || to.path === 'signUp') && store.getters.isAuthenticated) {
    if (from.name === undefined) {
      next('/')
    } else {
      next(false)
    }

    return
  }
  if (meta.expression) {
    if (!meta.expression(to)) {
      next(false)
      return
    }
  }

  next()
})

export default router
