'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prependLine = prependLine;
exports.appendLine = appendLine;
exports.appendImport = appendImport;
exports.appendImportToFile = appendImportToFile;
exports.appendChildToReactComponent = appendChildToReactComponent;
exports.appendScene = appendScene;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _scene = require('../templates/scene');

var _scene2 = _interopRequireDefault(_scene);

var _import = require('../templates/import');

var _import2 = _interopRequireDefault(_import);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _packageJson = require('../utils/packageJson');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function prependLine(_ref) {
  var lineToPrepend = _ref.lineToPrepend,
      patternToPrepend = _ref.patternToPrepend,
      fileContent = _ref.fileContent;

  if (fileContent.indexOf(lineToPrepend) !== -1) {
    // included exists
    return fileContent;
  }
  var lines = fileContent.split('\n');
  var lastLineWithPattern = _lodash2.default.findLastIndex(lines, function (line) {
    return patternToPrepend.test(line);
  });

  return [].concat(_toConsumableArray(lines.slice(0, lastLineWithPattern)), [lineToPrepend], _toConsumableArray(lines.slice(lastLineWithPattern, lines.length))).join('\n');
}

function appendLine(_ref2) {
  var lineToAppend = _ref2.lineToAppend,
      patternToAppendAfter = _ref2.patternToAppendAfter,
      fileContent = _ref2.fileContent;

  if (fileContent.indexOf(lineToAppend) !== -1) {
    // included exists
    return fileContent;
  }

  var lines = fileContent.split('\n');
  var lastLineWithPattern = _lodash2.default.findLastIndex(lines, function (line) {
    return patternToAppendAfter.test(line);
  }) + 1;

  return [].concat(_toConsumableArray(lines.slice(0, lastLineWithPattern)), [lineToAppend], _toConsumableArray(lines.slice(lastLineWithPattern, lines.length))).join('\n');
}

function appendImport(_ref3) {
  var namespace = _ref3.namespace,
      path = _ref3.path,
      fileContent = _ref3.fileContent;

  return appendLine({
    lineToAppend: (0, _import2.default)({
      namespace: namespace,
      path: path
    }),
    fileContent: fileContent,
    patternToAppendAfter: /^import/
  });
}

function appendImportToFile(_ref4) {
  var namespace = _ref4.namespace,
      importPath = _ref4.importPath,
      fileToModify = _ref4.fileToModify;

  var resolvedPath = _path2.default.join((0, _packageJson.getAppMainPackagePath)(), fileToModify);
  var fileContent = _fs2.default.readFileSync(resolvedPath).toString();

  _fs2.default.writeFileSync(resolvedPath, appendImport({
    namespace: namespace,
    path: importPath.replace('src/', '~/'),
    fileContent: fileContent
  }));
}

// Not the best way of doing this but gonna use this for now
function appendChildToReactComponent(_ref5) {
  var parentName = _ref5.parentName,
      childDef = _ref5.childDef,
      fileContent = _ref5.fileContent;

  // force tabbing, increment spacing in front of each line
  var tabbed = childDef.split('\n').map(function (line) {
    return '    ' + line;
  }).join('\n');
  return prependLine({
    lineToPrepend: tabbed,
    fileContent: fileContent,
    patternToPrepend: RegExp('</' + parentName + '>', 'g')
  });
}

function appendScene(_ref6) {
  var name = _ref6.name,
      fileContent = _ref6.fileContent;

  return appendChildToReactComponent({
    childDef: (0, _scene2.default)({ name: name }),
    parentName: 'Scene',
    fileContent: fileContent
  });
}