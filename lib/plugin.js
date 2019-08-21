const { getUid } = require('./inject')

function isEmptyFunction(path) {
  var bodyList = path.get('body').node.body

  return (!bodyList) || (!bodyList.length)
}

function isInjectedBefore(path) {
  return (path.node.start === undefined || path.node.end === undefined)
}

function hasReturnStatement(path) {
  var bodyList = path.get('body').node.body

  return bodyList && bodyList.some(node => node.type === 'ReturnStatement')
}

function timeExpression(type, { t, uid }) {
  var result = t.ExpressionStatement(
    t.logicalExpression(
      '&&',
      t.binaryExpression(
        '!==',
        t.unaryExpression('typeof', t.identifier('time')),
        t.stringLiteral('undefined')
      ),
      t.callExpression(
        t.memberExpression(
          t.identifier('time'),
          t.identifier(type)
        ),
        [t.stringLiteral(uid)],
      )
    )
  )

  return result
}

function getStartExpression(query) {
  return timeExpression('start', query)
}

function getEndExpression(query) {
  return timeExpression('end', query)
}

function functionTransform(path, query) {
  var start = getStartExpression(query)
  var end = getEndExpression(query)

  path.get('body').unshiftContainer('body', start)

  if (!hasReturnStatement(path)) {
    path.get('body').pushContainer('body', end)
  }
}

function returnStatementTransform(path, query) {
  if (isInjectedBefore(path)) {
    return
  }

  var { t } = query
  var end = getEndExpression(query)

  var return_uid = path.scope.generateUidIdentifier('uid')
  var returnVar = t.variableDeclaration('var', [t.variableDeclarator(return_uid, path.node.argument)])
  var _return = t.returnStatement(return_uid)

  if (path.parentPath.type === 'BlockStatement') {
    path.insertBefore(returnVar)
    path.insertBefore(end)
    path.insertBefore(_return)
    path.remove()
  }
}

var returnStatementVisitor = {
  ReturnStatement(path) {
    returnStatementTransform(path, this.query)
  }
}

module.exports = ({ types: t }) => {
  return {
    visitor: {
      Function(path) {
        if (isEmptyFunction(path)) {
          return
        }

        var uid = getUid()
        var query = { t, uid }

        functionTransform(path, query)

        if (hasReturnStatement(path)) {
          path.traverse(returnStatementVisitor, { query })
        }
      }
    }
  }
}
