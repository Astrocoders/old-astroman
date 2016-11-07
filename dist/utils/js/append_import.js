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

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function appendImport(_ref) {
  var local = _ref.local,
      name = _ref.name,
      filePath = _ref.filePath;

  var fileContent = (0, _read_file2.default)({ filePath: filePath });
  var ast = (0, _jscodeshift2.default)(fileContent);
  var newImport = _jscodeshift2.default.importDeclaration([_jscodeshift2.default.importDefaultSpecifier(_jscodeshift2.default.identifier(name))], _jscodeshift2.default.literal(local));
  var modulesSpecs = ast.find(_jscodeshift2.default.ImportDeclaration);

  // If already there no need to proceed
  if ((0, _lodash.some)(modulesSpecs.find(_jscodeshift2.default.Literal).nodes(), function (path) {
    return path.value === local;
  })) {
    return;
  }

  var newContent = modulesSpecs.at(modulesSpecs.nodes().length).insertAfter(newImport).toSource({
    quotes: 'single',
    trailingComma: true
  });

  (0, _create_file2.default)({
    content: newContent,
    filePath: filePath
  });
}