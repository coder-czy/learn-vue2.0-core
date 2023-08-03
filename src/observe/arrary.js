export const arrayPrototype = Object.assign(Array.prototype, {})

const arrMethods = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse',
]

arrMethods.forEach(method => {
  let origin = arrayPrototype[method]
  let res = origin.bind(this, arguments)
  return res
})

// [
//   'push',
//   'pop',
//   'shift',
//   'unshift',
//   'splice',
//   'sort',
//   'reverse',
// ]
