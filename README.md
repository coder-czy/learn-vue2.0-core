# vue2.0 源码学习

## 总结

- object.defineProperty 缺点:只能对对象的某个属性进行劫持
- 重写数组 7 种方法
- vue 初次渲染 -> 先初始化数据 -> 将模板进行编译 -> 变成 render() -> 生成虚拟节点 -> 变成真实 DOM -> 放到页面
- vue 渲染流程 -> 数据初始化 -> 对模块进行编译 -> 变成 render 函数 —> 通过 render 函数变成 vnode -> vnode 变成真实 dom ->放到页面
- vue 生命周期 实现原理
