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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlucHV0LmpzIl0sIm5hbWVzIjpbImJhciIsImNvbnNvbGUiLCJsb2ciLCJmb28iLCJiYXoiLCJhcnIiLCJtYXAiLCJ4Il0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLEdBQUcsR0FBRyxTQUFOQSxHQUFNLEdBQU07QUFBQTs7QUFDZEMsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksSUFBWjtBQURjO0FBRWYsQ0FGRDs7QUFJQSxTQUFTQyxHQUFULEdBQWU7QUFBQTs7QUFDYkYsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksR0FBWjs7QUFEYSxjQUVORSxHQUFHLEVBRkc7O0FBQUE7QUFBQTtBQUdkOztBQUVELFNBQVNBLEdBQVQsR0FBZTtBQUFBOztBQUNiLE1BQUlDLEdBQUcsR0FBRyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxDQUFWOztBQURhLGNBRU5BLEdBQUcsQ0FBQ0MsR0FBSixDQUFRLFVBQUFDLENBQUM7QUFBQSxXQUFJQSxDQUFDLEdBQUdBLENBQVI7QUFBQSxHQUFULENBRk07O0FBQUE7QUFBQTtBQUdkOztBQUVESixHQUFHIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGJhciA9ICgpID0+IHtcbiAgY29uc29sZS5sb2coMjMzMylcbn1cblxuZnVuY3Rpb24gZm9vKCkge1xuICBjb25zb2xlLmxvZygxMjMpXG4gIHJldHVybiBiYXooKVxufVxuXG5mdW5jdGlvbiBiYXooKSB7XG4gIHZhciBhcnIgPSBbMSwgMiwgM11cbiAgcmV0dXJuIGFyci5tYXAoeCA9PiB4ICogeClcbn1cblxuZm9vKClcbiJdfQ==
