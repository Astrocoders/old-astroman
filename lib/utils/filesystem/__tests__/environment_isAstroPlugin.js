/* eslint-disable unicorn/filename-case */
import * as environment from '../environment'

jest.mock('../packageJson', () => ({
  getAppMainPackage: () => JSON.stringify({
    name: 'astro-rn-plugin',
  }),
}))

it('should detect properly', () => {
  expect(environment.isAstroPlugin()).toBe(true)
})
