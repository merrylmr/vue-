class Observer {
  constructor(value) {
    this.value = value
    this.dep = new Dep()
    // def(value, '__obj__', this)
    // value.__obj__ = this
    if (Array.isArray(value)) {
    } else {
      this.walk(value)
    }
  }

  walk(obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }
}

/**
 * define a reactive property on an Object
 * @param obj
 * @param key
 * @param val
 * @returns {*}
 */
function defineReactive(obj, key, val) {
  if (arguments.length = 2) {
    val = obj[key]
  }
  // 边界判断
  console.log('val', val)
  // if (typeof val === 'object') {
  //   new Observer(val)
  // }
  const dep = new Dep()
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log('get 数据')
      dep.depend()
      return val
    },
    set(v) {
      if (val === v) {
        return
      }
      console.log('set 数据')
      val = v
      dep.notify()
    }
  })
}
