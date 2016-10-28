export default ({ name }) => (
  `import React, {
  Component,
  PropTypes,
} from 'react'

export default class ${name} extends Component {
  static propTypes = {
  }

  render(){
    return (
    )
  }
}
`)
