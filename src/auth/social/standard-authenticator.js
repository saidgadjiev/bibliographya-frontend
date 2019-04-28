import authService from '../../services/auth-service'
import { RESPONSE_TYPE } from './social'
import { TOKEN_NAME } from '../../config'
import store from '../../store/store'

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

function processRequest (request) {
  let token = store.getters.getToken

  if (token) {
    request.headers.common[TOKEN_NAME] = store.getters.getToken
  }
}

export default {
  auth,
  processRequest,
  getRedirectUri
}
