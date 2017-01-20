import path from 'path'
import collectionTemplate from '~/templates/meteor/collection'
import createFile from '~/utils/create_file'
import pathes from '~/utils/pathes'

export default function createCollection({ name, params }: { name:string, params:Array<string> }):void {
  const filePath = path.join(pathes.meteor.collections, `${name.toLowerCase()}.js`)

  console.log('Creating collection...'.white)
  createFile({
    filePath,
    content: collectionTemplate({ name, params }),
  })
}
