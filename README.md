# vue2.0 源码学习

## 总结

- object.defineProperty 缺点:只能对对象的某个属性进行劫持
- 重写数组 7 种方法
- vue 初次渲染 -> 先初始化数据 -> 将模板进行编译 -> 变成 render() -> 生成虚拟节点 -> 变成真实 DOM -> 放到页面
- vue 渲染流程 -> 数据初始化 -> 对模块进行编译 -> 变成 render 函数 —> 通过 render 函数变成 vnode -> vnode 变成真实 dom ->放到页面
- vue 生命周期 实现原理发布订阅模式，先订阅好后续会触发此方法，将生命周期合并成一个数组[created1,created2],
- Vue.Mixin()混入 ，合并对象
- 自动更新问题: 1.数据变化，自动更新视图 vm.\_update(vm.\_render())
  2.vue 中更新组建策略是：以组件单位，给每一组件添加一个 watcher
- 对象收集依赖
- dep、watcher 关系
- 数组收集：1、给所有对象类型增加一个 dep 2、获取数组的值会调用 get 方法，记住这个数组渲染的 watcher，需要获取当前 dep，当对数组取值时，让数组的 dep 记住这个 watcher，更新数组调用数组方法时，找到这个 watcher 进行更新
