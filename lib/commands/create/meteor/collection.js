import path from 'path'
import { lowerFirst } from 'lodash/fp'
import collectionTemplate from '~/templates/meteor/collection'
import saveFile from '~/utils/filesystem/saveFile'
import pathes from '~/utils/pathes'

export default function createCollection({ name, params }: { name:string, params:Array<string> }):void {
  const filePath = path.join(pathes.meteor.collections, `${lowerFirst(name)}.js`)

  console.log('Creating collection...'.white)
  saveFile({
    filePath,
    content: collectionTemplate({ name, params }),
  })
}
