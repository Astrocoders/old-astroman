'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = exports.describe = exports.command = undefined;

var _safe = require('colors/safe');

var _safe2 = _interopRequireDefault(_safe);

var _index = require('./react-native/index');

var reactNativeCmds = _interopRequireWildcard(_index);

var _lodash = require('lodash');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var command = exports.command = 'init <name> [value]';
var describe = exports.describe = 'boots a new project';

var handler = exports.handler = function handler(argv) {
  var name = (0, _lodash.camelCase)(argv.name);
  if (!reactNativeCmds[name]) {
    console.log(_safe2.default.red('Not supported ' + argv.name));
  }

  reactNativeCmds[name]({
    name: argv.value
  });
};