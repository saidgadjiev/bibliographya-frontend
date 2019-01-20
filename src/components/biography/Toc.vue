<template>
  <div>
    <div class="toc" v-html="_toc"></div>
    <template v-if="treeClamp">
      <div v-if="_clamped">
        <a @click="treeClamped = false" class="subheading font-weight-bold">Показать содержание...</a>
      </div>
      <div v-else>
        <a @click="treeClamped = true" class="subheading font-weight-bold">Скрыть содержание</a>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Toc',
  inheritAttrs: false,
  data () {
    return {
      treeClamped: true
    }
  },
  props: {
    headers: {
      type: Array,
      default: function () {
        return []
      }
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
    _clamped () {
      if (this.treeClamped) {
        return true
      }

      return false
    },
    _toc () {
      let headers = this.headers

      if (!headers.length) {
        return
      }

      if (this.treeClamped && headers.length > this.treeClampSize) {
        headers = headers.slice(0, this.treeClampSize)
      }

      let i, h, nextLevel
      let prevLevel = this.getMinLevel(headers) - 1
      let html = ''
      let stack = []

      for (i = 0; i < headers.length; i++) {
        h = headers[i]
        h.element.setAttribute('id', h.id)
        nextLevel = headers[i + 1] && headers[i + 1].level
        if (prevLevel === h.level) {
          html += '<li>'
        } else if (prevLevel < h.level) {
          html += '<ol><li>'
          stack.push(h.level)
        }
        html += '<a class="bibliographya-a" href="#' + h.id + '">' + h.title + '</a>'

        prevLevel = h.level
        if (nextLevel === h.level || !nextLevel) {
          html += '</li>'
          if (!nextLevel) {
            html += '</ol>'
          }
        } else if (h.level > nextLevel) {
          let peek = stack[stack.length - 1]

          while (peek > nextLevel) {
            html += '</li></ol>'
            stack.pop()
            peek = stack[stack.length - 1]
          }
          html += '</li>'
          prevLevel = peek
        }
      }

      return html
    }
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
