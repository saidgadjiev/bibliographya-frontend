import Vue from 'vue'
import Router from 'vue-router'
import CategoriesList from './views/CategoriesList'
import BiographiesList from './views/BiographiesList'
import Profile from './views/Profile'
import ProfileSettings from './views/ProfileSettings'
import ChangeEmail from './views/ChangeEmail'
import EmailConfirm from './views/EmailConfirm'
import SignIn from './views/SignInView'
import SignUp from './views/SignUpView'
import Confirm from './views/Confirm'
import RestorePassword from './views/RestorePassword'
import AdminSignIn from './views/AdminSignIn'
import BiographyDetails from './views/BiographyDetails'
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
import { ROLES, LAYOUTS } from './config'
import biographyService from './services/biography-service'
import { USER_STATE } from './store/modules/user-module'
import { GET_CONFIRMATION } from './store/action-types'

Vue.use(Router)

const waitForAccount = function (callback) {
  if (store.getters.getStatus === USER_STATE.NONE) {
    store.watch(store.getters.watchState, function () {
      if (store.getters.getStatus !== USER_STATE.NONE) {
        callback()
      }
    })
  } else {
    callback()
  }
}

const moveToRootOrDefault = function (from, next) {
  if (from.name) {
    next(false)
  } else {
    next('/categories')
  }
}

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

  waitForAccount(proceed)
}

const ifNotAuthenticated = function (to, from, next) {
  function proceed () {
    if (store.getters.isAuthenticated) {
      moveToRootOrDefault(from, next)
    } else {
      let meta = to.meta

      if (meta.expression) {
        meta.expression(to, from, next)
      } else {
        next()
      }
    }
  }

  waitForAccount(proceed)
}

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/settings',
      name: 'settings',
      component: ProfileSettings,
      beforeEnter: requireAuth,
      meta: {
        loginRequired: true,
        roles: [ROLES.ROLE_USER]
      }
    },
    {
      path: '/settings/email',
      name: 'changeEmail',
      component: ChangeEmail,
      beforeEnter: requireAuth,
      meta: {
        loginRequired: true,
        roles: [ROLES.ROLE_USER]
      }
    },
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
      path: '/categories/admin',
      name: 'categoriesAdmin',
      component: CategoriesAdmin,
      beforeEnter: requireAuth,
      meta: {
        loginRequired: true,
        roles: [ROLES.ROLE_ADMIN]
      }
    },
    {
      path: '/categories',
      name: 'categories',
      component: CategoriesList
    },
    {
      path: '/',
      alias: '/signIn',
      component: SignIn,
      beforeEnter: ifNotAuthenticated,
      meta: {
        layout: LAYOUTS.AUTH_LAYOUT
      }
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
      path: '/signUp',
      name: 'signUp',
      component: SignUp,
      beforeEnter: ifNotAuthenticated,
      meta: {
        layout: LAYOUTS.AUTH_LAYOUT
      }
    },
    {
      path: '/signUp/confirm',
      name: 'signUpConfirm',
      component: Confirm,
      beforeEnter: ifNotAuthenticated,
      meta: {
        layout: LAYOUTS.AUTH_LAYOUT,
        expression: function (to, from, next) {
          store.dispatch(GET_CONFIRMATION)
            .then(
              confirmation => {
                if (confirmation) {
                  next()
                } else {
                  moveToRootOrDefault(from, next)
                }
              },
              e => {
                moveToRootOrDefault(from, next)
              }
            )
        }
      }
    },
    {
      path: '/settings/email/confirm',
      name: 'emailConfirm',
      component: EmailConfirm,
      beforeEnter: requireAuth,
      meta: {
        loginRequired: true,
        expression: function (to, from, next) {
          if (!store.getters.isEmailVerified) {
            next()
          } else {
            moveToRootOrDefault(from, next)
          }
        },
        roles: [ROLES.ROLE_USER]
      }
    },
    {
      path: '/restore',
      name: 'restorePassword',
      component: RestorePassword
    },
    {
      path: '/signIn',
      name: 'signIn',
      component: SignIn,
      beforeEnter: ifNotAuthenticated,
      meta: {
        layout: LAYOUTS.AUTH_LAYOUT
      }
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

router.beforeResolve((to, from, next) => {
  function proceed () {
    let meta = to.meta
    let currentLayout = store.getters.layout
    let nextLayout = null

    if (meta.layout) {
      nextLayout = meta.layout
    } else {
      if (store.getters.isAuthenticated) {
        nextLayout = LAYOUTS.SIGNED_IN_LAYOUT
      } else {
        nextLayout = LAYOUTS.ANONYMOUS_LAYOUT
      }
    }

    if (currentLayout !== nextLayout) {
      store.commit('setLayout', nextLayout)
    }

    next()
  }

  waitForAccount(proceed)
})

export default router
