let uid = 0

class Dep {
  constructor(target, subs) {
    this.id = uid++;
    this.subs = [];
  }

  addSub(sub) {
    this.subs.push(sub)
  }

  removeSub(sub) {
    remove(this.subs, sub)
  }

  depend() {
    if (window.target) {
      // console.log('depend', window.target)
      this.addSub(window.target)
      console.log('depend', (this.subs).toString())
    }
  }

  notify() {
    console.log('notify')
    const subs = this.subs.slice();
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

Dep.target = null

Dep.target = null
const targetStack = []

function pushTarget(target) {
  targetStack.push(target)
  Dep.target = target
}

function popTarget() {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}

function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      arr.splice(index, 1)
    }
  }
}