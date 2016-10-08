(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _method = require('../api/method');

var _method2 = _interopRequireDefault(_method);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  createReport: {
    uri: '/report_groups/:report_group_id/reports',
    method: _method2.default.Post,
    wrap: function wrap(p) {
      return { report: p };
    }
  },
  updateReport: {
    uri: '/report_groups/:report_group_id/reports/:report_id/report_page',
    method: _method2.default.Put,
    wrap: function wrap(p) {
      return { report: p };
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


  makeBaseRequest(normalize(uri, params), method, options).send(wrap(params)).end(function (err, res) {
    console.log(res);
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
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _class;

var _takeInParams = require('../../lib/utils/take-in-params');

var _section = require('./section');

var _section2 = _interopRequireDefault(_section);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Report = (0, _takeInParams.mixinTakeInParams)(_class = function Report() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var id = _ref.id;
  var name = _ref.name;
  var reportGroupId = _ref.report_group_id;
  var timing = _ref.timing;
  var report_items = _ref.report_items;
  var sections = _ref.sections;

  _classCallCheck(this, Report);

  this.takeInParams({ id: id, name: name, reportGroupId: reportGroupId, timing: timing });
  this.sections = sections.map(function (s) {
    return new _section2.default(s);
  });
  console.log(this);
}) || _class;

exports.default = Report;

},{"../../lib/utils/take-in-params":9,"./section":8}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _class;

var _takeInParams = require('../../lib/utils/take-in-params');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Section = (0, _takeInParams.mixinTakeInParams)(_class = function Section() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var id = _ref.id;
  var name = _ref.name;
  var raw = _ref.raw;
  var html = _ref.html;
  var sectionId = _ref.section_id;

  _classCallCheck(this, Section);

  this.takeInParams({ id: id, name: name, raw: raw, html: html, sectionId: sectionId });
}) || _class;

exports.default = Section;

},{"../../lib/utils/take-in-params":9}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var mixinTakeInParams = exports.mixinTakeInParams = function mixinTakeInParams(klass) {
  klass.prototype.takeInParams = function (params) {
    for (var i in params) {
      this[i] = params[i];
    }
  };
};

},{}],10:[function(require,module,exports){
(function(global,factory){if(typeof define === 'function' && define.amd){define(['exports'],factory);}else if(typeof exports !== 'undefined'){factory(exports);}else {var mod={exports:{}};factory(mod.exports);global.decko = mod.exports;}})(this,function(exports){'use strict';exports.__esModule = true;var EMPTY={};var HOP=Object.prototype.hasOwnProperty;var fns={memoize:function memoize(fn){var opt=arguments.length <= 1 || arguments[1] === undefined?EMPTY:arguments[1];var cache=opt.cache || {};return function(){for(var _len=arguments.length,a=Array(_len),_key=0;_key < _len;_key++) {a[_key] = arguments[_key];}var k=String(a[0]);if(opt.caseSensitive === false)k = k.toLowerCase();return HOP.call(cache,k)?cache[k]:cache[k] = fn.apply(this,a);};},debounce:function debounce(fn,opts){if(typeof opts === 'function'){var p=fn;fn = opts;opts = p;}var delay=opts && opts.delay || opts || 0,args=undefined,context=undefined,timer=undefined;return function(){for(var _len2=arguments.length,a=Array(_len2),_key2=0;_key2 < _len2;_key2++) {a[_key2] = arguments[_key2];}args = a;context = this;if(!timer)timer = setTimeout(function(){fn.apply(context,args);args = context = timer = null;},delay);};},bind:function bind(target,key,_ref){var fn=_ref.value;return {configurable:true,get:function get(){var value=fn.bind(this);Object.defineProperty(this,key,{value:value,configurable:true,writable:true});return value;}};}};var memoize=multiMethod(fns.memoize),debounce=multiMethod(fns.debounce),bind=multiMethod(function(f,c){return f.bind(c);},function(){return fns.bind;});exports.memoize = memoize;exports.debounce = debounce;exports.bind = bind;exports['default'] = {memoize:memoize,debounce:debounce,bind:bind};function multiMethod(inner,deco){deco = deco || inner.decorate || decorator(inner);var d=deco();return function(){for(var _len3=arguments.length,args=Array(_len3),_key3=0;_key3 < _len3;_key3++) {args[_key3] = arguments[_key3];}var l=args.length;return (l < 2?deco:l > 2?d:inner).apply(undefined,args);};}function decorator(fn){return function(opt){return typeof opt === 'function'?fn(opt):function(target,key,desc){desc.value = fn(desc.value,opt,target,key,desc);};};}});


},{}],11:[function(require,module,exports){
'use strict';

var _class2, _desc, _value, _class3, _class4, _desc2, _value2, _class5;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _hub = require('../../lib/hub');

var _api = require('../../lib//api');

var _report = require('../../lib//api-configuration/report');

var _report2 = _interopRequireDefault(_report);

var _decko = require('decko');

var _fa = require('../../lib//components/fa');

var _fa2 = _interopRequireDefault(_fa);

var _condition = require('../../lib/models/condition');

var _report3 = require('../../lib/models/report');

var _report4 = _interopRequireDefault(_report3);

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

(0, _api.registerAPI)(_report2.default);

window.ReportEditorRunner = function () {
  function _class() {
    _classCallCheck(this, _class);
  }

  _createClass(_class, null, [{
    key: 'run',
    value: function run(dom, params) {
      ReactDOM.render(React.createElement(ReportEditor, params), dom);
    }
  }]);

  return _class;
}();

var ReportEditor = (0, _hub.receiver)(_class2 = (0, _hub.sender)(_class2 = (_class3 = function (_React$Component) {
  _inherits(ReportEditor, _React$Component);

  function ReportEditor() {
    _classCallCheck(this, ReportEditor);

    return _possibleConstructorReturn(this, (ReportEditor.__proto__ || Object.getPrototypeOf(ReportEditor)).apply(this, arguments));
  }

  _createClass(ReportEditor, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.takeInState(this.props);
      this.setState({ condition: _condition.Condition.Waiting });
    }
  }, {
    key: 'takeInState',
    value: function takeInState(rawParams) {
      var _ref = new _report4.default(rawParams);

      var reportId = _ref.id;
      var reportGroupId = _ref.reportGroupId;
      var name = _ref.name;
      var sections = _ref.sections;
      var timing = _ref.timing;

      this.setState({ reportId: reportId, reportGroupId: reportGroupId, name: name, sections: sections, timing: timing });
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

      to('changeRaw', function () {
        return _this2.changeSpecifySection.apply(_this2, arguments);
      });
    }
  }, {
    key: 'changeSpecifySection',
    value: function changeSpecifySection(sectionId, raw) {
      var sections = this.state.sections.map(function (s) {
        if (s.sectionId === sectionId) {
          s.raw = raw;
        }
        return s;
      });

      this.setState({ sections: sections });
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
      var report_id = _state.reportId;
      var report_group_id = _state.reportGroupId;
      var name = _state.name;
      var items = _state.items;

      this.sendTargetAPI({ report_id: report_id, report_group_id: report_group_id, name: name, items: items }).then(function (params) {
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
      return this.isPersisted ? this.fulItemForm : this.onlyNameForm;
    }
  }, {
    key: 'isPersisted',
    get: function get() {
      return !!this.state.reportId;
    }
  }, {
    key: 'sendTargetAPI',
    get: function get() {
      return this.isPersisted ? _api.API.updateReport : _api.API.createReport;
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
  }, {
    key: 'onlyNameForm',
    get: function get() {
      var name = this.state.name;


      return React.createElement(
        'div',
        { className: 'report-editor' },
        React.createElement(
          'section',
          { className: 'form-section' },
          React.createElement(
            'h1',
            { className: 'form-label' },
            'Report name'
          ),
          React.createElement('input', { type: 'text', value: name, placeholder: 'name required.', onChange: this.changeName })
        ),
        React.createElement(
          'section',
          { className: 'submit-section' },
          this.submitButton
        )
      );
    }
  }, {
    key: 'fulItemForm',
    get: function get() {
      return React.createElement(
        'div',
        { className: 'full-report-form' },
        this.onlyNameForm,
        React.createElement(
          'div',
          { className: 'report-editor' },
          this.state.sections.map(function (_ref2) {
            var name = _ref2.name;
            var sectionId = _ref2.sectionId;
            var raw = _ref2.raw;
            var html = _ref2.html;
            return React.createElement(ReportSectionEditor, { name: name, sectionId: sectionId, raw: raw, html: html });
          }),
          React.createElement(
            'section',
            { className: 'submit-section' },
            this.submitButton
          )
        )
      );
    }
  }]);

  return ReportEditor;
}(React.Component), (_applyDecoratedDescriptor(_class3.prototype, 'changeName', [_decko.bind], Object.getOwnPropertyDescriptor(_class3.prototype, 'changeName'), _class3.prototype), _applyDecoratedDescriptor(_class3.prototype, 'submit', [_decko.bind], Object.getOwnPropertyDescriptor(_class3.prototype, 'submit'), _class3.prototype)), _class3)) || _class2) || _class2;

var ReportSectionEditor = (0, _hub.sender)(_class4 = (_class5 = function (_React$Component2) {
  _inherits(ReportSectionEditor, _React$Component2);

  function ReportSectionEditor() {
    _classCallCheck(this, ReportSectionEditor);

    return _possibleConstructorReturn(this, (ReportSectionEditor.__proto__ || Object.getPrototypeOf(ReportSectionEditor)).apply(this, arguments));
  }

  _createClass(ReportSectionEditor, [{
    key: 'changeRaw',
    value: function changeRaw(e) {
      this.dispatch('changeRaw', this.props.sectionId, e.target.value);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var name = _props.name;
      var raw = _props.raw;
      var html = _props.html;

      return React.createElement(
        'div',
        null,
        React.createElement(
          'h1',
          null,
          name
        ),
        React.createElement(
          'textarea',
          { onChange: this.changeRaw },
          raw
        ),
        React.createElement(
          'section',
          null,
          html
        )
      );
    }
  }]);

  return ReportSectionEditor;
}(React.Component), (_applyDecoratedDescriptor(_class5.prototype, 'changeRaw', [_decko.bind], Object.getOwnPropertyDescriptor(_class5.prototype, 'changeRaw'), _class5.prototype)), _class5)) || _class4;

},{"../../lib//api":2,"../../lib//api-configuration/report":1,"../../lib//components/fa":4,"../../lib/hub":5,"../../lib/models/condition":6,"../../lib/models/report":7,"decko":10}]},{},[11]);
