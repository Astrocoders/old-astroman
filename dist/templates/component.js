"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var name = _ref.name;
  return "import React, {\n  PropTypes,\n} from 'react'\n\nexport default function " + name + "(){\n  return (\n  )\n}\n\n" + name + ".propTypes = {\n}\n";
};