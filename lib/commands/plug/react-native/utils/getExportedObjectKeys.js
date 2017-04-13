import j from 'jscodeshift'

export default function getExportedObjectKeys({ fileContent }){
  return j(fileContent)
    .find(j.ExportDefaultDeclaration)
  	.find(j.Property)
  	.nodes()
  	.map(prop => prop.key.name)
}
