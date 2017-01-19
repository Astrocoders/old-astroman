import { capitalize } from 'lodash/fp'

export default ({ name }: { name:string }):string => (
`import { connect } from 'react-redux'
import { bindActionCreations } from 'redux'
import { createSelector } from 'reselect'
import * as actionsToProps from './actions'

const get${capitalize(name)} = createSelector(state => state.${name.toLowerCase()})

export default connect(
  state => ({
    ${name.toLowerCase()}State: get${capitalize(name)}(state),
  }),
  actionsToProps
)
`)
