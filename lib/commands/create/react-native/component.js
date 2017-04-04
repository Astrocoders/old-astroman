import path from 'path'
import componentTmpl from '~/templates/component'
import componentTestTmpl from '~/templates/componentTest'
import saveFile from '~/utils/filesystem/saveFile'
import createDir from '~/utils/filesystem/createDir'
import pathes from '~/utils/pathes'

export default function component({ name }: { name:string }):void {
  const filePath = path.join(pathes.components, `${name}.js`)

  saveFile({
    filePath,
    content: componentTmpl({ name }),
  })

  createDir({
    dirPath: pathes.componentsTests,
  })

  saveFile({
    filePath: path.join(pathes.componentsTests, `${name}.js`),
    content: componentTestTmpl({ name }),
  })
}
