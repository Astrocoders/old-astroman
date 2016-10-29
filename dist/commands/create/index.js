'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = exports.describe = exports.command = undefined;

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _index = require('./react-native/index');

var reactNativeCmds = _interopRequireWildcard(_index);

var _environment = require('../../utils/environment');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var command = exports.command = 'create <name> [value]';
var describe = exports.describe = 'scaffolds a file';

var handler = exports.handler = function handler(argv) {
  if ((0, _environment.isReactNative)()) {
    reactNativeCmds[argv.name]({ name: argv.value });
  }
};