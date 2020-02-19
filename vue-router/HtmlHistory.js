class Html5History {
  constructor(router, options) {
    this.router = router
    this.onComplete = null
    //  事件监听
    window.addEventListener('popstate', this.onChange)
    window.addEventListener('load', this.onChange)

    this.addEvent()
    // 监听自定义的事件
    window.addEventListener('replaceState', this.onChange)
    window.addEventListener('pushState', this.onChange)
  }

  addEvent() {
    const listenWrapper = function (type) {
      // 原生的对应的方法
      const _func = history[type]
      return function () {
        // 执行_func 事件
        _func.apply(this, arguments);
        console.log('this', this, arguments)
        // 自定义事件（pushState,replaceState）
        const e = new Event(type);
        e.arguments = arguments
        // 触发事件
        window.dispatchEvent(e)
      };
    };
    // 重写了history的pushState方法及replaceState方法：每次执行此方法的时候，需要去监听对应的事件，执行onChange方法
    history.pushState = listenWrapper('pushState')
    history.replaceState = listenWrapper('replaceState')
  }

  onChange() {
    // 匹配失败重定向
    if (location.pathname === '/' || !this.router._cache[location.pathname]) {
      window.history.pushState(null, '', `${window.location.origin}${this.router._defaultRouter}`);
    } else {
      this.router._wrapper.innerHTML = this.router._cache[location.pathname]
      this.onComplete && this.onComplete() && (this.onComplete = null)
    }
  }

  push(url, onComplete) {
    window.history.pushState(null, '', `${window.location.origin}${url}`)
    onComplete && (this.onComplete = onComplete)
  }

  replace(url, onComplete) {
    window.history.replaceState(null, null, `${window.location.origin}${url}`)
    onComplete && (this.onComplete = onComplete)
  }

  stop() {
    window.removeEventListener('load', this.onChange)
    window.removeEventListener('popState', this.onChange)
    window.removeEventListener('replaceState', this.onChange)
    window.removeEventListener('pushState', this.onChange)
  }
}