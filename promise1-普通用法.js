let Promise = require("./promise-source/promise1.js");
//情况1
let promise = new Promise((resove, reject) => {
  // console.log("Promise");
  throw new Error("失败了");
  reject("失败了");
  resove(9);
});
console.log("out");
//打印
//Promise
//out
promise.then(
  // then是异步的
  (value) => {
    console.log(value);
  },
  (err) => {
    console.log("dd", err);
  }
);
