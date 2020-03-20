class Watcher {
  constructor(vm, expOrFn, cb) {
    this.vm = vm
    this.cb = cb;
    this.getter = parsePath(expOrFn)
    this.value = this.get()
  }

  get() {
    window.target = this;
    const vm = this.vm;
    let value = this.getter.call(vm, vm);
    console.log('watch get value', value)
    window.target = undefined;
    return value
  }

  update() {
    const oldValue = this.value;
    this.value = this.get()
    this.cb.call(this.vm, this.value, oldValue)
  }

}

const bailRE = /[^\w.$]/

function parsePath(path) {
  if (bailRE.test(path)) {
    return
  }
  const segments = path.split('.');
  console.log('parsePath', path)
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}