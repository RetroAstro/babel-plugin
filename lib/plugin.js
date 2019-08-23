const {
  startExpression,
  endExpression,
  awaitExpression,
  variableExpression
} = require('./expression')

var key = 0

function getUid() {
  return (++key) + ''
}

function isEmptyFunction(path) {
  var bodyList = path.get('body').node.body

  return (!bodyList) || (!bodyList.length)
}

function isAsyncFunction(path) {
  return (path.node.async || path.node.generator)
}

function isInjectedBefore(path) {
  return (path.node.start === undefined || path.node.end === undefined)
}

function isUnmatchedContext(path, funcPath) {
  return path.getFunctionParent().node !== funcPath.node
}

function shouldVisit(path, funcPath) {
  return !(isInjectedBefore(path) || isUnmatchedContext(path, funcPath))
}

function hasReturnStatement(path) {
  var bodyList = path.get('body').node.body

  return bodyList && bodyList.some(node => node.type === 'ReturnStatement')
}

function syncTransform(path, query) {
  path.get('body').unshiftContainer('body', startExpression(query))

  if (!hasReturnStatement(path)) {
    path.get('body').pushContainer('body', endExpression(query))
  }
}

function asyncTransform(path, query) {
  path.get('body').unshiftContainer('body', startExpression(query))
  
  if (path.node.async) {
    path.traverse(awaitExpressionVisitor, { path, query })
  }

  if (path.node.generator) {
    path.traverse(yieldExpressionVisitor, { path, query })
  }

  if (!hasReturnStatement(path)) {
    path.get('body').pushContainer('body', endExpression(query))
  }
}

function awaitExpressionTransform(path, funcPath, query) {
  var _tid2 = funcPath.scope.generateUidIdentifier('tid')
  
  query['_tid2'] = _tid2

  funcPath.get('body').unshiftContainer('body', variableExpression(query))

  path.replaceWith(awaitExpression(path, query))

  query['_tid'] = _tid2
}

function returnStatementTransform(path, query) {
  var { t } = query
  var end = endExpression(query)

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

var yieldExpressionVisitor = {
  YieldExpression(path) {

  }
}

var awaitExpressionVisitor = {
  AwaitExpression(path) {
    if (shouldVisit(path, this.path)) {
      awaitExpressionTransform(path, this.path, this.query)
    }
  }
}

var returnStatementVisitor = {
  ReturnStatement(path) {
    if (shouldVisit(path, this.path)) {
      returnStatementTransform(path, this.query)
    }
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

        isAsyncFunction(path) ? asyncTransform(path, query) : syncTransform(path, query)

        path.traverse(returnStatementVisitor, { path, query })
      }
    }
  }
}
