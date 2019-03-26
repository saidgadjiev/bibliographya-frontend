function scrollIt (destination, duration = 200, easing = 'linear', callback) {
  const easings = {
    linear (t) {
      return t
    },
    easeInQuad (t) {
      return t * t
    },
    easeOutQuad (t) {
      return t * (2 - t)
    },
    easeInOutQuad (t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    },
    easeInCubic (t) {
      return t * t * t
    },
    easeOutCubic (t) {
      return (--t) * t * t + 1
    },
    easeInOutCubic (t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
    },
    easeInQuart (t) {
      return t * t * t * t
    },
    easeOutQuart (t) {
      return 1 - (--t) * t * t * t
    },
    easeInOutQuart (t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
    },
    easeInQuint (t) {
      return t * t * t * t * t
    },
    easeOutQuint (t) {
      return 1 + (--t) * t * t * t * t
    },
    easeInOutQuint (t) {
      return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
    }
  }

  const start = window.pageYOffset
  const startTime = 'now' in window.performance ? performance.now() : new Date().getTime()

  const documentHeight = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight,
    document.getElementsByClassName('root-scroll')[0].scrollHeight
  )
  const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight
  const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop
  const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset)

  if ('requestAnimationFrame' in window === false) {
    window.scroll(0, destinationOffsetToScroll)
    if (callback) {
      callback()
    }
    return
  }

  function scroll () {
    const now = 'now' in window.performance ? performance.now() : new Date().getTime()
    const time = Math.min(1, ((now - startTime) / duration))
    const timeFunction = easings[easing](time)
    window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start))

    if (window.pageYOffset === destinationOffsetToScroll) {
      if (callback) {
        callback()
      }
      return
    }

    requestAnimationFrame(scroll)
  }

  scroll()
}

function getNTreeLevels (tree, n) {
  let result = []
  let level = 0

  for (let i = 0; i < tree.length; ++i) {
    let item = tree[i]

    let node = {
      id: item.id,
      level: item.level,
      name: item.name,
      children: []
    }

    result.push(node)
    level = visitNode(item, node, ++level, n)

    if (level > n) {
      break
    }
  }

  return result
}

function visitNode (node, result, l, n) {
  if (node.children && l <= n) {
    for (let i = 0; i < node.children.length; ++i) {
      let children = node.children[i]

      let childNode = {
        id: children.id,
        level: children.level,
        name: children.name,
        children: []
      }

      result.children.push(childNode)
      return visitNode(children, childNode, ++l, n)
    }
  }

  return l
}

function arrDiff (a1, a2) {
  let a = []
  let diff = []

  for (let i = 0; i < a1.length; i++) {
    a[a1[i]] = true
  }

  for (let i = 0; i < a2.length; i++) {
    if (a[a2[i]]) {
      delete a[a2[i]]
    } else {
      a[a2[i]] = true
    }
  }

  for (let k in a) {
    diff.push(k)
  }

  return diff
}

function isEquivalent (a, b) {
  // Create arrays of property names
  var aProps = Object.getOwnPropertyNames(a)
  var bProps = Object.getOwnPropertyNames(b)

  // If number of properties is different,
  // objects are not equivalent
  if (aProps.length !== bProps.length) {
    return false
  }

  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i]

    // If values of same property are not equal,
    // objects are not equivalent
    if (a[propName] !== b[propName]) {
      return false
    }
  }

  // If we made it this far, objects
  // are considered equivalent
  return true
}

function createToc (tocArray) {
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

export default {
  getNTreeLevels,
  arrDiff,
  isEquivalent,
  createToc,
  scrollIt
}
