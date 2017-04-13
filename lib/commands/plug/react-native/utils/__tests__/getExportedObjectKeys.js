import getExportedObjectKeys from '../getExportedObjectKeys'
import { stripIndents } from 'common-tags'

const fileContent = stripIndents`
import user from './User/reducer'

export default {
  user,
}
`

test('should return an array with the exported object keys properly', () => {
  const keys = getExportedObjectKeys({
    fileContent,
  })

  expect(keys).toEqual(['user'])
})
