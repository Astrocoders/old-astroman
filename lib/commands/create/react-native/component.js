import path from 'path'
import componentTmpl from '~/templates/component'
import saveFile from '~/utils/filesystem/saveFile'
import pathes from '~/utils/pathes'

export default function component({ name }: { name:string }):void {
  const filePath = path.join(pathes.components, `${name}.js`)

  saveFile({
    filePath,
    content: componentTmpl({ name }),
  })
}
