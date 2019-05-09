import cordovaAuthenticator from './social/cordova-authenticator'
import standardAuthenticator from './social/standard-authenticator'

export const PROVIDERS = {
  SIMPLE: 'simple',
  VK: 'vk',
  FACEBOOK: 'facebook'
}

export const socialAutheticator = process.env.CORDOVA_PLATFORM ? cordovaAuthenticator : standardAuthenticator
