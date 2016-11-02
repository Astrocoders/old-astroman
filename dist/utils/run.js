'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = run;

var _child_process = require('child_process');

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