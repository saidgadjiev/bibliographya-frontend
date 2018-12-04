export default {
  getUrl
}

function getUrl (path) {
  return process.env.REST_SERVER + 'api/file/' + path
}
