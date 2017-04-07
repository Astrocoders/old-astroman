// @flow
import { lowerFirst } from 'lodash' 

export default ({ name }: { name: string }):string => (
`<Scene
  key="${lowerFirst(name)}"
  wrapRouter={false}
  component={${name}}
/>`
) 
