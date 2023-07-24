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
// 标签名称
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`
//<span:xx>
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
// 标签开头正则，捕获的内容是标签名
const startTagOpen = new RegExp(`^<${qnameCapture}`)
// 匹配标签结尾的</div>
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)
//<div id="app"></div> 属性
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
// 匹配标签结束的 >
const startTagClose = /^\s*(\/?)>/
var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g

// 创建一个ast对象
function createAstElement (tag, attrs) {
  return {
    tag,//标签
    attrs,//属性
    children: [],//子节点
    type: 1,
    parent: null,
  }
}
let root //根元素
let createParent //当前元素的父元素
// 数据结构 栈
let stack = [] //[div,h]
// 开始标签
function start (tag, attrs) {
  // console.log(tag, attrs)
  let element = createAstElement(tag, attrs)
  if (!root) {
    root = element
  }
  createParent = element
  stack.push(element)
}
// 获取文本
function charts (text) {
  // console.log(text)
  text = text.replace(/a/g)
  if (text) {
    createParent.children.push({
      type: 3,
      text
    })
  }
}
// 结束标签
function end (tag) {
  // console.log(tag)
  let element = stack.pop()
  createParent = stack[stack.length - 1]
  if (createParent) {
    element.parent = createParent.tag
    createParent.children.push(element)
  }
}

// 遍历
export function parseHTML (html) {
  //<div id="app">hello {{name}}</div>
  while (html) {
    // 判断标签<>
    let textEnd = html.indexOf('<') //0
    if (textEnd === 0) {
      // 开始标签的内容
      const startTagMatch = parseStartTag()
      if (startTagMatch) {
        start(startTagMatch.tagName, startTagMatch.attrs)
        continue
      }

      // 结束标签
      let endTagMatch = html.match(endTag)
      if (endTagMatch) {
        advance(endTagMatch[0].length)
        end(endTagMatch[1])
        continue
      }
    }
    // 文本
    let text
    if (textEnd > 0) {
      text = html.substring(0, textEnd)
      // console.log(text)
    }
    if (text) {
      advance(text.length)
      charts(text)
    }
  }
  function parseStartTag () {
    // debugger
    const start = html.match(startTagOpen)
    if (start) {

      // console.log(start)
      //创建ast语法树
      let match = {
        tagName: start[1],
        attrs: []
      }
      // 刪除开始标签
      advance(start[0].length)
      //属性
      //注意多个遍历
      //注意 >
      let attr
      let end
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        // console.log(attr)
        match.attrs.push({ name: attr[1], value: attr[3] || attr[4] || attr[5] })
        advance(attr[0].length)

      }
      if (end) {
        // console.log(end)
        advance(end[0].length)
        return match
      }
    }

  }
  function advance (n) {
    html = html.substring(n)
    // console.log(html)
  }
  console.log(root)
  return root
}
