let id = 0
class Dep {
  constructor() {
    this.id = id++
    this.subs = []
  }
  // 收集watcher
  depend () {
    // watcher可以存放dep
    // 双向记忆
    // this.subs.push()
    Dep.target.addDep(this)
  }
  addSub (watcher) {
    this.subs.push(watcher)
  }
  //更新
  notify () {
    this.subs.forEach(watcher => {
      watcher.update()
    })
  }
}

//添加watcher
Dep.target = null
export function pushTarget (watcher) {
  Dep.target = watcher
}

export function popTarget (watcher) {
  Dep.target = null
}

export default Dep