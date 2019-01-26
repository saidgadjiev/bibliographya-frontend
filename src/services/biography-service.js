import { getRestUrl } from '../config'

const axios = require('axios')

export default {
  getBiography,
  getBiographyById,
  getBiographies,
  getMyBiographies,
  update,
  create,
  publish,
  unpublish,
  deleteBiography,
  canEdit
}

function getBiography (username, filter) {
  return axios.get(getRestUrl('biographies/') + (filter ? '?' + filter : ''))
}

function getBiographyById (id) {
  return axios.get(getRestUrl('biographies/' + id))
}

function getBiographies (cancelToken, limit, offset, query) {
  return axios.get(getRestUrl('biographies') + '?limit=' + limit + '&offset=' + offset + (query ? '&' + query : ''), {
    cancelToken: cancelToken
  })
}

function getMyBiographies (limit, offset) {
  return axios.get(getRestUrl('biographies/my') + '?limit=' + limit + '&offset=' + offset)
}

function update (biography) {
  return axios.put(getRestUrl('biographies/' + biography.id), biography)
}

function create (biography) {
  return axios.post(getRestUrl('biographies/'), biography)
}

function publish (biographyId) {
  return axios.post(getRestUrl('biographies/' + biographyId + '/publish'))
}

function unpublish (biographyId) {
  return axios.post(getRestUrl('biographies/' + biographyId + '/unpublish'))
}

function deleteBiography (biographyId) {
  return axios.delete(getRestUrl('biographies/' + biographyId))
}

function canEdit (biographyId) {
  return axios.head(getRestUrl('biographies/' + biographyId))
}
