import { capitalize } from 'lodash/fp'

export default ({ name }):string => (
`import React, {
  PropTypes,
} from 'react'
import {
  compose,
  pure,
} from 'recompose'

function ${capitalize(name)}(){
  return (
  )
}

${capitalize(name)}.propTypes = {
}

export default compose(
  container,
  pure,
)(${capitalize(name)})
`)
