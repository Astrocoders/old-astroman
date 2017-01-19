import { capitalize } from 'lodash/fp'

export default ({ name }: { name:string }):string => (
`import { connect } from 'react-redux'
import { createSelector } from 'reselect'

const get${capitalize(name)} = createSelector(state => state.${name.toLowerCase()})

export default connect(
  state => ({
    ${name.toLowerCase()}State: get${capitalize(name)}(state),
  }),
  dispatch => ({
    ${name.toLowerCase()}Dispatch: {},
  })
)
`)
