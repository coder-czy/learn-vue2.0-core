export function initState (vm) {
  const ops = vm.$options
  if (ops.data) {
    initData(vm)
  }

}

function initData (vm) {
  let data = vm.$options.data
  typeof data === 'function' ? data.call(vm) : data
  debugger
  console.log(data)

}