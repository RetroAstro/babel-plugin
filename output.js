"use strict";

var bar = function bar() {
  var _uid = typeof time !== "undefined" && time.start("1");

  console.log(2333);
  typeof time !== "undefined" && time.end(_uid);
};

function foo() {
  var _uid2 = typeof time !== "undefined" && time.start("2");

  console.log(123);

  var _uid3 = baz();

  typeof time !== "undefined" && time.end(_uid2);
  return _uid3;
}

function baz() {
  var _uid4 = typeof time !== "undefined" && time.start("3");

  var arr = [1, 2, 3];

  var _uid5 = arr.map(function (x) {
    return x * x;
  });

  typeof time !== "undefined" && time.end(_uid4);
  return _uid5;
}

foo();
