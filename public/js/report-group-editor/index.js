(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _method = require('./method');

var _method2 = _interopRequireDefault(_method);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  createReportGroup: {
    uri: '/report_groups',
    method: _method2.default.Post
  }
};

},{"./method":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strike = strike;

var _configuration = require('./configuration');

var _configuration2 = _interopRequireDefault(_configuration);

var _method = require('./method');

var _method2 = _interopRequireDefault(_method);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var API = {};
exports.default = API;


(function () {
  var _loop = function _loop(i) {
    API[i] = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return strike.apply(undefined, [_configuration2.default[i]].concat(args));
    };
  };

  for (var i in _configuration2.default) {
    _loop(i);
  }
})();

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


  makeBaseRequest(normalize(uri, params), method, options).send(wrap(params)).end(function (err, res) {
    if (!!err) {
      if (!res.body || !res.body.errors) {
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
  return uri.replace(/:([a-z_]+)/ig, function (_, n) {
    return params[n];
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

},{"./configuration":1,"./method":3}],3:[function(require,module,exports){
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
(function(global,factory){if(typeof define === 'function' && define.amd){define(['exports'],factory);}else if(typeof exports !== 'undefined'){factory(exports);}else {var mod={exports:{}};factory(mod.exports);global.decko = mod.exports;}})(this,function(exports){'use strict';exports.__esModule = true;var EMPTY={};var HOP=Object.prototype.hasOwnProperty;var fns={memoize:function memoize(fn){var opt=arguments.length <= 1 || arguments[1] === undefined?EMPTY:arguments[1];var cache=opt.cache || {};return function(){for(var _len=arguments.length,a=Array(_len),_key=0;_key < _len;_key++) {a[_key] = arguments[_key];}var k=String(a[0]);if(opt.caseSensitive === false)k = k.toLowerCase();return HOP.call(cache,k)?cache[k]:cache[k] = fn.apply(this,a);};},debounce:function debounce(fn,opts){if(typeof opts === 'function'){var p=fn;fn = opts;opts = p;}var delay=opts && opts.delay || opts || 0,args=undefined,context=undefined,timer=undefined;return function(){for(var _len2=arguments.length,a=Array(_len2),_key2=0;_key2 < _len2;_key2++) {a[_key2] = arguments[_key2];}args = a;context = this;if(!timer)timer = setTimeout(function(){fn.apply(context,args);args = context = timer = null;},delay);};},bind:function bind(target,key,_ref){var fn=_ref.value;return {configurable:true,get:function get(){var value=fn.bind(this);Object.defineProperty(this,key,{value:value,configurable:true,writable:true});return value;}};}};var memoize=multiMethod(fns.memoize),debounce=multiMethod(fns.debounce),bind=multiMethod(function(f,c){return f.bind(c);},function(){return fns.bind;});exports.memoize = memoize;exports.debounce = debounce;exports.bind = bind;exports['default'] = {memoize:memoize,debounce:debounce,bind:bind};function multiMethod(inner,deco){deco = deco || inner.decorate || decorator(inner);var d=deco();return function(){for(var _len3=arguments.length,args=Array(_len3),_key3=0;_key3 < _len3;_key3++) {args[_key3] = arguments[_key3];}var l=args.length;return (l < 2?deco:l > 2?d:inner).apply(undefined,args);};}function decorator(fn){return function(opt){return typeof opt === 'function'?fn(opt):function(target,key,desc){desc.value = fn(desc.value,opt,target,key,desc);};};}});


},{}],5:[function(require,module,exports){
'use strict';

var _desc, _value, _class2, _desc2, _value2, _class3;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _api = require('../../lib//api');

var _api2 = _interopRequireDefault(_api);

var _decko = require('decko');

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

window.ReportGroupEditorRunner = function () {
  function _class() {
    _classCallCheck(this, _class);
  }

  _createClass(_class, null, [{
    key: 'run',
    value: function run(dom, params) {
      ReactDOM.render(React.createElement(ReportGroupEditor, params), dom);
    }
  }]);

  return _class;
}();

var ReportGroupEditor = (_class2 = function (_React$Component) {
  _inherits(ReportGroupEditor, _React$Component);

  function ReportGroupEditor() {
    _classCallCheck(this, ReportGroupEditor);

    return _possibleConstructorReturn(this, (ReportGroupEditor.__proto__ || Object.getPrototypeOf(ReportGroupEditor)).apply(this, arguments));
  }

  _createClass(ReportGroupEditor, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({
        name: '',
        timing: '',
        items: []
      });
    }
  }, {
    key: 'changeTiming',
    value: function changeTiming(timing) {
      console.log(timing);
      this.setState({ timing: timing });
    }
  }, {
    key: 'render',
    value: function render() {
      var dayOfWeek = this.props.dayOfWeek;


      return React.createElement(
        'div',
        { className: 'report-group-editor' },
        React.createElement(
          'section',
          { className: 'form-section' },
          React.createElement(
            'h1',
            { className: 'form-label' },
            'Report group name'
          )
        ),
        React.createElement(
          'section',
          { className: 'form-section' },
          React.createElement(
            'h1',
            { className: 'form-label' },
            'Timing to put in a period'
          ),
          React.createElement(TimingSelector, { dayOfWeek: dayOfWeek, onChange: this.changeTiming })
        ),
        React.createElement(
          'section',
          { className: 'form-section' },
          React.createElement(
            'h1',
            { className: 'form-label' },
            'Items in a report'
          )
        )
      );
    }
  }]);

  return ReportGroupEditor;
}(React.Component), (_applyDecoratedDescriptor(_class2.prototype, 'changeTiming', [_decko.bind], Object.getOwnPropertyDescriptor(_class2.prototype, 'changeTiming'), _class2.prototype)), _class2);
var TimingSelector = (_class3 = function (_React$Component2) {
  _inherits(TimingSelector, _React$Component2);

  function TimingSelector() {
    _classCallCheck(this, TimingSelector);

    return _possibleConstructorReturn(this, (TimingSelector.__proto__ || Object.getPrototypeOf(TimingSelector)).apply(this, arguments));
  }

  _createClass(TimingSelector, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({
        timing: '',
        dayNumber: 10
      });
    }
  }, {
    key: 'inform',
    value: function inform() {
      var _state = this.state;
      var timing = _state.timing;
      var dayNumber = _state.dayNumber;

      this.props.dayOfWeek.indexOf(timing) >= 0 ? this.props.onChange(timing) : this.props.onChange(dayNumber);
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
      var _state2 = this.state;
      var timing = _state2.timing;
      var dayNumber = _state2.dayNumber;


      return React.createElement(
        'div',
        { className: 'timing-selector' },
        this.days,
        React.createElement(
          'label',
          { key: 'dayNumber' },
          React.createElement(
            'span',
            { className: 'input-input' },
            React.createElement('input', { type: 'radio', value: 'number', checked: timing === 'number',
              onChange: this.changeRadio })
          ),
          React.createElement(
            'span',
            { className: 'input-label' },
            React.createElement('input', { type: 'text', value: dayNumber, disabled: timing !== 'number',
              onChange: this.changeDayNumber }),
            '日'
          )
        )
      );
    }
  }, {
    key: 'days',
    get: function get() {
      var _this3 = this;

      var timing = this.state.timing;


      return this.props.dayOfWeek.map(function (day) {
        return React.createElement(
          'label',
          { key: day },
          React.createElement(
            'span',
            { className: 'input-input' },
            React.createElement('input', { type: 'radio', value: day, checked: timing === day, onChange: _this3.changeRadio })
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
}(React.Component), (_applyDecoratedDescriptor(_class3.prototype, 'inform', [_decko.bind], Object.getOwnPropertyDescriptor(_class3.prototype, 'inform'), _class3.prototype), _applyDecoratedDescriptor(_class3.prototype, 'changeRadio', [_decko.bind], Object.getOwnPropertyDescriptor(_class3.prototype, 'changeRadio'), _class3.prototype), _applyDecoratedDescriptor(_class3.prototype, 'changeDayNumber', [_decko.bind], Object.getOwnPropertyDescriptor(_class3.prototype, 'changeDayNumber'), _class3.prototype)), _class3);

},{"../../lib//api":2,"decko":4}]},{},[5]);
