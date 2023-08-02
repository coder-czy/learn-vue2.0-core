import { initState } from "./state"

export function initMixin (Vue) {//给vue添加init方法
  Vue.prototype._init = function (options) {//用于初始化操作
    const vm = this
    // 初始化状态
    initState(vm)


  }

}

