/**
 * ///////////////////////////////////////
 * //////////// Cache module /////////////
 * ///////////////////////////////////////
 *
 * This module offers object caching mechanisms for
 * third-party modules. It allows to manage the lifecycle
 * of cached objects by associating them with a time-to-live.
 */

/**
 * Exporting the `Cache` module appropriately given
 * the environment (AMD, Node.js and the browser).
 */

  /**
   * We use an object literal ads the
   * internal storage.
   */
  var cache = {};

  /**
   * Shortcut function for checking if an object has
   * a given property directly on itself
   * (in other words, not on a prototype).
   */
  var has = function (obj, key) {
    return (obj !== null && Object.prototype.hasOwnProperty.call(obj, key));
  };

  /**
   * Cache constructor.
   * @param {*} options the `options` object
   * holder used by the cache implementation.
   */
  var Cache = function (options) {
    // The default cached objects expiration
    // delay is expressed in milliseconds and
    // is defined by an internal default value
    // or a user value if it is passed to the
    // constructor.
    this.defaultTtl = (options && options.defaultTtl) ?
      options.defaultTtl : 60 * 1000;
    // A prefix used to forbid access to internal properties
    // of the object storage.
    this.prefix = '__cache__';
    var self = this;

    setInterval(function () {
      self.clear()
    }, this.defaultTtl)
  };

  /**
   * Puts a key/value pair into the cache storage.
   */
  Cache.prototype.put = function (key, value, options) {
    var callback = (options ? options.callback : undefined) || function () {};
    var key_ = key;

    cache[key_] = { data: value, callback: callback };
  };

  /**
   * Returns a cached value associated with the
   * given key if it exists, returns an undefined
   * value otherwise.
   */
  Cache.prototype.get = function (key) {
    var value = cache[key];
    return (value && value.data);
  }

  /**
   * Clears the cache entry associated
   * with the given `key`.
   */
  Cache.prototype.remove = function (key) {
    var key_  = key;
    var value = cache[key_];

    if (value) {
      delete cache[key_];
      value.callback(key, value.data);
    }
  };

  /**
   * Clears the internal cache.
   */
  Cache.prototype.clear = function () {
    cache = {};
  };

  /**
   * Returns the size of the cache object in
   * terms of referenced elements.
   */
  Cache.prototype.size = function () {
    return Object.keys(cache).length;
  };

  export default Cache
