import { getRestUrl } from '../rest'

export default {
  getCategoryResourceUrl,
  getShareResourceUrl
}

function getCategoryResourceUrl (path) {
  return window.location.origin + '/upload/category/' + path
}

function getShareResourceUrl (path) {
  return window.location.origin + '/upload/temp/' + path
}

export const BIOGRAPHIES_UPLOAD_URL = window.location.origin + '/upload/biography/'
