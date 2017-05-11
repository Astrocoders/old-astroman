export default ({name}) => (
`import React, {
  PropTypes,
} from 'react'
import {
  compose,
  pure,
} from 'recompose'

function ${name}(){
  return (
  )
}

${name}.propTypes = {
}

export default compose(
  pure,
)(${name})
`)
