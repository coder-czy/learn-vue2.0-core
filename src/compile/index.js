import { parseHTML } from './parseAst'
import { generate } from './generage'

export function compileToFunction (el) {
  //1. 将html变成ast语法树
  let ast = parseHTML(el)

  // 2.ast语法树变成render函数 （1）ast语法树变成字符串 （2）字符串变成函数
  let code = generate(ast)

  //3.将render字符串变成函数
  let render = new Function(`with(this){return ${code}}`)
  return render
  //将render 函数变成 vnode

}

/**
 * <div id="app">hello {{name}}</div>
 * render(){ _c解析标签
 * return _c('div',{id:app},_v('hello'+_s(name)),_c)
 * }
 */