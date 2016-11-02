"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var name = _ref.name;
  return "import { connect } from 'react-redux'\n\nexport default connect(\n  function mapStateToProps({ " + name + " }){\n    return {\n      " + name + "State: " + name + ",\n    }\n  },\n  function mapDispatchToProps(dispatch){\n    return {\n      " + name + "Dispatch: {},\n    }\n  }\n)\n";
};