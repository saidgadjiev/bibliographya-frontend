export default {
  sanitize
}

const DOMPurify = require('dompurify')

function sanitize (html) {
  return DOMPurify.sanitize(html, { ALLOWED_TAGS: ['h1', 'l'] })
}
