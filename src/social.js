export const VK_BLANK_REFDIRECT_URI = 'https://oauth.vk.com/blank.html'

export const RESPONSE_TYPE = {
  AUTHORIZATION_CODE: 'code',
  IMPLICIT_GRANT: 'token'
}

export const getRedirectUri = (providerId) => {
  if (process.env.CORDOVA_PLATFORM) {
    return VK_BLANK_REFDIRECT_URI
  }
  return window.location.origin + '/' + providerId + '/callback'
}
