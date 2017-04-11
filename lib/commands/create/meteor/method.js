import path from 'path'
import methodTemplate from '~/templates/meteor/method'
import saveFile from '~/utils/filesystem/saveFile'
import pathes from '~/utils/pathes'

export default function meteorMethod({ name, params }) {
  const filePath = path.join(pathes.meteor.methods, `${name}.js`)

  console.log('Creating method...'.white)
  saveFile({
    filePath,
    content: methodTemplate({ name, params }),
  })
}
