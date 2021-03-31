// 情况2
let Promise2 = require("./promise-source/promise2.js");
let promise2 = new Promise2((resove, reject) => {
  setTimeout(() => {
    resove("ok");
  }, 1000);
});
// 当用户调用then的时候，此时promise可能还是pending状态
// 所以我们需要先把成功的回调先存起来，等到状态变了之后在触发 （即就是发布订阅模式）
promise2.then(
  // then是异步的
  (value) => {
    console.log(value);
  },
  (err) => {
    console.log("dd", err);
  }
);
promise2.then(
  // then是异步的
  (value) => {
    console.log(value);
  },
  (err) => {
    console.log("dd", err);
  }
);
// 调用多个then，并且多个then时按顺序执行，因此需要个队列存储回调方法
