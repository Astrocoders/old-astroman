import {stripIndents} from 'common-tags'
import getExportedArrayKeys from '../getExportedArrayKeys'

const fileContent = stripIndents`
import user from './User/logic'

export default [
  user,
]
`

test('should return an array with the exported array keys properly', () => {
  const keys = getExportedArrayKeys({
    fileContent,
  })

  expect(keys).toEqual(['user'])
})
