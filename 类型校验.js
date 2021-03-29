// 一般的校验方法
function isType(val, typing) {
  return Object.prototype.toString.call(val) === `[object ${typing}]`;
}

console.log(isType(null, "String"));

// 柯里化登场，让函数变得更加具体---------------------------------------------------------------------
//初步

function isString(typing) {
  return function (val) {
    return Object.prototype.toString.call(val) === `[object ${typing}]`;
  };
}
function isNumber(typing) {
  return function (val) {
    return Object.prototype.toString.call(val) === `[object ${typing}]`;
  };
}
// ...... 要写多个类型函数
let myString = isString("String");
let myNumber = isNumber("Number");
console.log(myString(2));
console.log(myString("ttt"));
console.log(myNumber(0));

// 继续优化 高阶函数 ----------------------------------------------------------------------

function sum(a, b, c, d) {
  // 记录每次调用时传入的参数，并且和函数的参数个数进行比较，如果不满足总个数，
  //就返回新函数，如果传入的个数和参数一致，执行原来的函数
  return a + b + c + d;
}

function curring(fn) {
  // fn.length 函数参数的个数
  const inner = (args = []) => {
    //存储每次调用的时候传入的参数
    return args.length >= fn.length
      ? fn(...args)
      : (...useArgs) => inner([...args, ...useArgs]);
  };
  return inner();
}

let sum1 = curring(sum);
let sum2 = sum1(1);
let sum3 = sum2(2, 3);
let sum4 = sum3(4);
console.log(sum4);

// 柯里化类型校验 --------------------------------------------------------------
function isType1(typing, val) {
  return Object.prototype.toString.call(val) === `[object ${typing}]`;
}
let isString1 = curring(isType1)("String");
console.log(isString1(78));

let utils = {};
["String", "Number", "Boolean", "Null", "Undefined"].forEach((type) => {
  utils[`is${type}`] = curring(isType1)(type);
});
console.log(utils.isBoolean("9"));
