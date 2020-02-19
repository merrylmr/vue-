// import HashHistory from './HashHistory'
// import Html5History from './HtmlHistory'
class Router {
  constructor(wrapper, options, mode = 'hash') {
    this._wrapper = document.querySelector(`#${wrapper}`)
    if (!this._wrapper) {
      throw new Error('根元素必传')
    }
    this._supportsReplaceState = window.history && typeof window.history.replaceState === 'function'
    // 匹配路径
    this._cache = {}
    this._defaultRouter = options.routes[0].path
    // 添加路由map
    this.route(options.routes)

    //  启用模式
    this._history = (mode !== 'hash' && this._supportsReplaceState) ? new Html5History(this, options) : new HashHistory(this, options)
  }

  // 添加路由
  route(routes) {
    routes.forEach(item => this._cache[item.path] = item.component)
  }

  go(n = 1) {
    window.history.go(n)
  }

  back(n = -1) {
    window.history.go(n)
  }

  push(url, onComplete) {
    this._history.push(url, onComplete)
  }

  replace(url, onComplete) {
    this._history.replace(url, onComplete)
  }

  stop() {
    this._history.stop()
  }
}