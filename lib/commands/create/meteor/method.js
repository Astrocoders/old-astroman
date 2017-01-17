import path from 'path'
import methodTemplate from '~/templates/meteor/method'
import createFile from '~/utils/create_file'
import pathes from '~/utils/pathes'

export default function meteorMethod({ name, params }: { name:string, params:Array<string> }):void {
  const filePath = path.join(pathes.meteor.methods, `${name}.js`)

  console.log('Creating method...'.white)
  createFile({
    filePath,
    content: methodTemplate({ name, params }),
  })
}
