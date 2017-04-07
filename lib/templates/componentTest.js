export default ({ name }) => (
`import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import React from 'react'
import ${name} from '../${name}'

describe('<${name}/>', () => {
  test('should render properly', () => {
    const wrapper = shallow(
      <${name}/>
    )

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
})
`)
