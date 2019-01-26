import { getRestUrl } from '../config'

const axios = require('axios')

export default {
  getComments,
  addComment,
  updateContent,
  deleteComment
}

function updateContent (commentId, content) {
  return axios.put(getRestUrl('comments/' + commentId), {
    content: content
  })
}

function deleteComment (biographyId, commentId) {
  return axios.delete(getRestUrl('biographies/' + biographyId + '/comments/' + commentId))
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

  return axios.post(getRestUrl('biographies/' + biographyId + '/comments') + (params ? '?' + params : ''), comment)
}

function getComments (biographyId, limit, offset, sort) {
  return axios.get(getRestUrl('biographies/' + biographyId + '/comments') + '?limit=' + limit + '&offset=' + offset + (sort ? '&' + sort : ''))
}
