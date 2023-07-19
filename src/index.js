import { initMixin } from "./init"

function Vue (options) {//用户选项
  debugger
  this._init(options)
}
initMixin(Vue)
export default Vue