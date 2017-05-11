import wireUp from '../wireUp'

jest.mock('~/utils/log', () => jest.fn())
jest.mock('~/utils/js/saveASTtoFile', () => jest.fn())
jest.mock('~/utils/js/appendReducer', () => jest.fn())
jest.mock('~/utils/js/appendLogic', () => jest.fn())
jest.mock('~/utils/js/appendImport', () => jest.fn())

jest.mock('~/utils/filesystem/packageJson', () => ({
  getAppMainPackagePath: jest.fn(() => '/foo'),
}))

jest.mock('fs', () => ({
  existsSync: jest.fn(() => true),
  readFileSync: jest.fn()
    .mockImplementation(path => {
      const {stripIndent} = require('common-tags')
      const pluginReducersFile = stripIndent`
        import user from './User/reducer'

        export default {
          user,
        }
      `

      const pluginLogicsFile = stripIndent`
        import user from './User/logic'

        export default [
          user,
        ]
      `

      const appRootReducersFile = stripIndent`
        import app from './App/reducer'

        export default combineReducers({
          app,
        })
      `
      if (path.includes('astro-rn-chat') && path.includes('reducers.js')) {
        return pluginReducersFile
      }

      if (path.includes('astro-rn-chat') && path.includes('logics.js')) {
        return pluginLogicsFile
      }

      if (path.includes('reducers.js')) {
        return appRootReducersFile
      }
    }),
}))

beforeAll(() => {
  wireUp({source: 'git@github.com:astroc0der/astro-rn-chat.git'})
})

test('should attempt to detect if there is a reducers file', () => {
  const packageName = 'astro-rn-chat'
  const fs = require('fs')

  expect(fs.existsSync).toHaveBeenCalledWith(`/foo/packages/${packageName}/src/redux/reducers.js`)
})

test('should attempt to detect if there is a logic file', () => {
  const packageName = 'astro-rn-chat'
  const fs = require('fs')

  expect(fs.existsSync).toHaveBeenCalledWith(`/foo/packages/${packageName}/src/redux/logics.js`)
})

test('should call appendImport to properly add new plugin reducer import', () => {
  const appendImport = require('~/utils/js/appendImport')

  expect(appendImport).toHaveBeenCalledWith({
    name: 'user',
    local: 'astro-rn-chat/src/redux/User/reducer',
    filePath: 'src/redux/reducers.js',
  })
})

test('should call appendReducer to properly add new plugin reducer keys', () => {
  const appendReducer = require('~/utils/js/appendReducer')

  expect(appendReducer).toHaveBeenCalledWith({
    name: 'user',
  })
})

test('should call appendImport to properly add new plugin logics import', () => {
  const appendImport = require('~/utils/js/appendImport')

  expect(appendImport).toHaveBeenCalledWith({
    name: 'user',
    local: 'astro-rn-chat/src/redux/User/logic',
    filePath: 'src/redux/logics.js',
  })
})

test('should call appendImport to properly add new plugin logic keys', () => {
  const appendLogic = require('~/utils/js/appendLogic')

  expect(appendLogic).toHaveBeenCalledWith({
    name: 'user',
  })
})
