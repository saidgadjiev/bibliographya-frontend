import biographyService from './biography-service'

const LRU = require('lru-cache')
const getBiographiesCache = new LRU({
  max: 0,
  maxAge: 1000 * 60 * 60
})

const getBiographyByIdCache = new LRU({
  max: 0,
  maxAge: 1000 * 60 * 60
})

export default {
  getBiographyById,
  getBiographies,
  getMyBiographies,
  update,
  create,
  publish,
  unPublish,
  deleteBiography,
  canEdit,
  disableComments,
  anonymousCreator
}

function getBiographyById (id) {
  if (!navigator.onLine) {
    if (getBiographyByIdCache.has(id)) {
      return Promise.resolve(getBiographyByIdCache.get(id))
    }
  }

  return new Promise((resolve, reject) => {
    biographyService.getBiographyById(id)
      .then(
        response => {
          getBiographyByIdCache.set(id, response)
          resolve(response)
        },
        e => {
          reject(e)
        }
      )
  })
}

function getBiographies (cancelToken, limit, offset, autobiographies, biographyClampSize, search, sort) {
  if (sort) {
    return biographyService.getBiographies(cancelToken, limit, offset, autobiographies, biographyClampSize, search, sort)
  }
  let key = JSON.stringify(Array.from(arguments).splice(1))

  if (!navigator.onLine) {
    if (getBiographiesCache.has(key)) {
      return Promise.resolve(getBiographiesCache.get(key))
    }
  }

  return new Promise((resolve, reject) => {
    biographyService.getBiographies(cancelToken, limit, offset, autobiographies, biographyClampSize, search, sort)
      .then(
        response => {
          getBiographiesCache.set(key, response)
          resolve(response)
        },
        e => {
          reject(e)
        }
      )
  })
}

function getMyBiographies (limit, offset, biographyClampSize, sort) {
  return biographyService.getMyBiographies(limit, offset, biographyClampSize, sort)
}

function update (biography) {
  return biographyService.update(biography)
}

function create (biography) {
  return biographyService.create(biography)
}

function publish (biographyId) {
  return biographyService.publish(biographyId)
}

function unPublish (biographyId) {
  return biographyService.unPublish(biographyId)
}

function deleteBiography (biographyId) {
  getBiographiesCache.del(biographyId)

  return biographyService.deleteBiography(biographyId)
}

function canEdit (biographyId) {
  return biographyService.canEdit(biographyId)
}

function disableComments (id, disableComments) {
  return biographyService.disableComments(id, disableComments)
}

function anonymousCreator (id, anonymousCreator, returnFields) {
  return biographyService.anonymousCreator(id, anonymousCreator, returnFields)
}
