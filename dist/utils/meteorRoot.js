'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getMeteorRootPath;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _findConfig = require('find-config');

var _findConfig2 = _interopRequireDefault(_findConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getMeteorRootPath() {
  return (0, _findConfig2.default)('.meteor/packages').replace('.meteor/packages', '');
}