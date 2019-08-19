function foo() {
  var _uid = typeof time !== "undefined" && time.start("1");

  console.log(123);

  var _uid2 = bar();

  typeof time !== "undefined" && time.end(_uid);
  return _uid2;
}

function bar() {
  var _uid3 = typeof time !== "undefined" && time.start("2");

  console.log(456);

  var _uid4 = baz();

  typeof time !== "undefined" && time.end(_uid3);
  return _uid4;
}

function baz() {
  var _uid5 = typeof time !== "undefined" && time.start("3");

  var arr = [1, 2, 3];

  var _uid6 = arr.map(x => x * x);

  typeof time !== "undefined" && time.end(_uid5);
  return _uid6;
}

foo();
