export const sender = (klass) => {
  klass.prototype.dispatch = function (event, ...args) {
    return (this.context.emitter || this.emitter).emit(event, ...args);
  }
}

export const receiver = (klass) => {
  let componentWillMount = klass.prototype.componentWillMount

  klass.prototype.componentWillMount = function () {
    componentWillMount && componentWillMount.call(this)

    if (!this.emitter) {
      this.emitter = this.context.emitter || new EventEmitter();
      this.listen((eventName, callback) => {
        this.emitter.on(eventName, callback);
      });
    }
  }

  let getChildContext = klass.prototype.getChildContext

  klass.prototype.getChildContext = function () {
    let base = getChildContext || this.getChildContext

    return Object.assign(base, { emitter: this.context.emitter || this.emitter });
  }
}
