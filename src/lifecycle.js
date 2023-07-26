import { patch } from './vnode/patch'
import watcher from './observe/watcher'
export function mountComponent (vm, el) {
  //源码
  callHook(vm, 'beforeMounted')
  // vm._update(vm._render())//1.vm._render 将render函数变成vnode  2。vm._update 将vnode 变成真实dom

  let updateComponent = () => {
    vm._update(vm._render())
  }
  new watcher(vm, updateComponent, () => { }, true)

  callHook(vm, 'mounted')
}

export function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode) {  //vnode==>真实的dom
    let vm = this
    //两个参数  1.旧dom 2.vnode
    vm.$el = patch(vm.$el, vnode)
  }
}

//1.render()函数=》vnode=>真实dom

//生命周期调用
export function callHook (vm, hook) {
  const handlers = vm.$options[hook]
  if (handlers) {
    for (let i = 0; i < handlers.length; i++) {
      handlers[i].call(this)//改变生命周期中的this指向
    }
  }
}