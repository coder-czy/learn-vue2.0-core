/**
 * <div id="app">hello {{name}}</div>
 * render(){ _c解析标签
 * return _c('div',{id:app},_v('hello'+_s(name)),_c)
 * }
 */
// 处理属性
var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g

function genProps (attrs) {
  let str = ''
  // 对象
  for (let i = 0; i < attrs.length; i++) {
    let attr = attrs[i]
    if (attr.name === 'style') {  //{style:{<!--  -->olor:red,fo}}  {name:"style",value:"color:red;font-size:20px;"}
      let obj = {}
      attr.value.split(';').forEach(item => {
        let [key, val] = item.split(':')
        obj[key] = val
      })
      attr.value = obj
    }
    // 拼接
    str += `${attr.name}:${JSON.stringify(attr.value)},`
  }
  return `{${str.slice(0, -1)}}`
}

// 处理子节点
function genChildren (el) {
  let children = el.children
  if (children) {
    return children.map(child => gen(child)).join(',')
  }
}

function gen (node) { //1 元素  2 3
  if (node.type === 1) { //元素
    return generate(node)
  } else {//文本 1、只是文本hello 2、插值表达式{{name}}
    let text = node.text
    if (!defaultTagRE.test(text)) {
      return `_v(${JSON.stringify(text)})`
    }
    //带有{{}}
    let tokens = []
    //将正则的lastIndex设置为0 正则是全局模式，需要每次使用前变为0
    let lastIndex = defaultTagRE.lastIndex = 0
    let match
    while (match = defaultTagRE.exec(text)) {
      //hello {{name}}
      let index = match.index
      if (index > lastIndex) { //添加内容

        tokens.push(JSON.stringify(text.slice(lastIndex, index)))// 内容
      }
      //添加插值表达式{{name}}
      tokens.push(`_s(${match[1].trim()})`)
      lastIndex = index + match[0].length //最后 {{}}索引位置
    }
    // 判断还有没有文本
    if (lastIndex < text.length) {
      tokens.push(JSON.stringify(text.slice(lastIndex)))
    }
    return `_v(${tokens.join('+')})`
  }
}

export function generate (el) {//ast
  // console.log(el)
  let children = genChildren(el)
  // console.log(children)
  //_c:元素标签 _v:文本 _s:插值表达式
  let code = `_c(${el.tag},${el.attrs.length ? `${genProps(el.attrs)}` : 'undefined'}${children ? `,${children}` : ''})`
  console.log(code)
  // _c(div,{id:"app",style:{"color":"red","font-size":"20px"}})
  return code
}