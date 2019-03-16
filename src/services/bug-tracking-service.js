import { getRestUrl } from '../rest'

const axios = require('axios')

export default {
  getBugs,
  getBugsTracking,
  create,
  assignMe,
  complete
}

function getBugs (limit, offset, query) {
  return axios.get(getRestUrl('bugs') + '?limit=' + limit + '&offset=' + offset + (query ? '&query=' + query : ''))
}

function getBugsTracking (limit, offset, query) {
  return axios.get(getRestUrl('bugs/tracking') + '?limit=' + limit + '&offset=' + offset + (query ? '&query=' + query : ''))
}

function assignMe (bugId, json) {
  return axios.patch(getRestUrl('bugs/' + bugId + '/assign-me'), json)
}

function complete (bugId, json) {
  return axios.patch(getRestUrl('bugs/' + bugId + '/complete'), json)
}

function create (bug) {
  return axios.post(getRestUrl('bugs'), bug)
}
