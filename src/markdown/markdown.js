import MarkdownIt from 'markdown-it'
import subscript from 'markdown-it-sub'
import superscript from 'markdown-it-sup'
import footnote from 'markdown-it-footnote'
import deflist from 'markdown-it-deflist'
import abbreviation from 'markdown-it-abbr'
import insert from 'markdown-it-ins'
import toc from 'markdown-it-toc-and-anchor'
import mark from 'markdown-it-mark'
import sanitizer from 'markdown-it-sanitizer'

export default {
  markdownIt,
  tableOfContent,
  markdownItWithToc
}

function markdownIt (source) {
  let instance = new MarkdownIt()
    .use(sanitizer)
    .use(subscript)
    .use(superscript)
    .use(footnote)
    .use(deflist)
    .use(abbreviation)
    .use(insert)
    .use(mark)

  return instance.render(source)
}

function tableOfContent (source) {
  let tocTree = []

  let instance = new MarkdownIt()
    .use(sanitizer)
    .use(toc, {
      toc: false,
      tocCallback: (tocMarkdown, tocArray, tocHtml) => {
        if (tocHtml) {
          tocTree = getToc(tocArray)
        }
      }
    })

  instance.render(source)

  return tocTree
}

function markdownItWithToc (source, tree, resetIds) {
  let md = new MarkdownIt()
    .use(sanitizer)
    .use(subscript)
    .use(superscript)
    .use(footnote)
    .use(deflist)
    .use(abbreviation)
    .use(insert)
    .use(mark)
    .use(toc, {
      resetIds: resetIds || true,
      tocCallback: (tocMarkdown, tocArray, tocHtml) => {
        if (tocHtml) {
          tree.push(...getToc(tocArray))
        }
      }
    })
  md.renderer.rules.table_open = () => `<table class="v-datatable v-table theme--light">\n`

  return md.render(source)
}

function getToc (tocArray) {
  let tocTree = []
  let stack = []

  tocArray.forEach(function (element) {
    let level = element.level
    let text = element.content

    let node = {
      id: element.anchor,
      level: level,
      name: text,
      children: []
    }

    if (level === 1) {
      tocTree.push(node)
      stack.push(node)
    } else {
      let peek = stack[stack.length - 1]

      while (peek.level >= level) {
        stack.pop()
        peek = stack[stack.length - 1]
      }

      peek.children.push(node)
      stack.push(node)
    }
  })

  return tocTree
}
