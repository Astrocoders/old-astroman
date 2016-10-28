'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = scene;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _packageJson = require('../../utils/packageJson');

var _js_code = require('../../utils/js_code');

var _component = require('../../templates/component');

var _component2 = _interopRequireDefault(_component);

var _scene = require('../../templates/scene');

var _scene2 = _interopRequireDefault(_scene);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pathes = {
  scenes: 'src/Routes/',
  rootRouter: 'src/AppRouteRouter.js',
  rootScenes: 'src/Scenes.js'
};

function scene(_ref) {
  var name = _ref.name;

  var filePath = _path2.default.resolve((0, _packageJson.getAppMainPackagePath)(), pathes.scenes, name + '.js');

  console.log(('Creating scene ' + name + '...').white.bold);
  try {
    _fs2.default.writeFileSync(filePath, (0, _component2.default)({ name: name }));
  } catch (error) {
    console.log(('Couldn\'t create ' + filePath + ' due to:').red.bold);
    console.log(error);
    process.exit(1);
  }
  console.log('Success'.green.bold);

  var rootScenesPath = _path2.default.resolve((0, _packageJson.getAppMainPackagePath)(), pathes.rootScenes);
  var rootScenes = _fs2.default.readFileSync(_path2.default.resolve((0, _packageJson.getAppMainPackagePath)(), pathes.rootScenes)).toString();
  var newScenes = (0, _lodash2.default)(rootScenes).thru(function (fileContent) {
    return (0, _js_code.appendImport)({
      namespace: name,
      path: _path2.default.resolve('/', pathes.scenes, name),
      fileContent: fileContent
    });
  }).thru(function (fileContent) {
    return (0, _js_code.appendScene)({
      name: name,
      fileContent: fileContent
    });
  });

  console.log('Updating app scenes'.white.bold);
  try {
    _fs2.default.writeFileSync(rootScenesPath, newScenes);
  } catch (error) {
    console.log(('Couldn\'t create ' + filePath + ' due to:').red.bold);
    console.log(error);
    process.exit(1);
  }
  console.log('Success'.green.bold);
  console.log(('\nDone. Now go to ' + filePath.replace(process.cwd(), '') + ' and start rocking!').white);
}