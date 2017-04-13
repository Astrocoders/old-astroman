import getExportedArrayKeys from '../getExportedArrayKeys'
import { stripIndents } from 'common-tags'

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
