import * as tools from '../js_code'
import fs from 'fs'
import path from 'path'

describe('Utils', () => {
  describe('JSCode', () => {
    describe('JSCode.appendImport', () => {
      it('should append import properly', () => {
        const file = fs.readFileSync(expand('./test_artifacts/js_code_append_import_test_file.js')).toString()
        const expectedFile = fs.readFileSync(expand('./test_artifacts/js_code_append_import_expected.js')).toString()
        const newFile = tools.appendImport({
          namespace: 'path',
          path: 'path',
          fileContent: file,
        })

        expect(newFile).toEqual(expectedFile)
      })
    })

    describe('JSCode.appendChildToReactComponent', () => {
      it('should append child component properly within parent', () => {
        const file = fs.readFileSync(expand('./test_artifacts/react_scenes.js')).toString()
        const expectedFile = fs.readFileSync(expand('./test_artifacts/react_scenes_expected.js')).toString()
        const newFile = tools.appendScene({
          name: 'Dashboard',
          fileContent: file,
        })

        expect(newFile).toEqual(expectedFile)
      })
    })
  })
})

function expand(file){
  return path.resolve(__dirname, file)
}
