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
  return axios.get(process.env.REST_SERVER + 'biographies/' + (filter ? '?' + filter : ''))
}

function getBiographyById (id) {
  return axios.get(process.env.REST_SERVER + 'biographies/' + id)
}

function getBiographies (cancelToken, limit, offset, query) {
  return axios.get(process.env.REST_SERVER + 'biographies?limit=' + limit + '&offset=' + offset + (query ? '&' + query : ''), {
    cancelToken: cancelToken
  })
}

function getMyBiographies (limit, offset) {
  return axios.get(process.env.REST_SERVER + 'biographies/my?limit=' + limit + '&offset=' + offset)
}

function update (biography) {
  return axios.put(process.env.REST_SERVER + 'biographies/' + biography.id, biography)
}

function create (biography) {
  return axios.post(process.env.REST_SERVER + 'biographies/', biography)
}

function publish (biographyId) {
  return axios.post(process.env.REST_SERVER + 'biographies/' + biographyId + '/publish')
}

function unpublish (biographyId) {
  return axios.post(process.env.REST_SERVER + 'biographies/' + biographyId + '/unpublish')
}

function deleteBiography (biographyId) {
  return axios.delete(process.env.REST_SERVER + 'biographies/' + biographyId)
}

function canEdit (biographyId) {
  return axios.head(process.env.REST_SERVER + 'biographies/' + biographyId)
}
