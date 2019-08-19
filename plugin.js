const { getUid } = require('./inject')

function isEmptyFunction(path) {
  var bodyList = path.get('body').node.body
  
  return (!bodyList) || (!bodyList.length)
}

function hasReturnStatement(path) {
  var bodyList = path.get('body').node.body

  return bodyList && bodyList.some(node => node.type === 'ReturnStatement')
}

function isInjectedBefore(path) {
  var result = (path.node.start === undefined || path.node.end === undefined)
  
  return result
}

function timeIsNotUndefinedExpression(t) {
  var result = t.binaryExpression(
    '!==',
    t.unaryExpression('typeof', t.identifier('time')),
    t.stringLiteral('undefined')
  )

  return result
}

function getStartExpression({ t, _uid, uid }) {
  var result = t.variableDeclaration(
    'var',
    [
      t.variableDeclarator(
        _uid,
        t.logicalExpression(
          '&&',
          timeIsNotUndefinedExpression(t),
          t.callExpression(
            t.memberExpression(
              t.identifier('time'),
              t.identifier('start')
            ),
            [t.stringLiteral(uid)],
          )
        )
      )
    ]
  )

  return result
}

function getEndExpression({ t, _uid }) {
  var result = t.ExpressionStatement(
    t.logicalExpression(
      '&&',
      timeIsNotUndefinedExpression(t),
      t.callExpression(
        t.memberExpression(
          t.identifier('time'),
          t.identifier('end')
        ),
        [_uid]
      )
    )
  )

  return result
}

function functionTransform(path, query) {
  if (isEmptyFunction(path)) {
    return
  }

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
        var _uid = path.scope.generateUidIdentifier('uid')
        var uid = getUid()

        // 以查询取代变量
        var query = { t, _uid, uid }

        functionTransform(path, query)

        if (hasReturnStatement(path)) {
          path.traverse(returnStatementVisitor, { query })
        }
      }
    }
  }
}
