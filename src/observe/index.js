import { ArrayMethods } from './arr'
import Dep from './dep'
export function observer (data,) {
  // 判断
  if (typeof data != 'object' || data == null) {
    return data
  }
  // 对象
  return new Observer(data)

}

class Observer {
  constructor(data) {
    // 给data定义一个属性 __ob__,用于数组新增对象数据的处理
    Object.defineProperty(data, '__ob__', {
      enumerable: false,
      configurable: true,
      value: this
    })
    this.dep = new Dep()//给所有对象类型添加一个dep

    //判断数组
    if (Array.isArray(data)) {
      data.__proto__ = ArrayMethods

      // 数组对象
      this.observeArray(data) //处理数组对象
    }
    this.walk(data)
  }

  walk (data) {
    let keys = Object.keys(data)
    for (let i = 0; i < keys.length; i++) {
      // 对每个属性进行劫持
      let key = keys[i]
      let value = data[key]
      defineReactive(data, key, value)
    }
  }

  observeArray (data) {
    for (let i = 0; i < data.length; i++) {
      observer(data[i])
    }
  }
}

// 对象中的属性进行劫持
function defineReactive (data, key, value) {
  let childDep = observer(value) //递归 深度代理
  let dep = new Dep() //给每一属性添加dep
  Object.defineProperty(data, key, {
    get: () => {
      // 收集依赖
      if (Dep.target) {
        dep.depend()
        if (childDep.dep) {
          childDep.dep.depend()//数组收集
        }
      }
      // console.log('获取')
      return value
    },
    set: (newValue) => {
      // console.log('设置')
      if (newValue == value) return
      // 设置值为对象的时候
      observer(value)
      value = newValue
      // 更新
      dep.notify()

    }
  })
}

// 数组劫持 两种数据格式[1,1] [{a:1}]
// 函数劫持 重写数组方法
//   'push',
//   'pop',
//   'shift',
//   'unshift',
//   'splice',
//   'sort',
//   'reverse'
