import { getRestUrl } from '../rest'

const axios = require('axios')

export default {
  getBiography,
  getBiographyById,
  getBiographies,
  getMyBiographies,
  update,
  create,
  publish,
  unPublish,
  deleteBiography,
  canEdit,
  disableComments,
  anonymousCreator
}

function getBiography (username, filter) {
  return axios.get(getRestUrl('biographies/') + (filter ? '?' + filter : ''))
}

function getBiographyById (id) {
  return axios.get(getRestUrl('biographies/' + id))
}

function getBiographies (cancelToken, limit, offset, autobiographies, biographyClampSize, search, sort) {
  let parameters = 'limit=' + limit + '&offset=' + offset

  if (autobiographies) {
    parameters += '&autobiographies=true'
  }

  if (biographyClampSize) {
    parameters += '&biographyClampSize=' + biographyClampSize
  }

  if (search) {
    sort += '&sort=first_name,asc&sort=last_name,asc&sort=middle_name,asc'
    parameters += '&query=' + search
  }

  if (sort) {
    parameters += '&' + sort
  }

  return axios.get(getRestUrl('biographies') + '?' + parameters, {
    cancelToken: cancelToken
  })
}

function getMyBiographies (limit, offset, biographyClampSize, sort) {
  let parameters = 'limit=' + limit + '&offset=' + offset

  if (biographyClampSize) {
    parameters += '&biographyClampSize=' + biographyClampSize
  }

  if (sort) {
    parameters += '&' + sort
  }

  return axios.get(getRestUrl('biographies/my') + '?' + parameters)
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

function unPublish (biographyId) {
  return axios.post(getRestUrl('biographies/' + biographyId + '/unpublish'))
}

function deleteBiography (biographyId) {
  return axios.delete(getRestUrl('biographies/' + biographyId))
}

function canEdit (biographyId) {
  return axios.head(getRestUrl('biographies/' + biographyId))
}

function disableComments (id, disableComments) {
  let json = {
    'disableComments': disableComments
  }

  return axios.patch(getRestUrl('biographies/' + id), json)
}

function anonymousCreator (id, anonymousCreator, returnFields) {
  let json = {
    'anonymousCreator': anonymousCreator
  }

  if (returnFields) {
    json.returnFields = returnFields
  }

  return axios.patch(getRestUrl('biographies/' + id), json)
}
