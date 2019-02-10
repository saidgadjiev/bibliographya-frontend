import { getRestUrl } from '../config'

const axios = require('axios')

export default {
  getUrl,
  getCategoryResourceUrl,
  uploadCategoryResource,
  deleteCategoryResource
}

function getUrl (path) {
  return getRestUrl('files/' + path)
}

function getCategoryResourceUrl (path) {
  return getRestUrl('files/category/' + path)
}

function uploadCategoryResource (id, file) {
  let formData = new FormData()

  formData.append('file', file)

  return axios.put(getRestUrl('files/category/' + id),
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
}

function deleteCategoryResource (path) {
  return axios.delete(getRestUrl('files/category/' + path))
}
