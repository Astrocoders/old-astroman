'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var name = _ref.name,
      params = _ref.params;
  return 'import { Meteor } from \'meteor/meteor\nimport { SimpleSchema } from \'meteor/aldeed:simple-schema\'\n\nMeteor.methods({\n  \'' + name + '\'(params){\n    new SimpleSchema({\n' + params.map(paramDefToSimpleSchemaDef(params.length)).join('') + '\n    }).validate(params)\n  },\n})\n';
};

function paramDefToSimpleSchemaDef(paramsLength) {
  return function (paramDef, index) {
    var def = paramDef.split(':');

    // Doing indentation like this is not ok
    return (index !== 0 ? '\n' : '') + '      ' + def[0] + ': {\n        type: ' + def[1] + ',\n      },';
  };
}