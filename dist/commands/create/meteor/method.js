'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = meteorMethod;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _method = require('../../../templates/meteor/method');

var _method2 = _interopRequireDefault(_method);

var _create_file = require('../../../utils/create_file');

var _create_file2 = _interopRequireDefault(_create_file);

var _pathes = require('../../../utils/pathes');

var _pathes2 = _interopRequireDefault(_pathes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function meteorMethod(_ref) {
  var name = _ref.name,
      params = _ref.params;

  var filePath = _path2.default.join(_pathes2.default.meteor.methods, name + '.js');

  console.log('Creating method...'.white);
  (0, _create_file2.default)({
    filePath: filePath,
    content: (0, _method2.default)({ name: name, params: params })
  });
}