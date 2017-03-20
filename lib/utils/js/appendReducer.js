import j from 'jscodeshift' 

export default function appendReducer({ name, fileContent }){
  const newReducerProp = j.property('init', j.identifier(name), j.identifier(name))
  newReducerProp.shorthand = true

  const reducersObject = j(fileContent)
    .find(j.ExportDefaultDeclaration)
    .find(j.ObjectExpression)
  const currentReducerProperties = reducersObject.nodes()[0].properties

  return reducersObject
    .replaceWith(j.objectExpression([...currentReducerProperties, newReducerProp]))
    .toSource({
      quote: 'single',
      trailingComma: true,
    })
}
