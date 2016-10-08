export const mixinTakeInParams = (klass) => {
  klass.prototype.takeInParams = function (params) {
    for(let i in params){
      this[i] = params[i]
    }
  }
}
