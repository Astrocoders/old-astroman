'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

exports.default = function (_ref) {
  var name = _ref.name;
  return '<Scene\n  key="' + (0, _lodash.lowerFirst)(name) + '"\n  wrapRouter={false}\n  component={' + name + '}\n/>';
};