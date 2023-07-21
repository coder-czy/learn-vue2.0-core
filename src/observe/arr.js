// 重写数组

// 1、获取原来的数组方法 避免污染
let oldArrayProtoMethods = Array.prototype

// 2、继承
export let ArrayMethods = Object.create(oldArrayProtoMethods)

// 劫持
let methods = [
  'push',
  'pop',
  'unshift',
  'shift',
  'splice'
]

methods.forEach(item => {
  ArrayMethods[item] = function (...args) {
    console.log('劫持数组')
    let result = oldArrayProtoMethods[item].apply(this, args)
    return result

  }

})