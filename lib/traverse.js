const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default

var code = fs.readFileSync(
  path.resolve(__dirname, '../output.min.js'),
  'utf-8'
)

var ast = parser.parse(code)

function isStartExpression(path) {
  var result = path.node.object.name === 'time' && 
    path.node.property.name === 'start' && path.parentPath.node.type === 'CallExpression'

  return result
}

function getFunctionInfo(path) {
  var funcPath = path.getFunctionParent()
  var parentNode = funcPath.parentPath.node
  var info = {}

  function generateInfo(name, location) {
    info = { name, location }
  }
  
  if (parentNode.type === 'AssignmentExpression') {
    generateInfo(parentNode.left.property.name, parentNode.left.property.loc.start)
  } else if (parentNode.type === 'VariableDeclarator') {
    generateInfo(parentNode.id.name, parentNode.id.loc.start)
  } else {
    funcPath.node.id
      ? generateInfo(funcPath.node.id.name, funcPath.node.id.loc.start)
      : generateInfo('anonymous', funcPath.node.loc.start)
  }

  return info
}

var data = {}

// 对代码进行二次语法树分析，收集函数名以及对应的行列号。
traverse(ast, {
  MemberExpression(path) {
    if (isStartExpression(path)) {
      var uid = path.parentPath.node.arguments[0].value

      data[uid] = getFunctionInfo(path)
    }
  }
})

fs.writeFileSync(
  path.resolve(__dirname, '../data.json'),
  JSON.stringify(data)
)
