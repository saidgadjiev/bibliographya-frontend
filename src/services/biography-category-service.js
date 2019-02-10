import { getRestUrl } from '../config'

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

function getBiographies (cancelToken, categoryId, limit, offset, query) {
  return axios.get(getRestUrl('categories/' + categoryId + '/biographies') + '?limit=' + limit + '&offset=' + offset + (query ? '&' + query : ''), {
    cancelToken: cancelToken
  })
}

function remove (categoryId) {
  return axios.delete(getRestUrl('categories/' + categoryId))
}

function edit (id, category) {
  return axios.put(getRestUrl('categories/' + id), category)
}

function create (category) {
  return axios.post(getRestUrl('categories'), category)
}
