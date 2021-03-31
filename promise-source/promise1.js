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

    const resolve = (value) => {
      if (this.status === PENDING) {
        // 当前状态一定是等待态才能改变状态
        this.value = value;
        this.status = FULFILLED;
      }
    };
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECTRD;
      }
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    }
    if (this.status === REJECTRD) {
      onRejected(this.reason);
    }
  }
}

// node 导出方法
module.exports = Promise;
