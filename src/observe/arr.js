// 重写数组

// 1、获取原来的数组方法 避免污染
let oldArrayProtoMethods = Array.prototype

// 2、继承
export let ArrayMethods = Object.create(oldArrayProtoMethods)

// 劫持方法 7种
let methods = [
  'push',
  'pop',
  'unshift',
  'shift',
  'splice',
  'sort',
  'reverse'
]

methods.forEach(item => {
  // debugger
  ArrayMethods[item] = function (...args) {
    console.log('劫持数组')
    let result = oldArrayProtoMethods[item].apply(this, args)

    // 数组添加数据的情况
    let inserted
    switch (item) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.splice(2)
        break
      default:
        break
    }

    let ob = this.__ob__
    if (inserted) {
      ob.observeArray(inserted)
    }

    return result
  }

})