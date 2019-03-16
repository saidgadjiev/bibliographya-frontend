export const getRestUrl = (url) => `${process.env.VUE_APP_REST_SERVER + process.env.VUE_APP_REST_BASE_URL}${url}`

export const getUploadUrl = (url) => `${process.env.VUE_APP_REST_SERVER}${url}`

export const DEFAULT_IMG_PATH = 'upload/404.jpg'
