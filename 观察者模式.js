//发布订阅： 先订阅，主动发布
// 观察者模式：有依赖关系，被动的概念，状态变化，主动通知观察着

class Subject {
  // 被观察，需要将观察者收集起来
  constructor(name) {
    this.name = name;
    this.state = "我非常开心";
    this.observe = []; // 发布订阅，收集观察者 ，先订阅
  }
  attach(o) {
    this.observe.push(o);
  }
  setState(newState) {
    // 状态变化，通知观察者更新
    this.state = newState;
    this.observe.forEach((o) => {
      o.updata(this.name, newState);
    });
  }
}
class Observe {
  // 观察它
  constructor(name) {
    this.name = name;
  }
  updata(s, state) {
    console.log(this.name + ":" + s + "当前" + state);
  }
}

// vue 数据变了，视图要更新即状态变了，通知依赖的视图更新

let s = new Subject("小宝宝");
let o1 = new Observe("爸爸");
let o2 = new Observe("妈妈");
s.attach(o1); // 小宝宝通知爸爸
s.setState("不开心了");
