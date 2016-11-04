'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = component;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _safe = require('colors/safe');

var _safe2 = _interopRequireDefault(_safe);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _actions = require('../../../templates/redux/actions');

var _actions2 = _interopRequireDefault(_actions);

var _reducer = require('../../../templates/redux/reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _Container = require('../../../templates/redux/Container');

var _Container2 = _interopRequireDefault(_Container);

var _create_file = require('../../../utils/create_file');

var _create_file2 = _interopRequireDefault(_create_file);

var _create_dir = require('../../../utils/create_dir');

var _create_dir2 = _interopRequireDefault(_create_dir);

var _packageJson = require('../../../utils/packageJson');

var _js_code = require('../../../utils/js_code');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pathes = {
  redux: 'src/redux'
};

function component(_ref) {
  var name = _ref.name;

  var dirPath = _path2.default.join(pathes.redux, '' + name);
  var lowerCasedName = name.toLowerCase();

  (0, _create_dir2.default)({
    dirPath: dirPath
  });

  var reduxFiles = [{ path: _path2.default.join(dirPath, 'actions.js'), content: (0, _actions2.default)({ name: lowerCasedName }) }, { path: _path2.default.join(dirPath, 'reducer.js'), content: (0, _reducer2.default)({ name: lowerCasedName }) }, { path: _path2.default.join(dirPath, 'Container.js'), content: (0, _Container2.default)({ name: lowerCasedName }) }];

  reduxFiles.forEach(function (file) {
    (0, _create_file2.default)({
      filePath: file.path,
      content: file.content
    });
  });

  console.log(_safe2.default.white.bold('Updating redux\'s reducers...'));
  var reducersPath = _path2.default.join(pathes.redux, 'reducers/index.js');
  (0, _js_code.appendImportToFile)({
    namespace: lowerCasedName,
    importPath: _path2.default.join(dirPath, 'reducer.js'),
    fileToModify: reducersPath
  });
  // TODO: Create a helper to write in files without needing to put the absolute path
  _fs2.default.writeFileSync(_path2.default.join((0, _packageJson.getAppMainPackagePath)(), reducersPath), (0, _js_code.prependLine)({
    lineToPrepend: '  ' + lowerCasedName + ',',
    patternToPrepend: /\}\)/,
    fileContent: _fs2.default.readFileSync(_path2.default.join((0, _packageJson.getAppMainPackagePath)(), reducersPath)).toString()
  }));

  console.log(_safe2.default.green('Redux files for ' + name + ' were succesfully created.'));
}