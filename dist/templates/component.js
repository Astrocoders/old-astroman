"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var name = _ref.name;
  return "import React, {\n  PropTypes,\n} from 'react'\nimport {\n  compose,\n  pure,\n} from 'recompose'\n\nfunction " + name + "(){\n  return (\n  )\n}\n\n" + name + ".propTypes = {\n}\n\nexport default compose(\n  pure,\n)($name)\n";
};