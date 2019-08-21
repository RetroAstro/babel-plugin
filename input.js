var bar = () => {
  console.log(2333)
}

function foo() {
  console.log(123)
  return baz()
}

function baz() {
  var arr = [1, 2, 3]
  return arr.map(x => x * x)
}

foo()

var test = new Promise(() => {
  console.log(2333)
})