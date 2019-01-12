import MarkdownIt from 'markdown-it'
import subscript from 'markdown-it-sub'
import superscript from 'markdown-it-sup'
import footnote from 'markdown-it-footnote'
import deflist from 'markdown-it-deflist'
import abbreviation from 'markdown-it-abbr'
import insert from 'markdown-it-ins'
import toc from 'markdown-it-toc-and-anchor'
import mark from 'markdown-it-mark'

let tocTree = []

const instance = new MarkdownIt()
  .use(subscript)
  .use(superscript)
  .use(footnote)
  .use(deflist)
  .use(abbreviation)
  .use(insert)
  .use(mark)
  .use(toc, {
    tocCallback: (tocMarkdown, tocArray, tocHtml) => {
      if (tocHtml) {
        tocTree = []
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
      }
    }
  })

export default {
  markdownIt,
  tableOfContent,
  markdownItWithToc
}

function markdownIt (source) {
  return instance.render(source)
}

function tableOfContent (source) {
  instance.render(source)

  return tocTree
}

function markdownItWithToc (source, tree) {
  let result = instance.render(source)

  tree.push(...tocTree)

  return result
}
