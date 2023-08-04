import Dep from "./Dep"
import observe from "./observe"

/**
 * 给对象data的属性key定义监听
 * @param {*} data 传入的数据
 * @param {*} key 监听的属性
 * @param {*} value 闭包环境提供的周转变量
 */
export default function defineReactive (data, key, value) {

  // 每个数据都要维护一个属于自己的数组，用来存放依赖自己的watcher
  const dep = new Dep()

  // console.log('defineReactive()', data,key,value)
  if (arguments.length === 2) {
    value = data[key]
  }

  // 子元素要进行observe，形成递归
  let childOb = observe(value)

  Object.defineProperty(data, key, {
    // 可枚举 可以for-in
    enumerable: true,
    // 可被配置，比如可以被delete
    configurable: true,
    // getter  收集依赖
    get () {
      console.log(`getter试图访问${key}属性`)

      // 收集依赖
      if (Dep.target) {
        dep.depend()
        // 判断有没有子元素
        if (childOb) {
          // 数组收集依赖
          childOb.dep.depend()
        }
      }

      return value
    },
    // setter 触发依赖
    set (newValue) {
      console.log(`setter试图改变${key}属性`, newValue)

      if (value === newValue) return
      value = newValue

      // 当设置了新值，新值也要被observe
      childOb = observe(newValue)

      // 触发依赖
      // 发布订阅模式，通知dep
      dep.notify()
    },
  })
}

