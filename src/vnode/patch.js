export function patch (oldVnode, vnode) {
  // console.log(oldVnode, vnode)
  // vnode==>真实dom
  // 1、创建新dom
  let el = createEl(vnode)
  console.log(el)
  // 2、替换 ==》获取父节点  ==》插入  ==》删除
  let parentEl = oldVnode.parentNode //body
  parentEl.insertBefore(el, oldVnode.nextsibling)
  parentEl.removeChild(oldVnode)
  return el

}

function createEl (vnode) { //vnode:{tag,text,data,children}
  let { tag, children, key, data, text } = vnode
  if (typeof tag === 'string') {  //标签
    vnode.el = document.createElement(tag)  //创建元素
    // children
    if (children.length > 0) {
      children.forEach(child => {
        // 递归
        vnode.el.appendChild(createEl(child))
      })
    }

  } else {
    vnode.el = document.createTextNode(text)
  }
  return vnode.el
}