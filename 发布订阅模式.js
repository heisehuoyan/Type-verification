const fs = require("fs");

// 并发问题：发布订阅模式优化
// 先订阅，再发布:核心就是把多个方法暂存起来，最后依次执行
// 每读取一次，触发一次

let arr = [];
//events，事件中心，做调度
let events = {
  _events: [],
  on(fn) {
    this._events.push(fn);
  },
  emit(data) {
    this._events.forEach((fn) => {
      fn(data);
    });
  },
};
// 订阅有顺序，可以采用数组来实现
events.on(() => {
  console.log("每读取一次，触发一次");
});
events.on((data) => {
  arr.push(data);
});
events.on(() => {
  if (arr.length === 2) {
    console.log("读取完毕");
  }
});

fs.readFile("./a.txt", "UTF8", function (err, data) {
  events.emit(data);
});
fs.readFile("./b.txt", "UTF8", function (err, data) {
  events.emit(data);
});

// 观察者模式，
// vue2用得比较多
// 基于发布订阅，
// 发布订阅之间是没有依赖关系的，而观察者是观察者与被观察的关系
// vue3是发布订阅
