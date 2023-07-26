import { popTarget, pushTarget } from "./dep"

// 1、通过watcher实现更新
let id = 0
class watcher {
  constructor(vm, updateComponent, cb, options) {
    this.vm = vm
    this.exprOrfn = updateComponent
    this.cb = cb
    this.options = options
    this.id = id++
    this.deps = []  // save dep
    this.depsId = new Set()

    // 判断
    if (typeof updateComponent === 'function') {
      this.getter = updateComponent  //更新视图

    }
    //更新视图
    this.get()
  }
  addDep (dep) {
    // 1.去重
    let id = dep.id
    if (this.depsId.has(id)) {
      this.deps.push(dep)
      this.depsId.add(id)
      dep.addSub(this)
    }

  }
  // 初次渲染
  get () {
    pushTarget()//给dep添加watcher
    this.getter()//渲染页面 vm._update(vm._render())
    popTarget() //给dep取消watcher
  }
  //更新
  update () {
    this.getter()
  }
}

export default watcher

//收集依赖  Vue dep watcher data
//dep : dep和data中的属性是一一对应的
//watcher：在视图上用几个就有几个watcher
//dep与watcher：一对多  dep.name = [w1,w2]


// 实现对象收集依赖