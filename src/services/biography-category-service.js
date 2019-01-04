const axios = require('axios')

export default {
  getCategories,
  getCategory,
  getBiographies
}

function getCategory (categoryName) {
  return axios.get(process.env.REST_SERVER + 'categories/' + categoryName)
}

function getCategories (limit, offset) {
  return axios.get(process.env.REST_SERVER + 'categories?limit=' + limit + '&offset=' + offset)
}

function getBiographies (categoryName, limit, offset) {
  return axios.get(process.env.REST_SERVER + 'categories/' + categoryName + '/biographies?limit=' + limit + '&offset=' + offset)
}
