import biographyCategoryService from './biography-category-service'
import Cache from '../assets/js/cache/timed-cache'

const getCategoryCache = new Cache({
  defaultTtl: 1000 * 60 * 60
})

const getCategoriesCache = new Cache({
  defaultTtl: 1000 * 60 * 60
})

const getBiographiesCache = new Cache({
  defaultTtl: 1000 * 60 * 60
})

export default {
  getCategories,
  getCategory,
  getBiographies,
  remove,
  edit,
  create
}

function getCategory (categoryId) {
  if (!navigator.onLine) {
    if (getCategoryCache.has(categoryId)) {
      return Promise.resolve(getCategoryCache.get(categoryId))
    }
  }

  return new Promise((resolve, reject) => {
    biographyCategoryService.getCategory(categoryId)
      .then(
        response => {
          getCategoryCache.put(categoryId, response)
          resolve(response)
        },
        e => {
          reject(e)
        }
      )
  })
}

function getCategories (limit, offset) {
  let key = JSON.stringify(arguments)

  if (!navigator.onLine) {
    if (getCategoriesCache.has(key)) {
      return Promise.resolve(getCategoriesCache.get(key))
    }
  }

  return new Promise((resolve, reject) => {
    biographyCategoryService.getCategories(limit, offset)
      .then(
        response => {
          getCategoriesCache.put(key, response)
          resolve(response)
        },
        e => {
          reject(e)
        }
      )
  })
}

function getBiographies (cancelToken, categoryId, limit, offset, autobiographies, biographyClampSize, search, sort) {
  let key = JSON.stringify(Array.from(arguments).splice(1))

  if (!navigator.onLine) {
    if (getBiographiesCache.has(key)) {
      return Promise.resolve(getBiographiesCache.get(key))
    }
  }

  return new Promise((resolve, reject) => {
    biographyCategoryService.getBiographies(cancelToken, categoryId, limit, offset, autobiographies, biographyClampSize, search, sort)
      .then(
        response => {
          getBiographiesCache.put(key, response)
          resolve(response)
        },
        e => {
          reject(e)
        }
      )
  })
}

function remove (categoryId) {
  getCategoriesCache.remove(categoryId)

  return biographyCategoryService.remove(categoryId)
}

function edit (id, category) {
  getCategoriesCache.remove(id)

  return biographyCategoryService.edit(id, category)
}

function create (category) {
  return biographyCategoryService.create(category)
}
