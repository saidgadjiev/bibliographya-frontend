export const VK_BLANK_REFDIRECT_URI = 'https://oauth.vk.com/blank.html'

export const getRedirectUri = (providerId) => {


  return window.location.origin + '/' + providerId + '/callback'
}
