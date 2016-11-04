export default ({ name }: { name:string }):string => (
`import { connect } from 'react-redux'

export default connect(
  function mapStateToProps({ ${name} }){
    return {
      ${name}State: ${name},
    }
  },
  function mapDispatchToProps(dispatch){
    return {
      ${name}Dispatch: {},
    }
  }
)
`)
