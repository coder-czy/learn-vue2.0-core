import { observer } from './observe/index'

export function initState (vm) {
  const ops = vm.$options
  if (ops.data) {
    initData(vm)
  }

}

function initData (vm) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function' ? data.call(vm) : data //修改this指向
  // debugger

  // 对data数据进行劫持
  observer(data)

}