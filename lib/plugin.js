var key = 0

function getUid() {
  return (++key) + ''
}

function isEmptyFunction(path) {
  var bodyList = path.get('body').node.body

  return (!bodyList) || (!bodyList.length)
}

function isUnmatchedReturnStatement(path, parentPath) {
  return path.getFunctionParent().node !== parentPath.node
}

function isInjectedBefore(path) {
  return (path.node.start === undefined || path.node.end === undefined)
}

function hasReturnStatement(path) {
  var bodyList = path.get('body').node.body

  return bodyList && bodyList.some(node => node.type === 'ReturnStatement')
}

function timeIsNotUndefinedExpression(t) {
  var result = t.binaryExpression(
    '!==',
    t.unaryExpression('typeof', t.identifier('time')),
    t.stringLiteral('undefined')
  )

  return result
}

function getStartExpression({ t, uid, _tid }) {
  var result = t.variableDeclaration(
    'var',
    [
      t.variableDeclarator(
        _tid,
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

function getEndExpression({ t, uid, _tid }) {
  var result = t.ExpressionStatement(
    t.logicalExpression(
      '&&',
      timeIsNotUndefinedExpression(t),
      t.callExpression(
        t.memberExpression(
          t.identifier('time'),
          t.identifier('end')
        ),
        [t.stringLiteral(uid), _tid]
      )
    )
  )

  return result
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
    if (
      isInjectedBefore(path) || isUnmatchedReturnStatement(path, this.path)
    ) {
      return
    }

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

        var _tid = path.scope.generateUidIdentifier('tid')
        var uid = getUid()

        // 以查询取代变量
        var query = { t, uid, _tid }

        functionTransform(path, query)

        path.traverse(returnStatementVisitor, { path, query })
      }
    }
  }
}
