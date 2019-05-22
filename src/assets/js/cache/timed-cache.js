let Cache = function (options) {
  this.defaultTtl = (options && options.defaultTtl) ?
    options.defaultTtl : 60 * 1000
  this.cache = {}

  let self = this

  setInterval(function () {
    self.clear()
  }, this.defaultTtl)
}

Cache.prototype.put = function (key, value, options) {
  let callback = (options ? options.callback : undefined) || function () {
  }

  this.cache[key] = { data: value, callback: callback }
}

Cache.prototype.get = function (key) {
  let value = this.cache[key]

  return (value && value.data)
}

Cache.prototype.remove = function (key) {
  let value = this.cache[key]

  if (value) {
    delete this.cache[key]
    value.callback(key, value.data)
  }
}

Cache.prototype.clear = function () {
  this.cache = {}
}

Cache.prototype.size = function () {
  return Object.keys(this.cache).length
}

export default Cache
