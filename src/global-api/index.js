import { mergeOptions } from '../utils/index'
export function initGlobApi (Vue) {
  //源码
  //{created:{a,b,c},watch:[a,b],data}
  Vue.options = {}
  Vue.Mixin = function (mixin) {
    //对象的合并
    this.options = mergeOptions(this.options, mixin)
    // console.log(this.options)
  }
}