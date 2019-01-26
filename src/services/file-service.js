import { getRestUrl } from '../config'

export default {
  getUrl
}

function getUrl (path) {
  return getRestUrl('files/' + path)
}
