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

export default {
  getNTreeLevels,
  arrDiff,
  isEquivalent
}
