import utils from '../utils'
import MarkdownIt from 'markdown-it'
import sub from 'markdown-it-sub'
import sup from 'markdown-it-sup'
import footnote from 'markdown-it-footnote'
import deflist from 'markdown-it-deflist'
import abbr from 'markdown-it-abbr'
import insert from 'markdown-it-ins'
import toc from 'markdown-it-toc-and-anchor'
import mark from 'markdown-it-mark'
import container from 'markdown-it-container'

let markdownConfig = {
  html: true, // Enable HTML tags in source
  xhtmlOut: true, // Use '/' to close single tags (<br />).
  breaks: true, // Convert '\n' in paragraphs into <br>
  langPrefix: 'lang-', // CSS language prefix for fenced blocks. Can be
  linkify: true, // 自动识别url
  typographer: true,
  quotes: '“”‘’'
}
let markdown = new MarkdownIt(markdownConfig)

// add target="_blank" to all link
let defaultRender = markdown.renderer.rules.link_open || function (tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options)
}
markdown.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  // If you are sure other plugins can't add `target` - drop check below
  if (tokens[idx].attrIndex) {
    let aIndex = tokens[idx].attrIndex('target')

    if (aIndex < 0) {
      tokens[idx].attrPush(['target', '_blank']) // add new attribute
    } else {
      tokens[idx].attrs[aIndex][1] = '_blank' // replace value of existing attr
    }
  }

  // pass token to default renderer.
  return defaultRender(tokens, idx, options, env, self)
}

markdown.renderer.rules.table_open = () => `<table class="v-datatable v-table theme--light">\n`

markdown.use(sup)
  .use(sub)
  .use(container)
  .use(container, 'hljs-left') /* align left */
  .use(container, 'hljs-center')/* align center */
  .use(container, 'hljs-right')/* align right */
  .use(deflist)
  .use(abbr)
  .use(footnote)
  .use(insert)
  .use(mark)
  .use(toc)

export default {
  data () {
    return {
      markdownIt: markdown
    }
  },
  methods: {
    $render (src, func) {
      let tocTree = []

      let res = markdown.render(src, {
        tocCallback: function (tocMarkdown, tocArray, tocHtml) {
          if (tocHtml) {
            tocTree.push(...utils.createToc(tocArray))
          }
        }
      })

      func(res, tocTree)
    }
  }
}
