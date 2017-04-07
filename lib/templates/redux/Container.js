import { lowerFirst, upperFirst } from 'lodash/fp'

export default ({ name }) => (
`import { connect } from 'react-redux'
import { bindActionCreations } from 'redux'
import { createSelector } from 'reselect'
import * as actionsToProps from './actions'

const ${lowerFirst(name)}StateSelector = state => state.get('${lowerFirst(name)}')
const get${upperFirst(name)} = createSelector(
  ${lowerFirst(name)}StateSelector,
  ${lowerFirst(name)}ImmutableState => ${lowerFirst(name)}ImmutableState.toJS(),
)

export default connect(
  state => ({
    ${lowerFirst(name)}State: get${upperFirst(name)}(state),
  }),
  actionsToProps
)
`)
