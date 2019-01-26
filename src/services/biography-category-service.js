import { getRestUrl } from '../config'

const axios = require('axios')

export default {
  getCategories,
  getCategory,
  getBiographies
}

function getCategory (categoryName) {
  return axios.get(getRestUrl('categories/') + categoryName)
}

function getCategories (limit, offset) {
  return axios.get(getRestUrl('categories') + '?limit=' + limit + '&offset=' + offset)
}

function getBiographies (cancelToken, categoryName, limit, offset, query) {
  return axios.get(getRestUrl('categories/' + categoryName + '/biographies') + '?limit=' + limit + '&offset=' + offset + (query ? '&' + query : ''), {
    cancelToken: cancelToken
  })
}
