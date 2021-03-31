// promise a+ 规范

// Promise是个类，无需考虑兼容性问题
// 当使用Promise的时候会传入一个执行器，立即执行的
// 当前executor给个两个函数作为参数用来描述promise的状态。promise中有三个状态：成功态，等待态，拒绝态
// 默认是等待
// 每个promise实例都有一个then方法
// Promise一旦状态变化后不能更改
// Promise还是基于回调的
// es6-promise 包
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTRD = "REJECTRD";
class Promise {
  constructor(executor) {
    //executor内部可能会出错，需要try catch
    this.status = PENDING;
    this.value = undefined; // 存储成功后的值
    this.reason = undefined; // 存储失败的原因
    this.resolveCallback = []; // 存储成功的回调
    this.rejectCallback = []; // 存储失败的回调

    const resolve = (value) => {
      if (this.status === PENDING) {
        // 当前状态一定是等待态才能改变状态
        this.value = value;
        this.status = FULFILLED;
        // 发布
        this.resolveCallback.forEach((fn) => fn());
      }
    };
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECTRD;
        this.rejectCallback.forEach((fn) => fn());
      }
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then(onFulfilled, onRejected) {
    let promise2 = new Promise((resolve, reject) => {
      // 把之前的代码全部放在新的promise里面，因为promise执行器是立即执行的
      // 这样方便上一个then的返回值传递到下一个then中
      if (this.status === PENDING) {
        // 先订阅
        // 代码异步调用resolve或者reject时
        this.resolveCallback.push(() => {
          // 切片编程 AOP
          // todo。。。 可以做其他自己的事情
          try {
            let x = onFulfilled(this.value);
            resolve(x);
          } catch (error) {
            reject(error);
          }
        });
        this.rejectCallback.push(() => {
          try {
            let x = onRejected(this.reason);
            resolve(x);
          } catch (error) {
            reject(error);
          }
        });
      }
      if (this.status === FULFILLED) {
        try {
          // 对应情况二
          let x = onFulfilled(this.value);
          // 此x可能是promise
          // 如果是返回的是promise，怎么判断这个promise是走成功还是失败
          // 方法：调用此promise的then方法，如果成功则把成功的结果通过调用promise2的resovle传递进去，失败同理
          // 总结：x的值决定是调用promise2（的成功还是失败）的resolve还是reject，如果是promise则取他的状态，如果是普通值则调用resolve
          resolve(x);
        } catch (error) {
          reject(error);
        }
      }
      if (this.status === REJECTRD) {
        try {
          let x = onRejected(this.reason);
          resolve(x);
        } catch (error) {
          reject(error);
        }
      }
    });
    return promise2;
  }
}

// node 导出方法
module.exports = Promise;
