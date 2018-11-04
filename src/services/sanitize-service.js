export default {
  sanitize
}

const DOMPurify = require('dompurify')

function sanitize (html) {
  return DOMPurify.sanitize(
    html,
    { ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ol', 'li', 'ul', 'l', 'll', 'hr', 'p'] })
}
