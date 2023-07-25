export const HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed'
]
//策略模式  解决判断太多
let starts = {}
starts.data = function (parentVal, childVal) {
  return childVal
}//合并data
starts.computed = function () { }//合并computed
starts.watch = function () { }//合并watch
starts.methods = function () { }//合并methods

//遍历生命周期
HOOKS.forEach(hooks => {
  starts[hooks] = mergeHook
})

function mergeHook (parentVal, childVal) {
  // Vue.options = {created:[a,b,c],watch:[a,b]}
  if (childVal) {
    if (parentVal) {
      return parentVal.concat(childVal)
    } else {
      return [childVal]
    }
  } else {
    return parentVal
  }

}

export function mergeOptions (parent, child) {
  console.log(parent, child)
  // Vue.options = {created:[a,b,c],watch:[a,b]}
  const options = {}
  //如果有父亲，没有儿子
  for (const key in parent) {
    mergeField(key)

  }
  // 儿子有父亲没有
  for (const key in child) {
    mergeField(key)
  }

  function mergeField (key) {
    // 根据key  策略模式
    if (starts[key]) {
      options[key] = starts[key](parent[key], child[key])
    } else {
      options[key] = child[key]
    }
  }
  // console.log(options)
  return options
}