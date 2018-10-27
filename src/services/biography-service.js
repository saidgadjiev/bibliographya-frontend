import Vue from 'vue'

export default {
  getBiographyByUsername
}

function getBiographyByUsername (username) {
  return Vue.http.get(process.env.REST_SERVER + 'api/biography/' + username)
}
