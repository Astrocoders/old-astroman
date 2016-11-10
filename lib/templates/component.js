// @flow
export default ({ name }: { name:string }):string => (
  `import React, {
  PropTypes,
} from 'react'

export default function ${name}(){
  return (
  )
}

${name}.propTypes = {
}
`)
