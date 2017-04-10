// 
export default ({ name, params }) => (
`import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

export default new ValidatedMethod({
  name: '${name}',
  validate: new SimpleSchema({
${params.map(paramDefToSimpleSchemaDef(params.length)).join('')}
  }).validator(),
  run({ ${paramsDefToDestructuredArgs(params)} }){
    return true
  },
})

`)

function paramDefToSimpleSchemaDef(paramsLength){
  return (paramDef, index) => {
    const def = paramDef.split(':')

    // Doing indentation like this is not ok
    return (
    `${index !== 0 ? '\n' :'' }    ${def[0]}: {
      type: ${def[1]},
    },`
    )
  }
}

function paramsDefToDestructuredArgs(params){
  return params.map(def => def.split(':')[0]).join(', ')
}
