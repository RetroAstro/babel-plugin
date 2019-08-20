const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default

var code = fs.readFileSync(
  path.resolve(__dirname, '../output.js'),
  'utf-8'
)

var ast = parser.parse(code)

function isStartExpression(path) {
  var result = path.node.object.name === 'time' && 
    path.node.property.name === 'start' && path.parentPath.node.type === 'CallExpression'

  return result
}

var data = {}

// 对代码进行二次语法树分析，收集函数名以及对应的行列号。
traverse(ast, {
  MemberExpression(path) {
    if (isStartExpression(path)) {
      var uid, name, location, funcPath

      uid = path.parentPath.node.arguments[0].value
      funcPath = path.getFunctionParent()
      name = funcPath.node.id.name || 'anonymous'
      location = funcPath.node.loc.start
      
      data[uid] = { name, location }
    }
  }
})

console.log(data)
