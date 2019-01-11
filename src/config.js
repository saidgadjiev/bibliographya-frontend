const roles = {
  ALL: '*',
  ROLE_ADMIN: 'ROLE_ADMIN',
  ROLE_USER: 'ROLE_USER'
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
  PUBLISHED: 0,
  NOT_PUBLISHED: 1
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

export default {
  roles
}
