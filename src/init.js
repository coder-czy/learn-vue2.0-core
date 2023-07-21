import { initState } from "./state"
import { compileToFunction } from "./compile/index"

export function initMixin (Vue) {//给vue添加init方法
  Vue.prototype._init = function (options) {//用于初始化操作
    const vm = this
    vm.$options = options

    initState(vm)

    // 渲染模板 el
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }


  }

  Vue.prototype.$mount = function (el) {
    // el template render
    let vm = this
    // 获取元素
    el = document.querySelector(el)
    let options = vm.$options
    if (!options.render) {
      let template = options.template
      if (!template && el) {
        // 获取HTML
        el = el.outerHTML
        //<div id="app">hello {{name}}</div>

        // 变成ast语法树
        let ast = compileToFunction(el)
      }
    }

  }
}

// ast语法树  vnode
//<div id="app">hello {{name}}</div>

/**
 * {
 * tag:'div',
 * attrs:[{id:'app'}],
 * children:[
 *    {tag:null,text:"hello"}
 * ]
 * }
 * 
 */
