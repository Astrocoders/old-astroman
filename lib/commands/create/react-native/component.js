import path from 'path'
import componentTmpl from '~/templates/component'
import createFile from '~/utils/filesystem/createFile'
import pathes from '~/utils/pathes'

export default function component({ name }: { name:string }):void {
  const filePath = path.join(pathes.components, `${name}.js`)

  createFile({
    filePath,
    content: componentTmpl({ name }),
  })
}
