<script>
import { BIOGRAPHY_CARD_MODE } from '../../../config'
import utils from '../../../utils'

export default {
  name: 'Toc',
  inheritAttrs: false,
  data () {
    return {
      treeClamped: true,
      toc: '',
      clampedToc: '',
      options: {
        duration: 300,
        offset: 0,
        easing: 'easeInOutCubic'
      }
    }
  },
  props: {
    headers: {
      type: Array,
      default: function () {
        return []
      }
    },
    id: {
      type: Number
    },
    mode: {
      type: String,
      default: BIOGRAPHY_CARD_MODE.LIST
    },
    treeClamp: {
      type: Boolean,
      default: false
    },
    treeClampSize: {
      type: Number
    }
  },
  methods: {
    getMinLevel (headers) {
      let i
      let minLevel = 9

      for (i = 0; i < headers.length; i++) {
        if (headers[i].level < minLevel) {
          minLevel = headers[i].level
        }
        if (minLevel === 1) {
          return minLevel
        }
      }

      return minLevel
    }
  },
  computed: {
    _hasClamp () {
      return this.treeClamp && this.headers.length > this.treeClampSize
    },
    _clamped () {
      if (this.treeClamped) {
        return true
      }

      return false
    }
  },
  render (createElement) {
    let that = this

    function renderTemplate () {
      let elements = []

      if (that._hasClamp) {
        let div = createElement('div', {}, [])

        elements.push(div)

        if (that._clamped) {
          div.children.push(createElement('div', {}, [
            createElement('a', {
              class: {
                'body-2': true,
                'font-weight-medium': true
              },
              on: {
                click (e) {
                  that.treeClamped = false
                }
              }
            }, 'Показать содержание...')
          ]))
        } else {
          div.children.push(createElement('div', {}, [
            createElement('a', {
              class: {
                'body-2': true,
                'font-weight-medium': true
              },
              on: {
                click (e) {
                  that.treeClamped = true
                }
              }
            }, 'Скрыть содержание')
          ]))
        }
      }

      return elements
    }

    function renderToc () {
      let headers = that.headers

      if (!headers.length) {
        return
      }

      if (that._clamped && headers.length > that.treeClampSize) {
        headers = headers.slice(0, that.treeClampSize)
      }
      let i, h
      let prevLevel = that.getMinLevel(headers) - 1
      let html = []
      let liElementStack = []
      let olElementStack = []
      let levelStack = []

      for (i = 0; i < headers.length; i++) {
        h = headers[i]
        if (that.mode === BIOGRAPHY_CARD_MODE.READ) {
          h.element.setAttribute('id', h.id)
        }

        if (prevLevel === h.level) {
          let liElement = createElement('li', {}, [])

          let peek = olElementStack[olElementStack.length - 1]

          peek.children.push(liElement)
          liElementStack.push(liElement)
          levelStack.push(h.level)
        } else if (prevLevel < h.level) {
          let olElement = createElement('ol', {}, [])
          let liElement = createElement('li', {}, [])

          olElement.children.push(liElement)

          if (html.length === 0) {
            html.push(olElement)
          }

          if (liElementStack.length > 0) {
            let peek = liElementStack[liElementStack.length - 1]

            peek.children.push(olElement)
          }

          liElementStack.push(liElement)
          olElementStack.push(olElement)
          levelStack.push(h.level)
        } else if (prevLevel > h.level) {
          let currentPeekLevel = levelStack[levelStack.length - 1]
          let prevPeekLevel = currentPeekLevel

          while (currentPeekLevel >= h.level && levelStack.length > 0) {
            levelStack.pop()
            liElementStack.pop()
            if (prevPeekLevel > currentPeekLevel) {
              olElementStack.pop()
            }

            prevPeekLevel = currentPeekLevel
            currentPeekLevel = levelStack[levelStack.length - 1]
          }

          let liElement = createElement('li', {}, [])

          let peekOl = olElementStack[olElementStack.length - 1]

          peekOl.children.push(liElement)
          liElementStack.push(liElement)
          levelStack.push(h.level)
        }

        let peek = liElementStack[liElementStack.length - 1]
        let id = h.id

        if (that.mode === BIOGRAPHY_CARD_MODE.READ) {
          peek.children.push(createElement('a', {
            class: {
              'bib-a': true
            },
            on: {
              click (e) {
                utils.scrollIt(document.getElementById(id), 300, 'easeOutQuad', () => {})
              }
            }
          }, h.title))
        } else {
          peek.children.push(createElement('router-link', {
            class: {
              'bib-a': true
            },
            attrs: {
              to: '/biographies/' + that.id + '#' + id
            }
          }, h.title))
        }

        prevLevel = h.level
      }

      return html
    }

    return createElement('div', {}, [
      createElement('div', {
        class: {
          'toc': true,
          'word-break-word': true
        }
      }, renderToc()),
      renderTemplate()
    ])
  }
}
</script>

<style scoped>
  .toc {
    font-size: 15px;
  }

  .toc >>> ol:first-child {
    padding-left: 0 !important;
  }

  .toc >>> ol {
    counter-reset: item
  }

  .toc >>> li {
    display: block
  }

  .toc >>> li:before {
    content: counters(item, ".") " ";
    counter-increment: item
  }
</style>
