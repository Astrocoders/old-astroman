'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = readFile;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _safe = require('colors/safe');

var _safe2 = _interopRequireDefault(_safe);

var _packageJson = require('./packageJson');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function readFile(_ref) {
  var filePath = _ref.filePath;

  try {
    return _fs2.default.readFileSync(_path2.default.join((0, _packageJson.getAppMainPackagePath)(), filePath)).toString();
  } catch (error) {
    console.log(_safe2.default.red.bold('Couldn\'t read file due to:'));
    console.log(error);
    process.exit(1);
  }
}