'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createFile;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _safe = require('colors/safe');

var _safe2 = _interopRequireDefault(_safe);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _packageJson = require('./packageJson');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createFile(_ref) {
  var filePath = _ref.filePath,
      content = _ref.content;

  console.log(_safe2.default.white('Creating ' + _path2.default.basename(filePath)));

  try {
    _fs2.default.writeFileSync(_path2.default.join((0, _packageJson.getAppMainPackagePath)(), filePath), content);
  } catch (error) {
    console.log(_safe2.default.red('Couldn\'t create file due to:'));
    console.log(error);
    process.exit(1);
  }

  console.log(_safe2.default.green('Successfully created ' + filePath));
}