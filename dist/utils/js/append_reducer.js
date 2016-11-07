'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = appendReducer;

var _jscodeshift = require('jscodeshift');

var _jscodeshift2 = _interopRequireDefault(_jscodeshift);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function appendReducer(_ref) {
  var name = _ref.name,
      fileContent = _ref.fileContent;

  var newReducerProp = _jscodeshift2.default.property('init', _jscodeshift2.default.identifier(name), _jscodeshift2.default.identifier(name));
  newReducerProp.shorthand = true;

  var reducersObject = (0, _jscodeshift2.default)(fileContent).find(_jscodeshift2.default.ExportDefaultDeclaration).find(_jscodeshift2.default.ObjectExpression);
  var currentReducerProperties = reducersObject.nodes()[0].properties;

  return reducersObject.replaceWith(_jscodeshift2.default.objectExpression([].concat(_toConsumableArray(currentReducerProperties), [newReducerProp]))).toSource({
    quote: 'single',
    trailingComma: true
  });
}