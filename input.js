function foo() {
  console.log(123)
  return bar()
}

function bar() {
  console.log(456)
  return baz()
}

function baz() {
  var arr = [1, 2, 3]
  return arr.map(x => x * x)
}

foo()
