import { getRestUrl } from '../rest'

const axios = require('axios')

export default {
  create,
  getList
}

function create (feedback) {
  return axios.post(getRestUrl('feedback'), feedback)
}

function getList (limit, offset) {
  return axios.get(getRestUrl('feedback') + '?limit=' + limit + '&offset=' + offset)
}
