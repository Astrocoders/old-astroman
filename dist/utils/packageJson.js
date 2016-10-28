'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAppMainPackagePath = getAppMainPackagePath;
exports.getAppMainPackage = getAppMainPackage;
exports.itHasPackageInItsDeps = itHasPackageInItsDeps;
exports.updateMainPackageJson = updateMainPackageJson;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _findConfig = require('find-config');

var _findConfig2 = _interopRequireDefault(_findConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getAppMainPackagePath() {
  var root = (0, _findConfig2.default)('package.json').replace('package.json', '');
  var rootWithinAnAppDir = _path2.default.join(root, '../app');

  if (_fs2.default.existsSync(rootWithinAnAppDir)) {
    return rootWithinAnAppDir;
  } else {
    return root;
  }
}

function getAppMainPackage() {
  return _fs2.default.readFileSync(_path2.default.join(getAppMainPackagePath(), 'package.json'));
}

function itHasPackageInItsDeps(_ref) {
  var packageName = _ref.packageName;

  var packageJson = getAppMainPackage();

  return new RegExp(packageName, 'ig').test(packageJson);
}

function updateMainPackageJson(extendedObj) {
  var packageJsonObj = JSON.parse(getAppMainPackage());
  var newPackageJson = JSON.stringify((0, _lodash.merge)(packageJsonObj, extendedObj), null, 2);

  _fs2.default.writeFileSync(_path2.default.join(getAppMainPackagePath(), 'package.json'), newPackageJson);
}