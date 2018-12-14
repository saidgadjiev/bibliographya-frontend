const axios = require('axios')

export default {
  getCategories,
  getCategory
}

function getCategory (categoryName) {
  return axios.get(process.env.REST_SERVER + 'api/biography/category/' + categoryName)
}

function getCategories (limit, offset) {
  return axios.get(process.env.REST_SERVER + 'api/biography/category?limit=' + limit + '&offset=' + offset)
}
