const axios = require('axios')

export default {
  getComments,
  addComment,
  updateContent,
  deleteComment
}

function updateContent (commentId, content) {
  return axios.post(process.env.REST_SERVER + 'api/comment/update/' + commentId, {
    content: content
  })
}

function deleteComment (commentId) {
  return axios.delete(process.env.REST_SERVER + 'api/comment/delete/' + commentId)
}

function addComment (biographyId, commentForm) {
  let comment = {
    content: commentForm.content,
    parentId: commentForm.parentId,
    firstName: commentForm.firstName,
    lastName: commentForm.lastName,
    replyToFirstName: commentForm.replyToFirstName,
    replyToUserName: commentForm.replyToUserName
  }

  return axios.post(process.env.REST_SERVER + 'api/comment/' + biographyId + '/add', comment)
}

function getComments (biographyId, limit, offset) {
  return axios.get(process.env.REST_SERVER + 'api/comment/' + biographyId + '?limit=' + limit + '&offset=' + offset)
}
