import authService from '../../services/auth-service'
import { RESPONSE_TYPE } from './social'
import store from '../../store/store'
import { CLEAR, SET_REQUEST } from '../../store/action-types'
import { REQUEST } from '../../config'

function getSignInRedirectUri (providerId) {
  return window.location.origin + '/signIn/' + providerId + '/callback'
}

function getSignUpRedirectUri (providerId) {
  return window.location.origin + '/signUp/' + providerId + '/callback'
}

function signUp (provider) {
  let responseType = RESPONSE_TYPE.AUTHORIZATION_CODE
  let redirectUri = getSignUpRedirectUri(provider)

  store.dispatch('request/' + SET_REQUEST, REQUEST.OAUTH_REQUEST)

  authService.getOauthUrl(provider, responseType, redirectUri)
    .then(
      response => {
        window.location.href = response.data
      }
    )
    .finally(() => {
      store.dispatch('request/' + CLEAR)
    })
}

function signIn (provider) {
  let responseType = RESPONSE_TYPE.AUTHORIZATION_CODE
  let redirectUri = getSignInRedirectUri(provider, signUp)

  store.dispatch('request/' + SET_REQUEST, REQUEST.OAUTH_REQUEST)
  authService.getOauthUrl(provider, responseType, redirectUri)
    .then(
      response => {
        window.location.href = response.data
      }
    )
    .finally(() => {
      store.dispatch('request/' + CLEAR)
    })
}

export default {
  signUp,
  signIn,
  getSignInRedirectUri,
  getSignUpRedirectUri
}
