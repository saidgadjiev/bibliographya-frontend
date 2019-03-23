import { getRestUrl } from '../rest'

const axios = require('axios')

export default {
  getCategories,
  getCategory,
  getBiographies,
  remove,
  edit,
  create
}

function getCategory (categoryId) {
  return axios.get(getRestUrl('categories/') + categoryId)
}

function getCategories (limit, offset) {
  return axios.get(getRestUrl('categories') + '?limit=' + limit + '&offset=' + offset)
}

function getBiographies (cancelToken, categoryId, limit, offset, biographyClampSize, query, sort) {
  let parameters = 'limit=' + limit + '&offset=' + offset

  if (query) {
    parameters += '&' + query
  }

  if (biographyClampSize) {
    parameters += '&biographyClampSize=' + biographyClampSize
  }

  if (sort) {
    parameters += '&' + sort
  }

  return axios.get(getRestUrl('categories/' + categoryId + '/biographies') + '?' + parameters, {
    cancelToken: cancelToken
  })
}

function remove (categoryId) {
  return axios.delete(getRestUrl('categories/' + categoryId))
}

function edit (id, category) {
  return axios({
    method: 'put',
    data: category,
    url: getRestUrl('categories/' + id),
    config: { headers: { 'Content-Type': 'multipart/form-data' } }
  })
}

function create (category) {
  return axios({
    method: 'post',
    data: category,
    url: getRestUrl('categories'),
    config: { headers: { 'Content-Type': 'multipart/form-data' } }
  })
}
