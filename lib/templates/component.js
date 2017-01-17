// @flow
import { capitalize } from 'lodash/fp'

export default ({ name }: { name:string }):string => (
`import React, {
  PropTypes,
} from 'react'
import {
  compose,
  pure,
} from 'recompose'
import container from './container'

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
