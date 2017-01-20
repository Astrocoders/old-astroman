export default ({ name, params }) => (
`import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

const schema = new SimpleSchema({
${params.map(paramDefToSimpleSchemaDef(params.length)).join('')}
})

const ${name} = new Mongo.Collection('${name.toLowerCase()}')

${name}.attachSchema(schema)

export default ${name}
`)

function paramDefToSimpleSchemaDef(paramsLength){
  return (paramDef, index) => {
    const def = paramDef.split(':')

    // Doing indentation like this is not ok
    return (
  `${index !== 0 ? '\n' :'' }  ${def[0]}: {
    type: ${def[1]},
  },`
    )
  }
}
