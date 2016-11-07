'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = appendImport;

var _jscodeshift = require('jscodeshift');

var _jscodeshift2 = _interopRequireDefault(_jscodeshift);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _create_file = require('../create_file');

var _create_file2 = _interopRequireDefault(_create_file);

var _read_file = require('../read_file');

var _read_file2 = _interopRequireDefault(_read_file);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function appendImport(_ref) {
  var local = _ref.local,
      name = _ref.name,
      filePath = _ref.filePath;

  var fileContent = (0, _read_file2.default)({ filePath: filePath });
  var newImport = _jscodeshift2.default.importDeclaration([_jscodeshift2.default.importDefaultSpecifier(_jscodeshift2.default.identifier(name))], _jscodeshift2.default.literal(local));
  var modulesSpecs = (0, _jscodeshift2.default)(fileContent).find(_jscodeshift2.default.ImportDeclaration);

  var newContent = modulesSpecs.at(modulesSpecs.nodes().length - 1).insertAfter(newImport).toSource({
    quotes: 'single',
    trailingComma: true
  });

  (0, _create_file2.default)({
    content: newContent,
    filePath: filePath
  });
}