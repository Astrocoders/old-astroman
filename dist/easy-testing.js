'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _pathes = require('./utils/pathes');

var _child_process = require('child_process');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (process.EASY_SETUP !== 1) {
  console.log('[astrocoders:easy-testing] Not initialized');
}

var requiredNpmDeps = [
/* testing */
{ name: 'codeceptjs' }, { name: 'jest' },
/* jest needs babel to parse meteor files */
{ name: 'babel-core' }, { name: 'babel-preset-es2015' }, { name: 'babel-plugin-transform-object-rest-spread' },
/* linting */
{ name: 'eslint' }, { name: 'babel-eslint' }, { name: 'eslint-config-airbnb' }, { name: 'eslint-plugin-import' }, { name: 'eslint-plugin-jsx-a11y' }, { name: 'eslint-plugin-react' }];

console.log('astrocoders:easy-testing checking the suite for you');
Promise.all(requiredNpmDeps.map(function (pack) {
  return new Promise(function (resolve, reject) {
    if (!(0, _pathes.itHasPackageInItsDeps)({ packageName: pack.name })) {
      console.log('Installing ' + pack.name + '...');

      var root = (0, _pathes.getAppMainPackagePath)();
      var npmInstallProc = (0, _child_process.exec)('cd ' + root + ' && npm install --save-dev ' + pack.name);

      npmInstallProc.stdout.pipe(process.stdout);
      npmInstallProc.stderr.pipe(process.stderr);

      npmInstallProc.on('close', function () {
        pack.onInstalled && pack.onInstalled();
        resolve();
      });
    }
  });
})).then(function () {
  (0, _pathes.updateMainPackageJson)({
    scripts: {
      'test:acceptance': 'codeceptjs run --steps',
      'test:unit': 'jest',
      'test:coverage': 'jest --coverage',
      'test:unit:watch': 'jest --watch'
    },

    jest: {
      browser: true,
      collectCoverageFrom: ['imports/**/*.js'],
      coverageDirectory: './coverage',
      rootDir: retifyPathIfWithinApp('./')
    },

    babel: {
      presets: ['es2015'],
      plugins: ['transform-object-rest-spread']
    },

    eslintConfig: {
      extends: ['airbnb'],
      rules: {
        'semi': [1, 'never'],
        'space-before-function-paren': [1, 'never'],
        'no-underscore-dangle': 0,
        'keyword-spacing': 0,
        'space-before-blocks': 0
      },
      parser: "babel-eslint"
    }
  });
});

function retifyPathIfWithinApp(path) {
  var appPath = (0, _pathes.getAppMainPackagePath)();
  var needsCdApp = /\/app\//g.test(appPath);

  return needsCdApp ? path.resolve('app/', path) : path;
}