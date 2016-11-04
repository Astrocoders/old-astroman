'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = component;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _safe = require('colors/safe');

var _safe2 = _interopRequireDefault(_safe);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _component = require('../../../templates/component');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pathes = {
  components: 'src/Components'
};

function component(_ref) {
  var name = _ref.name;

  var filePath = _path2.default.join(pathes.components, name + '.js');
  try {
    _fs2.default.writeFileSync(filePath, (0, _component2.default)({ name: name }));
  } catch (error) {
    console.log(_safe2.default.red.bold('Couldn\'t create file due to:'));
    console.log(error);
    process.exit(1);
  }

  console.log(_safe2.default.green.bold('Component created at ' + filePath));
}