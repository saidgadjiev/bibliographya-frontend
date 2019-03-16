import { getRestUrl } from '../rest'

const axios = require('axios')

export default {
  getReports,
  createReport
}

function getReports (limit, offset) {
  return axios.get(getRestUrl('biography/report') + '?limit=' + limit + '&offset=' + offset)
}

function createReport (biographyId, report) {
  return axios.post(getRestUrl('biography/report/create/' + biographyId), report)
}
