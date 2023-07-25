import { initGlobApi } from "./global-api/index"
import { initMixin } from "./init"
import { lifecycleMixin } from "./lifecycle"
import { renderMixin } from "./vnode/index"

function Vue (options) {//用户选项
  // debugger
  this._init(options)
}
initMixin(Vue)
lifecycleMixin(Vue)//添加生命周期
renderMixin(Vue)//添加_render

//全局方法  vue.mixin vue.component vue.extent
initGlobApi(Vue)
export default Vue