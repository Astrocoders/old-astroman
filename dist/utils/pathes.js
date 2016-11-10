'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROOT = 'app/';
exports.default = {
  components: _path2.default.resolve(ROOT, '/components'),
  redux: _path2.default.resolve(ROOT, '/redux'),
  scenes: _path2.default.resolve(ROOT, 'Routes/'),
  rootRouter: _path2.default.resolve(ROOT, '/Scenes/App/index.js'),
  rootScenes: _path2.default.resolve(ROOT, '/Scenes/index.js')
};