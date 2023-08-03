export default function (object, key, value, enumerable) {
  Object.defineProperty(object, key, {
    value, enumerable
  })
}