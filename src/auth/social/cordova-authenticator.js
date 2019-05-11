import authService from '../../services/auth-service'
import { RESPONSE_TYPE, VK_BLANK_REFDIRECT_URI } from './social'
import { PROVIDERS } from '../auth'
import { CLEAR, SET_REQUEST } from '../../store/action-types'
import { REQUEST } from '../../config'
import store from '../../store/store'
import router from '../../router'

const Url = require('url-parse')

function getSignInRedirectUri (providerId) {
  switch (providerId) {
    case PROVIDERS.VK:
      return VK_BLANK_REFDIRECT_URI
  }

  return null
}

function getSignUpRedirectUri (providerId) {
  switch (providerId) {
    case PROVIDERS.VK:
      return VK_BLANK_REFDIRECT_URI
  }

  return null
}

function signUp (provider) {
  let responseType = RESPONSE_TYPE.AUTHORIZATION_CODE
  let redirectUri = getSignUpRedirectUri(provider)

  store.dispatch('request/' + SET_REQUEST, REQUEST.OAUTH_REQUEST)
  authService.getOauthUrl(provider, responseType, redirectUri)
    .then(
      response => {
        let browser = window.cordova.InAppBrowser.open(response.data, '_blank', 'location=yes')

        browser.addEventListener('loadstart', function (evt) {
          if (evt.url.indexOf(redirectUri) === 0) {
            let redirectUrl = new Url(evt.url)
            let hash = redirectUrl.hash
            let codeIndexOf = hash.indexOf('code=')
            let code = hash.substring(codeIndexOf + 5)
            let oauthCallback = '/signUp/' + provider + '/callback?code=' + code

            console.log(oauthCallback)

            browser.close()
            router.push(oauthCallback)
          }
        })

        browser.addEventListener('loaderror', function (err) {
          console.log('error ' + err)
          // TODO: handle this of course!
        })
      }
    ).finally(() => {
      store.dispatch('request/' + CLEAR)
    })
}

function signIn (provider) {
  let responseType = RESPONSE_TYPE.AUTHORIZATION_CODE
  let redirectUri = getSignUpRedirectUri(provider)

  store.dispatch('request/' + SET_REQUEST, REQUEST.OAUTH_REQUEST)
  authService.getOauthUrl(provider, responseType, redirectUri)
    .then(
      response => {
        let browser = window.cordova.InAppBrowser.open(response.data, '_blank', 'location=yes')

        browser.addEventListener('loadstart', function (evt) {
          if (evt.url.indexOf(redirectUri) === 0) {
            let redirectUrl = new Url(evt.url)
            let hash = redirectUrl.hash
            let codeIndexOf = hash.indexOf('code=')
            let code = hash.substring(codeIndexOf + 5)
            let oauthCallback = '/signIn/' + provider + '/callback?code=' + code

            console.log(oauthCallback)

            browser.close()
            router.push(oauthCallback)
          }
        })

        browser.addEventListener('loaderror', function (err) {
          console.log('error ' + err)
          // TODO: handle this of course!
        })
      }
    ).finally(() => {
      store.dispatch('request/' + CLEAR)
    })
}

export default {
  signUp,
  signIn,
  getSignInRedirectUri,
  getSignUpRedirectUri
}
