Function.prototype.before = function (beforeFn) {
  return () => {
    beforeFn();
    this();
  };
};

function fn() {
  console.log("function");
}
function b() {
  console.log("before");
}
let d = fn.before(b);
d();
// AOP(面向切面编程)的主要作用是把一些跟核心业务逻辑模块无关的功能抽离出来，其实就是给原函数增加一层，不用管原函数内部实现
