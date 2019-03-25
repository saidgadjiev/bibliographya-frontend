import Vue from 'vue'
import Router from 'vue-router'
import BiographiesList from './views/BiographiesList'
import store from './store/store'
import error403 from './views/403'
import error404 from './views/404'
import { ROLES } from './config'
import biographyService from './services/biography-service'
import { USER_STATE } from './store/modules/user-module'
import { GET_CONFIRMATION } from './store/action-types'

const RestorePassword = () => import('./views/RestorePassword')
const BiographyDetails = () => import('./views/BiographyDetails')
const CategoriesAdmin = () => import('./views/CategoriesAdmin')
const BugTracking = () => import('./views/BugTracking')
const CreateBug = () => import('./views/CreateBug')
const EditCategory = () => import('./views/EditCategory')
const EditBiography = () => import('./views/EditBiographyDetails')
const CreateBiographyDetails = () => import('./views/CreateBiographyDetails')
const CreatedByMeBiographies = () => import('./views/CreatedByMeBiographiesList')
const BiographiesModeration = () => import('./views/BiographiesModerationsList')
const BiographyFixesList = () => import('./views/BiographiesFixesList')
const Privacy = () => import('./views/Privacy')
const Statistics = () => import('./views/Statistics')
const OAuthCallback = () => import('./views/OAuthCallback')
const UsersList = () => import('./views/UsersList')
const Profile = () => import('./views/Profile')
const ProfileSettings = () => import('./views/Settings')
const ChangeEmail = () => import('./views/ChangeEmail')
const About = () => import('./views/About')
const CategoriesList = () => import('./views/CategoriesList')
const SignIn = () => import('./views/SignInView')
const SignUp = () => import('./views/SignUpView')
const ConfirmSignUp = () => import('./views/ConfirmSignUp')

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

const cancelRoute = function (from, next) {
  if (from.name && from.name !== 'signUpConfirm') {
    next(false)
  } else {
    next('/biographies')
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
      cancelRoute(from, next)
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
  mode: process.env.CORDOVA_PLATFORM ? 'hash' : 'history',
  routes: [
    {
      path: '/about',
      name: 'about',
      component: About
    },
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
      name: 'main',
      component: BiographiesList
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
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/signUp/confirm',
      name: 'signUpConfirm',
      component: ConfirmSignUp,
      beforeEnter: function (to, from, next) {
        store.dispatch(GET_CONFIRMATION)
          .then(
            () => {
              if (store.getters.isConfirmation) {
                next()
              } else {
                cancelRoute(from, next)
              }
            },
            e => {
              cancelRoute(from, next)
            }
          )
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
