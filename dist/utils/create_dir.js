'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createDir;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _safe = require('colors/safe');

var _safe2 = _interopRequireDefault(_safe);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _packageJson = require('./packageJson');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createDir(_ref) {
  var dirPath = _ref.dirPath;

  try {
    _fs2.default.mkdirSync(_path2.default.join((0, _packageJson.getAppMainPackagePath)(), dirPath));
  } catch (error) {
    // not a problem!
    if (error.code === 'EEXIST') return;
    console.log(_safe2.default.red.bold('Couldn\'t create directory due to:'));
    console.log(error);
    process.exit(1);
  }
}