"use strict";

var bar = function bar() {
  typeof time !== "undefined" && time.start("1");
  console.log(2333);
  typeof time !== "undefined" && time.end("1");
};

function foo() {
  typeof time !== "undefined" && time.start("2");
  console.log(123);

  var _uid = baz();

  typeof time !== "undefined" && time.end("2");
  return _uid;
}

function baz() {
  typeof time !== "undefined" && time.start("3");
  var arr = [1, 2, 3];

  var _uid2 = arr.map(function (x) {
    return x * x;
  });

  typeof time !== "undefined" && time.end("3");
  return _uid2;
}

foo();
var test = new Promise(function () {
  typeof time !== "undefined" && time.start("4");
  console.log(2333);
  typeof time !== "undefined" && time.end("4");
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlucHV0LmpzIl0sIm5hbWVzIjpbImJhciIsImNvbnNvbGUiLCJsb2ciLCJmb28iLCJiYXoiLCJhcnIiLCJtYXAiLCJ4IiwidGVzdCIsIlByb21pc2UiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsR0FBRyxHQUFHLFNBQU5BLEdBQU0sR0FBTTtBQUFBO0FBQ2RDLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLElBQVo7QUFEYztBQUVmLENBRkQ7O0FBSUEsU0FBU0MsR0FBVCxHQUFlO0FBQUE7QUFDYkYsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksR0FBWjs7QUFEYSxhQUVORSxHQUFHLEVBRkc7O0FBQUE7QUFBQTtBQUdkOztBQUVELFNBQVNBLEdBQVQsR0FBZTtBQUFBO0FBQ2IsTUFBSUMsR0FBRyxHQUFHLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLENBQVY7O0FBRGEsY0FFTkEsR0FBRyxDQUFDQyxHQUFKLENBQVEsVUFBQUMsQ0FBQztBQUFBLFdBQUlBLENBQUMsR0FBR0EsQ0FBUjtBQUFBLEdBQVQsQ0FGTTs7QUFBQTtBQUFBO0FBR2Q7O0FBRURKLEdBQUc7QUFFSCxJQUFJSyxJQUFJLEdBQUcsSUFBSUMsT0FBSixDQUFZLFlBQU07QUFBQTtBQUMzQlIsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksSUFBWjtBQUQyQjtBQUU1QixDQUZVLENBQVgiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYmFyID0gKCkgPT4ge1xuICBjb25zb2xlLmxvZygyMzMzKVxufVxuXG5mdW5jdGlvbiBmb28oKSB7XG4gIGNvbnNvbGUubG9nKDEyMylcbiAgcmV0dXJuIGJheigpXG59XG5cbmZ1bmN0aW9uIGJheigpIHtcbiAgdmFyIGFyciA9IFsxLCAyLCAzXVxuICByZXR1cm4gYXJyLm1hcCh4ID0+IHggKiB4KVxufVxuXG5mb28oKVxuXG52YXIgdGVzdCA9IG5ldyBQcm9taXNlKCgpID0+IHtcbiAgY29uc29sZS5sb2coMjMzMylcbn0pIl19
