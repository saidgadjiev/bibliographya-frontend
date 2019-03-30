import { isMobilePlatform } from './config'

export const getRestUrl = (url) => {
  if (isMobilePlatform()) {
    return `${process.env.VUE_APP_ANDROID_REST_SERVER + process.env.VUE_APP_REST_BASE_URL}${url}`
  }

  return `${process.env.VUE_APP_REST_SERVER + process.env.VUE_APP_REST_BASE_URL}${url}`
}

export const getUploadUrl = (url) => {
  if (isMobilePlatform()) {
    return `${process.env.VUE_APP_ANDROID_REST_SERVER}${url}`
  }

  return `${process.env.VUE_APP_REST_SERVER}${url}`
}

export const DEFAULT_IMG_PATH = '404.jpg'
