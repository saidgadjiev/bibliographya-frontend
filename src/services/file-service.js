import { getRestUrl } from '../rest'

export default {
  getCategoryResourceUrl,
  getShareResourceUrl
}

function getCategoryResourceUrl (path) {
  return window.location.origin + '/upload/category/' + path
}

function getShareResourceUrl (path) {
  return window.location.origin + '/upload/share/' + path
}

export const BIOGRAPHIES_MEDIA_URL = getRestUrl('biographies/media')
