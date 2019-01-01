const axios = require('axios')

export default {
  getReports,
  createReport
}

function getReports (limit, offset) {
  return axios.get(process.env.REST_SERVER + 'api/biography/report?limit=' + limit + '&offset=' + offset)
}

function createReport (biographyId, report) {
  return axios.post(process.env.REST_SERVER + 'api/biography/report/create/' + biographyId, report)
}
