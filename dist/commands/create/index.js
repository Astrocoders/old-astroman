'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = exports.describe = exports.command = undefined;

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _scene = require('./scene');

var _scene2 = _interopRequireDefault(_scene);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var command = exports.command = 'create <name> [value]';
var describe = exports.describe = 'scaffolds a file';

var handler = exports.handler = function handler(argv) {
  switch (argv.name) {
    case 'scene':
      return (0, _scene2.default)({ name: argv.value });
  }
};