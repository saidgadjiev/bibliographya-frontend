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

function deleteComment (biographyId, commentId) {
  return axios.delete(process.env.REST_SERVER + 'biographies/' + biographyId + '/comments/' + commentId)
}

function addComment (biographyId, commentForm, params) {
  let comment = {
    content: commentForm.content,
    parentId: commentForm.parentId,
    firstName: commentForm.firstName,
    lastName: commentForm.lastName,
    replyToFirstName: commentForm.replyToFirstName,
    replyToUserName: commentForm.replyToUserName
  }

  return axios.post(process.env.REST_SERVER + 'biographies/' + biographyId + '/comments' + (params ? '?' + params : ''), comment)
}

function getComments (biographyId, limit, offset, params) {
  return axios.get(process.env.REST_SERVER + 'biographies/' + biographyId + '/comments?limit=' + limit + '&offset=' + offset + (params ? '&' + params : ''))
}
