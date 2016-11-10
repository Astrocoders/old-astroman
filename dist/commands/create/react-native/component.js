'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = component;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _component = require('../../../templates/component');

var _component2 = _interopRequireDefault(_component);

var _create_file = require('../../../utils/create_file');

var _create_file2 = _interopRequireDefault(_create_file);

var _pathes = require('../../../utils/pathes');

var _pathes2 = _interopRequireDefault(_pathes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function component(_ref) {
  var name = _ref.name;

  var filePath = _path2.default.join(_pathes2.default.components, name + '.js');

  (0, _create_file2.default)({
    filePath: filePath,
    content: (0, _component2.default)({ name: name })
  });
}