import {stripIndent} from 'common-tags'

export default ({name}) => stripIndent`
/* eslint-disable unicorn/filename-case */
import React from 'react'
import PropTypes from 'prop-types'
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
