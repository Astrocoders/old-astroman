'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROOT = 'app/';
exports.default = {
  components: _path2.default.join(ROOT, '/Components'),
  redux: _path2.default.join(ROOT, '/redux'),
  scenes: _path2.default.join(ROOT, 'Scenes/'),
  rootRouter: _path2.default.join(ROOT, '/Scenes/App/index.js'),
  rootScenes: _path2.default.join(ROOT, '/Scenes/index.js'),
  meteor: {
    methods: _path2.default.join(ROOT, '/imports/server/methods/'),
    publications: _path2.default.join(ROOT, '/imports/publications/methods/'),
    collections: _path2.default.join(ROOT, '/imports/both/collections/')
  }
};