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
  return axios.post(getRestUrl('biographies/' + biographyId + '/comments') + (params ? '?' + params : ''), commentForm)
}

function getComments (biographyId, limit, offset, sort) {
  return axios.get(getRestUrl('biographies/' + biographyId + '/comments') + '?limit=' + limit + '&offset=' + offset + (sort ? '&' + sort : ''))
}
