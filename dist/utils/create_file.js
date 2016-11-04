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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createFile(_ref) {
  var filePath = _ref.filePath,
      content = _ref.content;

  console.log(_safe2.default.white.bold('Creating ' + _path2.default.basename(name)));

  try {
    _fs2.default.writeFileSync(filePath, content);
  } catch (error) {
    console.log(_safe2.default.red.bold('Couldn\'t create file due to:'));
    console.log(error);
    process.exit(1);
  }

  console.log(_safe2.default.green.bold('Successfully created ' + filePath));
}