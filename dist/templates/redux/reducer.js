"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var name = _ref.name;
  return "import {\n  ACTION,\n} from './actions'\n\nexport default function " + name + "(state = {\n}, action = {}){\n  switch(action.type){\n    case ACTION: return { ...state }\n    default: return state\n  }\n} \n";
};