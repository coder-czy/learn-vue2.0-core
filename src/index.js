import { initMixin } from "./init"
import { lifecycleMixin } from "./lifecycle"
import { renderMixin } from "./vnode/index"

function Vue (options) {//用户选项
  // debugger
  this._init(options)
}
initMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)
export default Vue