(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _method = require('../api/method');

var _method2 = _interopRequireDefault(_method);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  createReportConfiguration: {
    uri: '/report_configurations',
    method: _method2.default.Post,
    wrap: function wrap(p) {
      return { report_configuration: p };
    }
  },
  updateReportConfiguration: {
    uri: '/report_configurations/:id',
    method: _method2.default.Put,
    wrap: function wrap(p) {
      return { report_configuration: p };
    }
  }
};

},{"../api/method":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.API = undefined;
exports.registerAPI = registerAPI;
exports.strike = strike;

var _method = require('./method');

var _method2 = _interopRequireDefault(_method);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var API = exports.API = {};

function registerAPI(configuration) {
  var _loop = function _loop(i) {
    API[i] = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return strike.apply(undefined, [configuration[i]].concat(args));
    };
  };

  for (var i in configuration) {
    _loop(i);
  }
}

function strike(api) {
  var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  return new Promise(function (resolve, reject) {
    build(api, params, options, resolve, reject);
  });
}

function build(api, params, options, resolve, reject) {
  var uri = api.uri;
  var method = api.method;
  var _api$wrap = api.wrap;
  var wrap = _api$wrap === undefined ? function (p) {
    return p;
  } : _api$wrap;
  var _api$parse = api.parse;
  var parse = _api$parse === undefined ? function (p) {
    return p;
  } : _api$parse;
  var _api$parseError = api.parseError;
  var parseError = _api$parseError === undefined ? function (p) {
    return p;
  } : _api$parseError;


  console.log(params);
  makeBaseRequest(normalize(uri, params), method, options).send(wrap(params)).end(function (err, res) {
    console.log(err, res);
    if (!!err) {
      if (!res || !res.body || !res.body.errors) {
        reject({ errors: { unknown: [err] } });
      } else {
        reject(parseError(res.body));
      }
    } else {
      resolve(parse(res.body));
    }
  });
}

function normalize(uri, params) {
  return uri.replace(/:([a-zA-Z_]+)/ig, function (_, n) {
    return console.log(n), params[n];
  });
}

function makeBaseRequest(uri, method) {
  var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  var request = makeNoTokenBaseRequest(uri, method, options);

  return method === _method2.default.Get ? request : request.set('X-CSRF-Token', token());
}

function makeNoTokenBaseRequest(uri, method) {
  var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  var request = window.r;
  switch (method) {
    case _method2.default.Get:
      return request.get(uri);
    case _method2.default.Post:
      return request.post(uri);
    case _method2.default.Patch:
      return request.patch(uri);
    case _method2.default.Put:
      return request.put(uri);
    case _method2.default.Delete:
      return request.delete(uri);
  }
}

function token() {
  try {
    return document.getElementsByName('csrf-token')[0].getAttribute('content');
  } catch (ex) {
    return '';
  }
}

},{"./method":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  Get: 0,
  Post: 1,
  Patch: 2,
  Put: 3,
  Delete: 4
};

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Fa = function (_React$Component) {
  _inherits(Fa, _React$Component);

  function Fa() {
    _classCallCheck(this, Fa);

    return _possibleConstructorReturn(this, (Fa.__proto__ || Object.getPrototypeOf(Fa)).apply(this, arguments));
  }

  _createClass(Fa, [{
    key: "render",
    value: function render() {
      var p = this.props;
      var classes = ['fa'];
      classes.push("fa-" + p.icon);
      p.scale && classes.push("fa-" + p.scale + "x");
      (p.fixedWidth === undefined || p.fixedWidth === true) && classes.push('fa-fw');
      p.list && classes.push('fa-li');
      p.border && classes.push('fa-border');
      p.pull && classes.push("fa-pull-" + p.pull);
      p.animation && classes.push("fa-" + p.animation);
      p.rotate && classes.push("fa-rotate-" + p.rotate);
      p.flip && classes.push("fa-flip-" + p.flip);

      return React.createElement("i", { className: classes.join(' ') });
    }
  }]);

  return Fa;
}(React.Component);

exports.default = Fa;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var sender = exports.sender = function sender(klass) {
  klass.prototype.dispatch = function (event) {
    var _ref;

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return (_ref = this.context.emitter || this.emitter).emit.apply(_ref, [event].concat(args));
  };
};

var receiver = exports.receiver = function receiver(klass) {
  var componentWillMount = klass.prototype.componentWillMount;

  klass.prototype.componentWillMount = function () {
    var _this = this;

    componentWillMount && componentWillMount.call(this);

    if (!this.emitter) {
      this.emitter = this.context.emitter || new EventEmitter();
      this.listen(function (eventName, callback) {
        _this.emitter.on(eventName, callback);
      });
    }
  };

  var getChildContext = klass.prototype.getChildContext;

  klass.prototype.getChildContext = function () {
    var base = getChildContext || this.getChildContext;

    return Object.assign(base, { emitter: this.context.emitter || this.emitter });
  };
};

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Condition = exports.Condition = {
  Waiting: 0,
  Submitting: 1,
  Fail: 2,
  Success: 3
};

},{}],7:[function(require,module,exports){
(function(global,factory){if(typeof define === 'function' && define.amd){define(['exports'],factory);}else if(typeof exports !== 'undefined'){factory(exports);}else {var mod={exports:{}};factory(mod.exports);global.decko = mod.exports;}})(this,function(exports){'use strict';exports.__esModule = true;var EMPTY={};var HOP=Object.prototype.hasOwnProperty;var fns={memoize:function memoize(fn){var opt=arguments.length <= 1 || arguments[1] === undefined?EMPTY:arguments[1];var cache=opt.cache || {};return function(){for(var _len=arguments.length,a=Array(_len),_key=0;_key < _len;_key++) {a[_key] = arguments[_key];}var k=String(a[0]);if(opt.caseSensitive === false)k = k.toLowerCase();return HOP.call(cache,k)?cache[k]:cache[k] = fn.apply(this,a);};},debounce:function debounce(fn,opts){if(typeof opts === 'function'){var p=fn;fn = opts;opts = p;}var delay=opts && opts.delay || opts || 0,args=undefined,context=undefined,timer=undefined;return function(){for(var _len2=arguments.length,a=Array(_len2),_key2=0;_key2 < _len2;_key2++) {a[_key2] = arguments[_key2];}args = a;context = this;if(!timer)timer = setTimeout(function(){fn.apply(context,args);args = context = timer = null;},delay);};},bind:function bind(target,key,_ref){var fn=_ref.value;return {configurable:true,get:function get(){var value=fn.bind(this);Object.defineProperty(this,key,{value:value,configurable:true,writable:true});return value;}};}};var memoize=multiMethod(fns.memoize),debounce=multiMethod(fns.debounce),bind=multiMethod(function(f,c){return f.bind(c);},function(){return fns.bind;});exports.memoize = memoize;exports.debounce = debounce;exports.bind = bind;exports['default'] = {memoize:memoize,debounce:debounce,bind:bind};function multiMethod(inner,deco){deco = deco || inner.decorate || decorator(inner);var d=deco();return function(){for(var _len3=arguments.length,args=Array(_len3),_key3=0;_key3 < _len3;_key3++) {args[_key3] = arguments[_key3];}var l=args.length;return (l < 2?deco:l > 2?d:inner).apply(undefined,args);};}function decorator(fn){return function(opt){return typeof opt === 'function'?fn(opt):function(target,key,desc){desc.value = fn(desc.value,opt,target,key,desc);};};}});


},{}],8:[function(require,module,exports){
'use strict';

var _class2, _desc, _value, _class3, _class4, _desc2, _value2, _class5, _class6, _desc3, _value3, _class7;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _hub = require('../../lib/hub');

var _api = require('../../lib//api');

var _reportGroup = require('../../lib//api-configuration/report-group');

var _reportGroup2 = _interopRequireDefault(_reportGroup);

var _decko = require('decko');

var _fa = require('../../lib//components/fa');

var _fa2 = _interopRequireDefault(_fa);

var _condition = require('../../lib/models/condition');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(0, _api.registerAPI)(_reportGroup2.default);

window.ReportConfigurationEditorRunner = function () {
  function _class() {
    _classCallCheck(this, _class);
  }

  _createClass(_class, null, [{
    key: 'run',
    value: function run(dom, params) {
      ReactDOM.render(React.createElement(ReportConfigurationEditor, params), dom);
    }
  }]);

  return _class;
}();

var ReportConfigurationEditor = (0, _hub.receiver)(_class2 = (0, _hub.sender)(_class2 = (_class3 = function (_React$Component) {
  _inherits(ReportConfigurationEditor, _React$Component);

  function ReportConfigurationEditor() {
    _classCallCheck(this, ReportConfigurationEditor);

    return _possibleConstructorReturn(this, (ReportConfigurationEditor.__proto__ || Object.getPrototypeOf(ReportConfigurationEditor)).apply(this, arguments));
  }

  _createClass(ReportConfigurationEditor, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.takeInState(this.props);
      this.setState({ condition: _condition.Condition.Waiting });
    }
  }, {
    key: 'takeInState',
    value: function takeInState(rawParams) {
      var id = rawParams.id;
      var name = rawParams.name;
      var items = rawParams.report_section_configurations;
      var timing = rawParams.timing;

      this.setState({ id: id, name: name, items: items, timing: timing });
    }
  }, {
    key: 'listen',
    value: function listen(to) {
      var _this2 = this;

      to('updateItems', function (items) {
        return _this2.setState({ items: items });
      });
      to('updateTiming', function (timing) {
        return _this2.setState({ timing: timing });
      });
      to('changeName', function (name) {
        return _this2.setState({ name: name });
      });
    }
  }, {
    key: 'changeName',
    value: function changeName(e) {
      this.dispatch('changeName', e.target.value);
    }
  }, {
    key: 'submit',
    value: function submit() {
      var _this3 = this;

      this.setState({ condition: _condition.Condition.Submitting });

      var _state = this.state;
      var id = _state.id;
      var name = _state.name;
      var items = _state.items;
      var timing = _state.timing;

      items = items.filter(function (i) {
        return !i.del;
      });
      this.sendTargetAPI({ id: id, name: name, items: items, timing: timing }).then(function (params) {
        _this3.takeInState(params);
        _this3.setState({ condition: _condition.Condition.Waiting });
      }).catch(function (failure) {
        console.log('fail', failure);
        _this3.setState({ condition: _condition.Condition.Waiting });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state2 = this.state;
      var name = _state2.name;
      var items = _state2.items;
      var timing = _state2.timing;
      var dayOfWeek = this.props.dayOfWeek;


      return React.createElement(
        'div',
        { className: 'report-group-editor' },
        React.createElement(
          'div',
          { className: 'column-row' },
          React.createElement(
            'div',
            { className: 'column2' },
            React.createElement(
              'section',
              { className: 'form-section' },
              React.createElement(
                'h1',
                { className: 'form-label' },
                'Report group name'
              ),
              React.createElement('input', { type: 'text', value: name, placeholder: 'name required.', onChange: this.changeName })
            ),
            React.createElement(
              'section',
              { className: 'form-section' },
              React.createElement(
                'h1',
                { className: 'form-label' },
                'When put in a period'
              ),
              React.createElement(TimingSelector, { timing: timing, dayOfWeek: dayOfWeek })
            )
          ),
          React.createElement(
            'div',
            { className: 'column2' },
            React.createElement(
              'section',
              { className: 'form-section' },
              React.createElement(
                'h1',
                { className: 'form-label' },
                'Sections in a report'
              ),
              React.createElement(ItemList, { items: items })
            )
          )
        ),
        React.createElement(
          'section',
          { className: 'submit-section' },
          this.submitButton
        )
      );
    }
  }, {
    key: 'sendTargetAPI',
    get: function get() {
      return this.state.id ? _api.API.updateReportConfiguration : _api.API.createReportConfiguration;
    }
  }, {
    key: 'submitButton',
    get: function get() {
      if (this.state.condition === _condition.Condition.Submitting) {
        return React.createElement(
          'button',
          { className: 'submitting-button', disabled: true },
          React.createElement(_fa2.default, { icon: 'spinner', animation: 'pulse' }),
          'Sending...'
        );
      }

      return this.state.id ? React.createElement(
        'button',
        { className: 'submit-button', onClick: this.submit },
        React.createElement(_fa2.default, { icon: 'save' }),
        'Update!'
      ) : React.createElement(
        'button',
        { className: 'submit-button', onClick: this.submit },
        React.createElement(_fa2.default, { icon: 'save' }),
        'Create!'
      );
    }
  }]);

  return ReportConfigurationEditor;
}(React.Component), (_applyDecoratedDescriptor(_class3.prototype, 'changeName', [_decko.bind], Object.getOwnPropertyDescriptor(_class3.prototype, 'changeName'), _class3.prototype), _applyDecoratedDescriptor(_class3.prototype, 'submit', [_decko.bind], Object.getOwnPropertyDescriptor(_class3.prototype, 'submit'), _class3.prototype)), _class3)) || _class2) || _class2;

var ItemList = (0, _hub.sender)(_class4 = (_class5 = function (_React$Component2) {
  _inherits(ItemList, _React$Component2);

  function ItemList() {
    _classCallCheck(this, ItemList);

    return _possibleConstructorReturn(this, (ItemList.__proto__ || Object.getPrototypeOf(ItemList)).apply(this, arguments));
  }

  _createClass(ItemList, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.componentWillReceiveProps(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setState({ items: props.items.concat() });
    }
  }, {
    key: 'generateKey',
    value: function generateKey(id, index) {
      if (id && id !== '') {
        return 'id' + id;
      } else {
        return index;
      }
    }
  }, {
    key: 'detectDeleteButton',
    value: function detectDeleteButton(id, root, del, index) {
      var _this5 = this;

      if (root) {
        return React.createElement(
          'span',
          null,
          'Required.'
        );
      }

      return id ? React.createElement(
        'label',
        null,
        React.createElement(
          'span',
          { className: 'input-input' },
          React.createElement('input', { type: 'checkbox', value: id, checked: del, onChange: function onChange(e) {
              return _this5.toggleItem(index, e);
            } })
        ),
        React.createElement(
          'span',
          { className: 'input-label' },
          'Delete on update'
        )
      ) : React.createElement(
        'span',
        null,
        React.createElement(
          'button',
          { className: 'delete-button', onClick: function onClick() {
              return _this5.deleteItem(index);
            } },
          React.createElement(_fa2.default, { icon: 'trash' }),
          'Remove'
        )
      );
    }
  }, {
    key: 'inform',
    value: function inform() {
      this.dispatch('updateItems', this.state.items.concat());
      //this.props.onChange(this.state.items.concat())
    }
  }, {
    key: 'changeItem',
    value: function changeItem(index, e) {
      var items = this.state.items.concat();
      items[index].name = e.target.value;
      console.log(items);
      this.setState({ items: items }, this.inform);
    }
  }, {
    key: 'deleteItem',
    value: function deleteItem(index) {
      var items = this.state.items.concat();
      items.splice(index, 1);
      this.setState({ items: items }, this.inform);
    }
  }, {
    key: 'addItem',
    value: function addItem() {
      var items = this.state.items.concat();
      items.push({ id: '', name: '' });
      this.setState({ items: items }, this.inform);
    }
  }, {
    key: 'toggleItem',
    value: function toggleItem(index, e) {
      var items = this.state.items.concat();
      items[index].del = e.target.checked;
      this.setState({ items: items }, this.inform);
    }
  }, {
    key: 'itemMove',
    value: function itemMove(index, direction) {}
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'item-list' },
        this.items,
        React.createElement(
          'button',
          { 'class': 'add-button', onClick: this.addItem },
          React.createElement(_fa2.default, { icon: 'plus-circle' }),
          'Add a section'
        )
      );
    }
  }, {
    key: 'items',
    get: function get() {
      var _this6 = this;

      var items = this.state.items;


      if (items.length <= 1) {
        return React.createElement(
          'ul',
          { className: 'report-item-list' },
          React.createElement(
            'li',
            { className: 'report-item' },
            React.createElement(
              'div',
              { className: 'control' },
              React.createElement(
                'button',
                { className: 'move-button up', disabled: true },
                React.createElement(_fa2.default, { icon: 'arrow-up' })
              ),
              React.createElement(
                'button',
                { className: 'move-button down', disabled: true },
                React.createElement(_fa2.default, { icon: 'arrow-down' })
              )
            ),
            React.createElement(
              'div',
              { className: 'input' },
              React.createElement('input', { type: 'text', className: 'report-item-name', value: 'Not display a title on a report has just one section.', placeholder: 'no name', disabled: true })
            )
          )
        );
      }

      return React.createElement(
        'ul',
        { className: 'report-item-list' },
        items.map(function (_ref, index) {
          var id = _ref.id;
          var name = _ref.name;
          var root = _ref.root;
          var del = _ref.del;

          return React.createElement(
            'li',
            { className: 'report-item', key: _this6.generateKey(id, index) },
            React.createElement(
              'div',
              { className: 'control' },
              React.createElement(
                'button',
                { className: 'move-button up', onClick: function onClick() {
                    return _this6.itemMove(index, -1);
                  } },
                React.createElement(_fa2.default, { icon: 'arrow-up' })
              ),
              React.createElement(
                'button',
                { className: 'move-button down', onClick: function onClick() {
                    return _this6.itemMove(index, +1);
                  } },
                React.createElement(_fa2.default, { icon: 'arrow-down' })
              )
            ),
            React.createElement(
              'div',
              { className: 'input' },
              React.createElement('input', { type: 'text', className: 'report-item-name', value: name, placeholder: 'no name',
                onChange: function onChange(e) {
                  return _this6.changeItem(index, e);
                } })
            ),
            React.createElement(
              'div',
              { className: 'delete' },
              _this6.detectDeleteButton(id, root, del, index)
            )
          );
        })
      );
    }
  }]);

  return ItemList;
}(React.Component), (_applyDecoratedDescriptor(_class5.prototype, 'inform', [_decko.bind], Object.getOwnPropertyDescriptor(_class5.prototype, 'inform'), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, 'changeItem', [_decko.bind], Object.getOwnPropertyDescriptor(_class5.prototype, 'changeItem'), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, 'deleteItem', [_decko.bind], Object.getOwnPropertyDescriptor(_class5.prototype, 'deleteItem'), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, 'addItem', [_decko.bind], Object.getOwnPropertyDescriptor(_class5.prototype, 'addItem'), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, 'toggleItem', [_decko.bind], Object.getOwnPropertyDescriptor(_class5.prototype, 'toggleItem'), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, 'itemMove', [_decko.bind], Object.getOwnPropertyDescriptor(_class5.prototype, 'itemMove'), _class5.prototype)), _class5)) || _class4;

var TimingSelector = (0, _hub.sender)(_class6 = (_class7 = function (_React$Component3) {
  _inherits(TimingSelector, _React$Component3);

  function TimingSelector() {
    _classCallCheck(this, TimingSelector);

    return _possibleConstructorReturn(this, (TimingSelector.__proto__ || Object.getPrototypeOf(TimingSelector)).apply(this, arguments));
  }

  _createClass(TimingSelector, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props;
      var timing = _props.timing;
      var dayOfWeek = _props.dayOfWeek;


      if (!timing) {
        return this.setState({ timing: dayOfWeek[0], dayNumber: 1 });
      }

      isNaN(+timing) ? this.setState({ timing: timing, dayNumber: 1 }) : this.setState({ timing: 'number', dayNumber: timing });
    }
  }, {
    key: 'inform',
    value: function inform() {
      var _state3 = this.state;
      var timing = _state3.timing;
      var dayNumber = _state3.dayNumber;

      this.props.dayOfWeek.indexOf(timing) >= 0 ? this.dispatch('updateTiming', timing) : this.dispatch('updateTiming', dayNumber);
    }
  }, {
    key: 'changeRadio',
    value: function changeRadio(e) {
      this.setState({ timing: e.target.value }, this.inform);
    }
  }, {
    key: 'changeDayNumber',
    value: function changeDayNumber(e) {
      var dayNumber = this.state.dayNumber;

      var nextDayNumber = +e.target.value;

      isNaN(nextDayNumber) ? this.setState({ dayNumber: dayNumber }) : this.setState({ dayNumber: nextDayNumber }, this.inform);
    }
  }, {
    key: 'render',
    value: function render() {
      var _state4 = this.state;
      var timing = _state4.timing;
      var dayNumber = _state4.dayNumber;


      return React.createElement(
        'div',
        { className: 'timing-selector' },
        this.days,
        React.createElement(
          'label',
          { className: 'day-number', key: 'dayNumber' },
          React.createElement(
            'span',
            { className: 'input-input' },
            React.createElement('input', { type: 'radio', value: 'number', checked: timing === 'number',
              onChange: this.changeRadio })
          ),
          React.createElement(
            'span',
            { className: 'input-label day-number-input' },
            React.createElement('input', { type: 'text', value: dayNumber, disabled: timing !== 'number',
              onChange: this.changeDayNumber }),
            ' th of every month'
          )
        )
      );
    }
  }, {
    key: 'days',
    get: function get() {
      var _this8 = this;

      var timing = this.state.timing;


      return this.props.dayOfWeek.map(function (day) {
        return React.createElement(
          'label',
          { key: day },
          React.createElement(
            'span',
            { className: 'input-input' },
            React.createElement('input', { type: 'radio', value: day, checked: timing === day, onChange: _this8.changeRadio })
          ),
          React.createElement(
            'span',
            { className: 'input-label' },
            day
          )
        );
      });
    }
  }]);

  return TimingSelector;
}(React.Component), (_applyDecoratedDescriptor(_class7.prototype, 'inform', [_decko.bind], Object.getOwnPropertyDescriptor(_class7.prototype, 'inform'), _class7.prototype), _applyDecoratedDescriptor(_class7.prototype, 'changeRadio', [_decko.bind], Object.getOwnPropertyDescriptor(_class7.prototype, 'changeRadio'), _class7.prototype), _applyDecoratedDescriptor(_class7.prototype, 'changeDayNumber', [_decko.bind], Object.getOwnPropertyDescriptor(_class7.prototype, 'changeDayNumber'), _class7.prototype)), _class7)) || _class6;

},{"../../lib//api":2,"../../lib//api-configuration/report-group":1,"../../lib//components/fa":4,"../../lib/hub":5,"../../lib/models/condition":6,"decko":7}]},{},[8]);
