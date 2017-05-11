import path from 'path'
import colors from 'colors/safe'
import {lowerFirst} from 'lodash/fp'
import collectionTemplate from '~/templates/meteor/collection'
import saveFile from '~/utils/filesystem/saveFile'
import pathes from '~/utils/pathes'

export default function createCollection({name, params}) {
  const filePath = path.join(pathes.meteor.collections, `${lowerFirst(name)}.js`)

  console.log(colors.white('Creating collection...'))
  saveFile({
    filePath,
    content: collectionTemplate({name, params}),
  })
}
