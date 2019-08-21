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
  var node = funcPath.parentPath.node.type === 'VariableDeclarator' ?
    funcPath.parentPath.node : funcPath.node
  
  return {
    name: node.id ? node.id.name : 'anonymous',
    location: node.loc.start
  }
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

console.log(data)
