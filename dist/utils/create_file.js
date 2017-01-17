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

var _environment = require('./environment');

var _packageJson = require('./packageJson');

var _meteorRoot = require('./meteorRoot');

var _meteorRoot2 = _interopRequireDefault(_meteorRoot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createFile(_ref) {
  var filePath = _ref.filePath,
      content = _ref.content;

  console.log(_safe2.default.white('Creating ' + _path2.default.basename(filePath)));

  try {
    var root = void 0;
    if ((0, _environment.isMeteor)()) root = (0, _meteorRoot2.default)();else if ((0, _environment.isReactNative)()) root = (0, _packageJson.getAppMainPackagePath)();

    _fs2.default.writeFileSync(_path2.default.join(root, filePath), content);
  } catch (error) {
    console.log(_safe2.default.red('Couldn\'t create file due to:'));
    console.log(error);
    process.exit(1);
  }

  console.log(_safe2.default.green('Successfully created ' + filePath));
}