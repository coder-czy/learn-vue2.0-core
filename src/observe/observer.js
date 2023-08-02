import defineReactive from './defineReactive'
export default class Observer {
  constructor(data) {
    Object.defineProperty(data, '__ob__', {
      value: this,
      enumerable: false
    })
    this.walk(data)
  }

  walk (data) {
    for (const key in data) {
      defineReactive(data, key)
    }
  }
}