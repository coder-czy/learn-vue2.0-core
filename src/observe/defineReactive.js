import observe from './observe'

export default function defineReactive (data, key, value) {
  if (arguments.length === 2) {
    value = data[key]
  }
  let childOb = observe(data)
  Object.defineProperty(data, key, {
    configurable: true,
    enumerable: true,
    get () {
      console.log(`获取值${key}:${value}`)
      return value
    },
    set (newValue) {
      if (value === newValue) return
      console.log(`设置值${key}:${newValue}`)
      value = newValue
      childOb = observe(newValue)
    }
  })

}