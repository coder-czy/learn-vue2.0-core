# vue2.0 数据响应式原理

## Vue 会监视 data 中所有层次的数据

### 如何监测对象中的数据？

#### 通过 setter 实现监视，且要在 new Vue 时就传入要监测的数据

1. 对象中后追加的属性，Vue 默认不做响应式处理
2. 如需给后添加的属性做响应式，需要使用如下 API

```js
Vue.set(target, propertyName / index, value)
vm.$set(target, propertyName / index, value)
```

### 如何检测数组中的数据？

#### 通过包裹数组更新元素的方法实现，本质就是做了两件事

1. 调用原生数组对应的方法对数组进行更新
2. 重新解析模板，进而更新页面

#### 在 Vue 修改数组中的某个元素一定要用如下方法

1. API: push() pop() shift() unshift() splice() sort() reverse()
2. Vue.set() 或 vm.$set

## 注意

#### Vue.set() 和 vm.$set() 不能给 vm 或 vm 的根数据对象添加属性
