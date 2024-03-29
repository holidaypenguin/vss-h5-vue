
class Defer {
  constructor () {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
  }
}

export default {
  defer () {
    return new Defer()
  },
}
