import j from 'jscodeshift'

export default function getExportedObjectKeys({ fileContent }){
  return j(fileContent)
    .find(j.ExportDefaultDeclaration)
  	.find(j.Identifier)
  	.nodes()
  	.map(prop => prop.name)
}
