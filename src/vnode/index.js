/**
 * 
 * 创建虚拟dom  vnode
 * {
 * 
 * tag
 * children,
 * text,
 * data,
 * key
 * 
 * }
 */

export function renderMixin (Vue) {
  //标签
  Vue.prototype._c = function () {
    //创建标签
    return createElement(...arguments)
  }
  //文本
  Vue.prototype._v = function (text) {
    return createText(text)
  }
  //插值表达式
  Vue.prototype._s = function (val) {//_S(msg)
    return val == null ? "" : (typeof val === 'object') ? JSON.stringify(val) : val
  }

  Vue.prototype._render = function () {//render函数变成vnode
    let vm = this
    let render = vm.$options.render
    let vnode = render.call(this)
    console.log(vnode)
    return vnode
  }
}

// 创建元素
function createElement (tag, data = {}, ...children) {
  return vnode(tag, data, data.key, children)
}

// 创建文本
function createText (text) {
  return vnode(undefined, undefined, undefined, undefined, text)
}

// 创建vnode
function vnode (tag, data, key, children, text) {
  return {
    tag, data, key, children, text
  }
}