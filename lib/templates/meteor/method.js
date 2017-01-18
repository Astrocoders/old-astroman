// @flow
export default ({ name, params }: { name:string, params:Array<string>}):string => (
`import { Meteor } from 'meteor/meteor'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

Meteor.methods({
  '${name}'(params){
    new SimpleSchema({
${params.map(paramDefToSimpleSchemaDef(params.length)).join('')}
    }).validate(params)
  },
})
`)

function paramDefToSimpleSchemaDef(paramsLength){
  return (paramDef, index) => {
    const def = paramDef.split(':')

    // Doing indentation like this is not ok
    return (
      `${index !== 0 ? '\n' :'' }      ${def[0]}: {
        type: ${def[1]},
      },`
    )
  }
}
