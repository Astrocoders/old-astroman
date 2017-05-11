import {lowerFirst} from 'lodash'

export default ({name}) => (
`<Scene
  key="${lowerFirst(name)}"
  wrapRouter={false}
  component={${name}}
/>`
)
