import authService from '../../services/auth-service'
import { RESPONSE_TYPE } from './social'

function getRedirectUri (providerId) {
  return window.location.origin + '/' + providerId + '/callback'
}

function auth (provider) {
  let responseType = RESPONSE_TYPE.AUTHORIZATION_CODE
  let redirectUri = getRedirectUri(provider)

  authService.getOauthUrl(provider, responseType, redirectUri)
    .then(
      response => {
        window.location.href = response.data
      }
    )
}

function processRequest (request) {}

export default {
  auth,
  processRequest,
  getRedirectUri
}
