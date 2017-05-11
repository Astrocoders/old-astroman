/* eslint-disable unicorn/filename-case */
import * as environment from '../environment'

jest.mock('../packageJson', () => ({
  itHasPackageInItsDeps: () => true,
}))

it('should detect properly', () => {
  expect(environment.isReactNative()).toBe(true)
})
