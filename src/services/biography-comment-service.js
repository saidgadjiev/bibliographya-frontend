const axios = require('axios')

export default {
  getComments,
  addComment
}

function addComment (biographyId, commentForm) {
  let comment = {
    content: commentForm.content,
    parentId: commentForm.parentId
  }

  return axios.post(process.env.REST_SERVER + 'api/comment/' + biographyId + '/add', comment)
}

function getComments (biographyId, page) {
  return axios.get(process.env.REST_SERVER + 'api/comment/' + biographyId + '?page=' + page + '&size=' + 50)
}
