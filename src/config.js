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
  CONFIRM_SIGN_UP_START: 3,
  RESEND_CODE: 4,
  RESTORE_PASSWORD: 5,
  VERIFY: 6,
  CHANGE_PASSWORD: 7,
  SAVE_PASSWORD: 8,
  CHANGE_EMAIL: 9,
  SAVE_EMAIL: 10,
  LOADING_SETTINGS: 11,
  SIGN_OUT: 12,
  CONFIRM_SIGN_UP_FINISH: 13,
  DISABLE_COMMENTS: 14,
  ANONYMOUS_CREATOR: 15,
  PUBLISH: 16,
  CHANGE_PHONE: 17,
  SAVE_PHONE: 18,
  OAUTH_REQUEST: 19
}

export const TITLE = {
  MAIN: 'Биографии',
  LIBRARY: 'Библиотека',
  BIOGRAPHIES: 'Биографии',
  MY_BIOGRAPHIES: 'Биографии созданные мной',
  CREATE_BIOGRAPHY: 'Новая биография',
  SETTINGS: 'Настройки',
  CREATE_BUG: 'Сообщить об ошибке',
  MODERATION: 'Модерация',
  FIXES: 'Исправления',
  BUG_TRACKING: 'Баг трекинг',
  CATEGORIES: 'Категории',
  USERS: 'Пользователи',
  STATISTIC: 'Статистика',
  REVIEWS: 'Отзывы',
  FEEDBADCK: 'Обратная связь',
  ABOUT: 'О нас',
  SIGN_IN: 'Биографии Вход',
  SIGN_UP: 'Биографии Регистрация'
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
  CLOSED: 1,
  IGNORED: 2
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

export const MODERATION_BUTTON = {
  ASSIGN_ME: 'AssignMe',
  REJECT: 'Reject',
  USER_PENDING: 'UserPending'
}

export const BUG_BUTTONS = {
  ASSIGN_ME: 'AssignMe',
  IGNORE: 'Ignore'
}

export const FIX_BUTTONS = {
  ASSIGN_ME: 'AssignMe',
  IGNORE: 'Ignore'
}

export const BIOGRAPHY_CLAMP_SIZE = 500

export const TREE_CLAMP_SIZE = 4

export const BIOGRAPHY_CARD_MODE = {
  READ: 'read',
  LIST: 'list'
}

export default {
  ROLES
}

export const METRIKA_ID = 52534486

export const TOKEN_NAME = 'x-token'

export const isMobilePlatform = () => process.env.CORDOVA_PLATFORM === 'android' || process.env.CORDOVA_PLATFORM === 'ios'
