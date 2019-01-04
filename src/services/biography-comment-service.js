const axios = require('axios')

export default {
  getComments,
  addComment,
  updateContent,
  deleteComment
}

function updateContent (commentId, content) {
  return axios.put(process.env.REST_SERVER + 'comments/' + commentId, {
    content: content
  })
}

function deleteComment (commentId) {
  return axios.delete(process.env.REST_SERVER + 'comments/' + commentId)
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

  return axios.post(process.env.REST_SERVER + 'biographies/' + biographyId + '/comments', comment)
}

function getComments (biographyId, limit, offset) {
  return axios.get(process.env.REST_SERVER + 'biographies/' + biographyId + '/comments?limit=' + limit + '&offset=' + offset)
}
