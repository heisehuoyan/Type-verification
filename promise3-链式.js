// 情况3
// promise 的特点
// promise解决了 1.链式调用解决嵌套回调（回调地狱）问题 2.同步并发问题 3. 多个异步错误处理

// 问题一 执行a接口返回的值作为b接口的参数传入 ----------------------------------------------------------------------------------
const fs = require("fs");
let Promise = require("./promise-source/promise4.js");

fs.readFile("./a.txt", "UTF8", function (err, data) {
  if (err) return; //多个异步错误处理 ，需要写多次同样代码
  fs.readFile("./b.txt", "UTF8", function (err, data) {
    if (err) return;
    console.log(data);
    // 。。。。。
  });
});
//readFile.then(()=>{},()=>{}) 希望能这样实现调用
function readFile(url, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(url, encoding, function (err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

readFile("./a.txt", "UTF8").then(
  (value) => {
    console.log("success", value);
    readFile("./b.txt", "UTF8").then(
      // 但是我们不希望这样调用
      (value) => {
        console.log("success", value);
      },
      (err) => {
        console.log("error", err);
      }
    );
  },
  (err) => {
    console.log("error", err);
  }
);

// 基于上述进行优化 采用promise 的链式调用;---------------------------------------------------------------------------------
// 当调用then方法的时候都会返回一个新的promise
// 因为当第一个then走到了失败，那么下一个可能走到成功，然而状态变了之后是不能更改的，，如果是同一个promise则不符合规范，因此需要是新的一个promise
// 情况一：then中成功方法返回的值（1.普通值即不是promise ），会作为外层下一层then的成功结果
// 情况二：then中成功方法中执行出错了，会作为下一个then方法的失败结果
// 情况三：then中走到失败方法了，此时依然会走到外层then中的成功方法，打印undefined ，因为返回的依然是普通值
// 总结一和二：无论上一次then走到成功和失败，只要返回的是普通值，都会执行下一次的成功

// 情况四 ：如果then中返回的是一个promise对象，此时会下一个then根据当前的promise结果来处理成功还是失败

// 总结：如果返回一个普通值（普通值即不是promise ），就会传递给下一个then的成功
//      如果返回的是一个promise的失败，或者抛出异常，就会传递给下一个then的失败
//      如果返回的是一个promise的成功，就会传递给下一个then的成功

readFile("./a.txt", "UTF8") // 情况三 当执行一个不存在的文件，成功方法也没有返回（相当于return undefined），这个情况会走到err
  .then(
    (value) => {
      //情况二 throw new Error("error");
      //情况一return value;
      //情况四
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("00");
        }, 1000);
      });
    },
    (err) => {
      console.log("error", err);
    }
  )
  .then(
    (value) => {
      console.log("dierge", value); // 1
    },
    (err) => {
      console.log("error", err);
    }
  );
