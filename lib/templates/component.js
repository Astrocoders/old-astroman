import {stripIndent} from 'common-tags'

export default ({name}) => stripIndent`
/* eslint-disable unicorn/filename-case */
  import React, {
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
`
