import { ArrayMethods } from './arr'

export function observer (data) {
  // 判断
  if (typeof data != 'object' || data == null) {
    return data
  }
  // 对象
  return new Observer(data)

}

class Observer {
  constructor(data) {
    //判断数组
    if (Array.isArray(data)) {
      data.__proto__ = ArrayMethods
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
}

// 对象中的属性进行劫持
function defineReactive (data, key, value) {
  observer(value) //递归 深度代理
  Object.defineProperty(data, key, {
    get: () => {
      console.log('获取')
      return value
    },
    set: (newValue) => {
      console.log('设置')
      if (newValue == value) return
      value = newValue
      // 设置值的时候
      observer(value)
    }
  })
}

// 数组劫持 [1,1] [{a:1}]
// 函数劫持 重写数组方法
//   'push',
//   'pop',
//   'shift',
//   'unshift',
//   'splice',
//   'sort',
//   'reverse'