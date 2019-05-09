import authService from '../../services/auth-service'
import { RESPONSE_TYPE } from './social'

function getSignInRedirectUri (providerId) {
  return window.location.origin + '/signIn/' + providerId + '/callback'
}

function getSignUpRedirectUri (providerId) {
  return window.location.origin + '/signUp/' + providerId + '/callback'
}

function signUp (provider) {
  let responseType = RESPONSE_TYPE.AUTHORIZATION_CODE
  let redirectUri = getSignUpRedirectUri(provider)

  authService.getOauthUrl(provider, responseType, redirectUri)
    .then(
      response => {
        window.location.href = response.data
      }
    )
}

function signIn (provider) {
  let responseType = RESPONSE_TYPE.AUTHORIZATION_CODE
  let redirectUri = getSignInRedirectUri(provider, signUp)

  authService.getOauthUrl(provider, responseType, redirectUri)
    .then(
      response => {
        window.location.href = response.data
      }
    )
}

export default {
  signUp,
  signIn,
  getSignInRedirectUri,
  getSignUpRedirectUri
}
