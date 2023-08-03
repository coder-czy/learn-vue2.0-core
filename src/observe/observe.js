import Observer from './observer'
export default function observe (data) {
  // 判断
  if (typeof data != 'object' || data == null) return
  // 对象
  let ob
  if (data.__ob__) {
    ob = data.__ob__
  } else {
    ob = new Observer(data)
  }
  return ob

}
