import { observer } from './observe/index'

export function initState (vm) {
  const ops = vm.$options
  if (ops.data) {
    initData(vm)
  }

}

function initData (vm) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function' ? data.call(vm) : data //call修改this指向
  // debugger
  // 将data的所有属性代理到实例上去
  for (const key in data) {
    proxy(vm, '_data', key)
  }

  // 对data数据进行劫持
  observer(data)

}

function proxy (vm, source, key) {
  Object.defineProperty(vm, key, {
    get: () => {
      return vm[source][key]
    },
    set: (newValue) => {
      vm[source][key] = newValue
    }
  })
}