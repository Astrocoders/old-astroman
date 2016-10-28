'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMeteor = isMeteor;
exports.isReactNative = isReactNative;
exports.isReactApp = isReactApp;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _packageJson = require('./packageJson.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isMeteor() {
  return _fs2.default.existsSync('app/.meteor/');
}

function isReactNative() {
  return (0, _packageJson.itHasPackageInItsDeps)({ packageName: 'react-native' });
}

function isReactApp() {
  return !isReactNative() && (0, _packageJson.itHasPackageInItsDeps)({ packageName: 'react' });
}