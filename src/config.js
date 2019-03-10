export const ROLES = {
  ALL: '*',
  ROLE_ADMIN: 'ROLE_ADMIN',
  ROLE_USER: 'ROLE_USER',
  ROLE_MODERATOR: 'ROLE_MODERATOR',
  ROLE_DEVELOPER: 'ROLE_DEVELOPER'
}

export const REQUEST = {
  NONE: -1,
  SIGN_IN: 0,
  SIGN_UP: 1,
  GET_ACCOUNT: 2,
  CONFIRM_SIGN_UP: 3,
  RESEND_CODE: 4,
  RESTORE_PASSWORD: 5,
  VERIFY: 6,
  CHANGE_PASSWORD: 7,
  SAVE_PASSWORD: 8,
  CHANGE_EMAIL: 9,
  SAVE_EMAIL: 10,
  LOADING_EMAIL_SETTINGS: 11,
  SIGN_OUT: 12
}

export const LAYOUTS = {
  SIGNED_IN_LAYOUT: 'signed-in-layout',
  AUTH_LAYOUT: 'auth-layout',
  ANONYMOUS_LAYOUT: 'anonymous-layout'
}

export const DATE_FORMAT = 'DD-MM-YYYY HH:mm:ss.SSSSSS'

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

export const MODERATION_BUTTONS = {
  ASSIGN_ME: 'AssignMe',
  REJECT: 'Reject'
}

export const BUG_BUTTONS = {
  ASSIGN_ME: 'AssignMe',
  IGNORE: 'Ignore'
}

export const FIX_BUTTONS = {
  ASSIGN_ME: 'AssignMe',
  IGNORE: 'Ignore'
}

export const getRestUrl = (url) => `${process.env.VUE_APP_REST_SERVER}${url}`

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
