"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var namespace = _ref.namespace,
      path = _ref.path;
  return "import " + namespace + " from '" + path + "'";
};