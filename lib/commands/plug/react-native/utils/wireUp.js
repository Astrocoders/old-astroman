import path from 'path'
import fs from 'fs'
import { upperFirst } from 'lodash/fp'
import colors from 'colors/safe'
import { getAppMainPackagePath } from '~/utils/filesystem/packageJson'
import { getRepoNameFromUrl } from '~/utils/git'
import log from '~/utils/log'
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

  log(colors.white.bold('Wiring up new plugin'))

  log(colors.white('Attempt to wire up any reducers...'))
  if(fs.existsSync(pluginReducersPath)){
    log(colors.white('Wiring up reducers...'))
    const pluginReducersContent = fs.readFileSync(pluginReducersPath).toString()
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

  log(colors.white('Attempt to wire up any redux logics...'))
  if(fs.existsSync(pluginLogicsPath)){
    log(colors.white('Wiring up redux logics...'))
    const pluginLogicsContent = fs.readFileSync(pluginLogicsPath).toString()

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
