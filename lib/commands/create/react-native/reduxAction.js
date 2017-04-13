import path from 'path'
import j from 'jscodeshift'
import { snakeCase, camelCase } from 'lodash/fp'
import pathes from '~/utils/pathes'
import appendConstant from '~/utils/js/reduxAction/appendConstant'
import appendActionCreator from '~/utils/js/reduxAction/appendActionCreator'
import appendActionToReducer from '~/utils/js/reduxAction/appendActionToReducer'
import readFile from '~/utils/filesystem/readFile'
import saveASTtoFile from '~/utils/js/saveASTtoFile'

export default function reduxAction({ name: definition }){
  const entity = path.dirname(definition)
  const name = path.basename(definition)
  const entityPath = path.join(pathes.redux, entity)
  const actionsFilePath = path.join(entityPath, 'actions.js')
  const reducerFilePath = path.join(entityPath, 'reducer.js')
  const constantsFilePath = path.join(entityPath, 'constants.js')
  const actionsFile = readFile({filePath: actionsFilePath})
  const reducerFile = readFile({filePath: reducerFilePath})
  const constantsFile = readFile({filePath: constantsFilePath})

  const constantName = snakeCase(name).toUpperCase()

  // Include new constant
  saveASTtoFile({
    filePath: constantsFilePath,
    ast: appendConstant({
      ast: j(constantsFile),
      name: constantName,
      value: `${camelCase(entity)}/${constantName}`,
    }),
  })

  // Add new action creator
  saveASTtoFile({
    filePath: actionsFilePath,
    ast: appendActionCreator({
      ast: j(actionsFile),
      constantName,
      actionCreatorName: name,
    }),
  })

  // Add new action creator
  saveASTtoFile({
    filePath: reducerFilePath,
    ast: appendActionToReducer({
      ast: j(reducerFile),
      constantName,
    }),
  })
}
