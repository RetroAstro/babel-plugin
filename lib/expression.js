function timeIsNotUndefinedExpression(t) {
  var result = t.binaryExpression(
    '!==',
    t.unaryExpression('typeof', t.identifier('time')),
    t.stringLiteral('undefined')
  )

  return result
}

function startExpression({ t, uid, _tid }) {
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

function endExpression({ t, uid, _tid }) {
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

function variableExpression({ t, _tid2 }) {
  var result = t.variableDeclaration(
    'var',
    [t.variableDeclarator(_tid2)]
  )

  return result
}

function assignmentExpression(t, uid, _tid2) {
  var result = t.assignmentExpression(
    '=',
    _tid2,
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

  return result
}

function asyncExpression(path, expression, { t, uid, _tid, _tid2 }) {
  var result = t.SequenceExpression([
    expression(
      t.SequenceExpression([
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
        ),
        path.node.argument
      ])
    ),
    assignmentExpression(t, uid, _tid2)
  ])
  
  return result
}

function yieldExpression(path, query) {
  return asyncExpression(path, query.t.yieldExpression, query)
}

function awaitExpression(path, query) {
  return asyncExpression(path, query.t.awaitExpression, query)
}

module.exports = {
  startExpression,
  endExpression,
  variableExpression,
  yieldExpression,
  awaitExpression
}
