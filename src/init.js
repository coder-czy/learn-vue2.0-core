import { initState } from "./state"

export function initMixin (Vue) {//给vue添加init方法
  Vue.prototype._init = function (options) {//用于初始化操作
    const vm = this
    vm.$options = options

    initState(vm)
  }
}