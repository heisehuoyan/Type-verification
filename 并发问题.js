const fs = require("fs"); // fs是node的核心模块

// 并发问题
let arr = [];
fs.readFile("./a.txt", "UTF8", function (err, data) {
  arr.push(data);
});
fs.readFile("./b.txt", "UTF8", function (err, data) {
  arr.push(data);
});
console.log(arr); // [] // 回调是执行完主线程之后才执行,因此结果为[]

// 回调函数 优化 最终读完才通知
function after(times, callback) {
  let arr1 = [];
  return (data) => {
    arr1.push(data);
    if (--times === 0) {
      //多个请求触发，使用计数器
      callback(arr1);
    }
  };
}

let out = after(2, (arr) => {
  console.log(arr);
});

fs.readFile("./a.txt", "UTF8", function (err, data) {
  out(data);
});
fs.readFile("./b.txt", "UTF8", function (err, data) {
  out(data);
});

// 发布订阅模式优化
// 先订阅，在发布
