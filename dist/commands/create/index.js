'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = exports.describe = exports.command = undefined;

var _safe = require('colors/safe');

var _safe2 = _interopRequireDefault(_safe);

var _index = require('./react-native/index');

var reactNativeCmds = _interopRequireWildcard(_index);

var _index2 = require('./meteor/index');

var meteorCmds = _interopRequireWildcard(_index2);

var _environment = require('../../utils/environment');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var command = exports.command = 'create <name> [value] [params]';
var describe = exports.describe = 'scaffolds a file';

var handler = exports.handler = function handler(argv) {
  if ((0, _environment.isReactNative)()) {
    if (!reactNativeCmds[argv.name]) {
      console.log(_safe2.default.red(argv.name + ' doesn\'t seem to be a create sub-command.'));
      return;
    }
    reactNativeCmds[argv.name]({ name: argv.value });
    return;
  } else if ((0, _environment.isMeteor)()) {
    if (!meteorCmds[argv.name]) {
      console.log(_safe2.default.red(argv.name + ' doesn\'t seem to be a create sub-command.'));
      return;
    }
    meteorCmds[argv.name]({ name: argv.value, params: (argv.params || '').split(',') });
    return;
  }

  console.log(_safe2.default.red('You do not seem to be in any of the supported envs'));
};