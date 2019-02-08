export const ROLES = {
  ALL: '*',
  ROLE_ADMIN: 'ROLE_ADMIN',
  ROLE_USER: 'ROLE_USER',
  ROLE_MODERATOR: 'ROLE_MODERATOR',
  ROLE_DEVELOPER: 'ROLE_DEVELOPER'
}

export const BUG_STATUS = {
  PENDING: 0,
  CLOSED: 1,
  IGNORED: 2
}

export const MODERATION_STATUS = {
  PENDING: 0,
  APPROVED: 1,
  REJECTED: 2
}

export const FIX_STATUS = {
  PENDING: 0,
  CLOSED: 1
}

export const PUBLISH_STATUS = {
  PUBLISHED: 1,
  NOT_PUBLISHED: 0
}

export const REPORT_STATUS = {
  NEW: 0,
  CONSIDERED: 1
}

export const REPORT_REASON = {
  SPAM: 0,
  CLONE: 1,
  ANOTHER: 2
}

export const PLUGIN_EVENTS = {
  ALERT: 'alert'
}

export const getRestUrl = (url) => `${process.env.VUE_APP_REST_SERVER}${url}`

export const isAccountRequest = (url) => url.endsWith('auth/account')

export const getRedirectUri = (providerId) => {
  return window.location.origin + '/' + providerId + '/callback'
}

export const BIOGRAPHY_CLAMP_SIZE = 150

export const TREE_CLAMP_SIZE = 5

export const BIOGRAPHY_CARD_MODE = {
  READ: 'read',
  LIST: 'list'
}

export const PROVIDERS = {
  VK: 'Вконтакте',
  FACEBOOK: 'Фейсбук',
  USERNAME_PASSWORD: 'Логин и пароль'
}

export default {
  ROLES
}
