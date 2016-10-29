'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reactNativeMeteor;

var _child_process = require('child_process');

var _rimraf = require('rimraf');

var _rimraf2 = _interopRequireDefault(_rimraf);

var _replace = require('replace');

var _replace2 = _interopRequireDefault(_replace);

var _safe = require('colors/safe');

var _safe2 = _interopRequireDefault(_safe);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gitRepo = 'git@github.com:Astrocoders/astro-meteor-served-rn-boilerplate.git';
var boilerplateName = 'AstroApp';
function reactNativeMeteor(_ref) {
  var name = _ref.name;

  var projectPath = _path2.default.resolve(process.cwd(), name);
  console.log(_safe2.default.white.bold('Fetching boilerplate...'));

  run('git clone ' + gitRepo + ' --depth=1 ' + name).then(function () {
    console.log(_safe2.default.green.bold('Boilerplate fetched'));
  }).then(function () {
    console.log(_safe2.default.white.bold('Configuring new project...'));
    return new Promise(function (resolve, reject) {
      (0, _rimraf2.default)(_path2.default.resolve(projectPath, '.git'), function () {
        resolve();
      });
    });
  }).then(function () {
    return run('cd ' + projectPath + ' && git init');
  }).then(function () {
    (0, _replace2.default)({
      regex: boilerplateName,
      replacement: name,
      paths: [projectPath],
      recursive: true,
      silent: true
    });
    (0, _replace2.default)({
      regex: boilerplateName.toLowerCase(),
      replacement: name.toLowerCase(),
      paths: [projectPath],
      recursive: true,
      silent: true
    });
    console.log(_safe2.default.white('Done. Project ' + name + ' created under the working directory'));
  });
}

function run(command) {
  return new Promise(function (resolve, reject) {
    var proc = (0, _child_process.exec)(command);

    proc.on('close', function (code) {
      if (code !== 0) {
        reject({ command: command, code: code });
        return;
      }

      resolve();
    });
  });
}