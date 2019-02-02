<script>
import { BIOGRAPHY_CARD_MODE } from '../../../config'

export default {
  name: 'Toc',
  inheritAttrs: false,
  data () {
    return {
      treeClamped: true,
      toc: '',
      clampedToc: ''
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
                'subheading': true,
                'font-weight-bold': true
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
                'subheading': true,
                'font-weight-bold': true
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

      let i, h
      let prevLevel = that.getMinLevel(headers) - 1
      let html = []
      let elementStack = []

      for (i = 0; i < headers.length; i++) {
        h = headers[i]
        h.element.setAttribute('id', h.id)
        if (prevLevel === h.level) {
          let element = createElement('li')

          html.push(element)
        } else if (prevLevel < h.level) {
          let olElement = createElement('ol', {}, [])
          let liElement = createElement('li', {}, [])

          olElement.children.push(liElement)

          html.push(olElement)
          elementStack.push(liElement)
        }
        let peek = elementStack[elementStack.length - 1]

        if (that.mode === BIOGRAPHY_CARD_MODE.READ) {
          peek.children.push(createElement('router-link', {
            class: {
              'bibliographya-a': true
            },
            attrs: {
              to: '#' + h.id
            }
          }, h.title))
        } else {
          peek.children.push(createElement('router-link', {
            class: {
              'bibliographya-a': true
            },
            attrs: {
              to: '/biography/' + that.id + '#' + h.id
            }
          }, h.title))
        }
      }

      return html
    }

    return createElement('div', {}, [
      createElement('div', {
        class: {
          'toc': true
        }
      }, renderToc()),
      renderTemplate()
    ])
  }
}
</script>

<style scoped>
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
