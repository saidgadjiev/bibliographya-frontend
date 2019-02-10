import Vue from 'vue'
import Router from 'vue-router'
import CategoriesList from './views/CategoriesList'
import BiographiesList from './views/BiographiesList'
import Profile from './views/Profile.vue'
import SignIn from './views/SignIn.vue'
import AdminSignIn from './views/AdminSignIn'
import BiographyDetails from './views/BiographyDetails.vue'
import CategoriesAdmin from './views/CategoriesAdmin'
import BugTracking from './views/BugTracking'
import CreateBug from './views/CreateBug'
import EditCategory from './views/EditCategory'
import EditBiography from './views/EditBiographyDetails'
import CreateBiographyDetails from './views/CreateBiographyDetails'
import CreatedByMeBiographies from './views/CreatedByMeBiographiesList'
import BiographiesModeration from './views/BiographiesModerationsList'
import BiographyFixesList from './views/BiographiesFixesList'
import Privacy from './views/Privacy'
import Statistics from './views/Statistics'
import OAuthCallback from './views/OAuthCallback'
import UsersList from './views/UsersList'
import store from './store/store'
import error403 from './views/403'
import error404 from './views/404'
import { ROLES } from './config'
import biographyService from './services/biography-service'

Vue.use(Router)

const requireAuth = function (to, from, next) {
  function proceed () {
    let meta = to.meta

    if (meta.loginRequired && !store.getters.isAuthenticated) {
      next('/signIn')

      return
    }
    if (meta.roles && !store.getters.isAuthorized(meta.roles)) {
      next('/403')
      return
    }
    if (meta.expression) {
      meta.expression(to, from, next)
    } else {
      next()
    }
  }

  if (store.getters.status.notSignedIn || store.getters.status.signingIn) {
    store.watch(store.getters.watchStatus, function () {
      if (!store.getters.status.notSignedIn && !store.getters.status.signingIn) {
        proceed()
      }
    })
  } else {
    proceed()
  }
}

const ifNotAuthenticated = function (to, from, next) {
  function proceed () {
    if (store.getters.isAuthenticated) {
      if (from.name) {
        next(false)
      } else {
        next('/')
      }

      return
    }

    next()
  }
  if (store.getters.status.notSignedIn || store.getters.status.signingIn) {
    store.watch(store.getters.watchStatus, function () {
      if (!store.getters.status.notSignedIn && !store.getters.status.signingIn) {
        proceed()
      }
    })
  } else {
    proceed()
  }
}

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/create/category',
      name: 'createCategory',
      component: EditCategory,
      beforeEnter: requireAuth,
      meta: {
        loginRequired: true,
        roles: [ROLES.ROLE_ADMIN]
      }
    },
    {
      path: '/edit/categories/:categoryId',
      name: 'editCategory',
      component: EditCategory,
      props: (route) => ({ categoryId: parseInt(route.params.categoryId) }),
      beforeEnter: requireAuth,
      meta: {
        loginRequired: true,
        roles: [ROLES.ROLE_ADMIN]
      }
    },
    {
      path: '/create/bug',
      name: 'createBug',
      component: CreateBug,
      beforeEnter: requireAuth,
      meta: {
        loginRequired: true
      }
    },
    {
      path: '/bug/tracking',
      name: 'bugTracking',
      component: BugTracking,
      beforeEnter: requireAuth,
      meta: {
        loginRequired: true,
        roles: [ROLES.ROLE_ADMIN]
      }
    },
    {
      path: '/categories',
      name: 'categoriesAdmin',
      component: CategoriesAdmin,
      beforeEnter: requireAuth,
      meta: {
        loginRequired: true,
        roles: [ROLES.ROLE_ADMIN]
      }
    },
    {
      path: '/',
      name: 'categories',
      component: CategoriesList
    },
    {
      path: '/categories/:categoryId',
      name: 'categoryBiographies',
      component: BiographiesList,
      props: (route) => ({ categoryId: parseInt(route.params.categoryId) })
    },
    {
      path: '/biographies',
      name: 'biographies',
      component: BiographiesList
    },
    {
      path: '/biographies/:id',
      name: 'biography',
      component: BiographyDetails,
      props: (route) => ({
        biographyId: parseInt(route.params.id)
      })
    },
    {
      path: '/create/biography',
      name: 'createBiography',
      component: CreateBiographyDetails,
      beforeEnter: requireAuth,
      meta: {
        loginRequired: true
      }
    },
    {
      path: '/created',
      name: 'createdByMe',
      component: CreatedByMeBiographies,
      beforeEnter: requireAuth,
      meta: {
        loginRequired: true
      }
    },
    {
      path: '/moderation',
      name: 'moderation',
      component: BiographiesModeration,
      beforeEnter: requireAuth,
      meta: {
        loginRequired: true,
        roles: [ROLES.ROLE_MODERATOR]
      }
    },
    {
      path: '/users',
      name: 'users',
      component: UsersList,
      beforeEnter: requireAuth,
      meta: {
        loginRequired: true,
        roles: [ROLES.ROLE_ADMIN]
      }
    },
    {
      path: '/fixes',
      name: 'fixes',
      component: BiographyFixesList,
      beforeEnter: requireAuth,
      meta: {
        loginRequired: true,
        roles: [ROLES.ROLE_MODERATOR]
      }
    },
    {
      path: '/edit/biographies/:id',
      name: 'editBiography',
      component: EditBiography,
      props: (route) => ({ biographyId: parseInt(route.params.id) }),
      beforeEnter: requireAuth,
      meta: {
        loginRequired: true,
        expression: function (to, from, next) {
          biographyService.canEdit(to.params.id)
            .then(
              () => {
                next()
              }
            )
        }
      }
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: Profile,
      beforeEnter: requireAuth,
      meta: {
        loginRequired: true
      }
    },
    {
      path: '/signIn',
      name: 'signIn',
      component: SignIn,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminSignIn,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: Statistics,
      beforeEnter: requireAuth,
      meta: {
        loginRequired: true,
        roles: [ROLES.ROLE_ADMIN]
      }
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: Privacy
    },
    {
      path: '/:providerId/callback',
      name: 'oauthcallback',
      component: OAuthCallback,
      props: (route) => ({ providerId: route.params.providerId })
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

export default router
