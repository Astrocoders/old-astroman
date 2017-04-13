import path from 'path'
import fs from 'fs'
import { upperFirst } from 'lodash/fp'
import { getAppMainPackagePath } from '~/utils/filesystem/packageJson'
import { getRepoNameFromUrl } from '~/utils/git'
import appendReducer from '~/utils/js/appendReducer'
import appendLogic from '~/utils/js/appendLogic'
import appendImport from '~/utils/js/appendImport'
import saveASTtoFile from '~/utils/js/saveASTtoFile'
import getExportedObjectKeys from './getExportedObjectKeys'
import getExportedArrayKeys from './getExportedArrayKeys'
import pathes from '~/utils/pathes'

export default function pluginWireUp({ source }){
  const packageName = getRepoNameFromUrl(source)
  const pluginPackagePath = path.join(getAppMainPackagePath(), 'packages', packageName)
  const pluginReducersPath = path.join(pluginPackagePath, pathes.rootReduxReducers)
  const pluginLogicsPath = path.join(pluginPackagePath, pathes.rootReduxLogics)

  if(fs.existsSync(pluginReducersPath)){
    const pluginReducersContent = fs.readFileSync(pluginReducersPath)
    const pluginExportedReducers = getExportedObjectKeys({
      fileContent: pluginReducersContent,
    })

    pluginExportedReducers.forEach(reducerKey => {
      appendImport({
        name: reducerKey,
        local: path.join(pluginPackagePath, 'src/redux', upperFirst(reducerKey), 'reducer'),
        filePath: pathes.rootReduxReducers,
      })

      appendReducer({
        name: reducerKey,
      })
    })
  }

  if(fs.existsSync(pluginLogicsPath)){
    const pluginLogicsContent = fs.readFileSync(pluginLogicsPath)

    const pluginExportedLogics = getExportedArrayKeys({
      fileContent: pluginLogicsContent,
    })

    pluginExportedLogics.forEach(logicKey => {
      appendImport({
        name: logicKey,
        local: path.join(pluginPackagePath, 'src/redux', upperFirst(logicKey), 'logic'),
        filePath: pathes.rootReduxLogics,
      })

      appendLogic({
        name: logicKey,
      })
    })
  }
}
