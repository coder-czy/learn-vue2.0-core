import { initState } from "./state"
import { compileToFunction } from "./compile/index"
import { callHook, mountComponent } from "./lifecycle"
import { mergeOptions } from "./utils/index"

export function initMixin (Vue) {//给vue添加init方法
  Vue.prototype._init = function (options) {//用于初始化操作
    const vm = this
    vm.$options = mergeOptions(Vue.options, options)
    callHook(vm, 'beforeCreated')
    // 初始化状态
    initState(vm)
    callHook(vm, 'created')

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
    vm.$el = el //保存旧的dom
    let options = vm.$options
    if (!options.render) {
      let template = options.template
      if (!template && el) {
        // 获取HTML
        el = el.outerHTML
        //<div id="app">hello {{name}}</div>

        // 变成ast语法树
        // let ast = compileToFunction(el)

        //将render 函数变成 vnode
        let render = compileToFunction(el)
        console.log(render)
        //1.将render函数变成vnode 2.vnode变成真实dom放到页面上去
        options.render = render
      }
    }
    mountComponent(vm, el)
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
