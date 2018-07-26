import cloneDeep from 'lodash/clonedeep'

// 仅仅是让一个对象有初始值，不至于出现undefined错误，以及使vue能跟踪对象上的属性
class Model {
  constructor (_model) {
    this._model = _model
  }

  parse (data = {}, param = {}) {
    return Object.assign(cloneDeep(this._model), data)
  }

  // dispose (data, param = {}) {
  // }
}

export default Model
