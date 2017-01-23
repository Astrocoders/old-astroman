import path from 'path'
import { lowerFirst } from 'lodash/fp'
import collectionTemplate from '~/templates/meteor/collection'
import createFile from '~/utils/create_file'
import pathes from '~/utils/pathes'

export default function createCollection({ name, params }: { name:string, params:Array<string> }):void {
  const filePath = path.join(pathes.meteor.collections, `${lowerFirst(name)}.js`)

  console.log('Creating collection...'.white)
  createFile({
    filePath,
    content: collectionTemplate({ name, params }),
  })
}
