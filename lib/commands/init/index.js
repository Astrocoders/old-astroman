// 
import colors from 'colors/safe'
import reactNativeCreate from './react-native/index'
import { camelCase } from 'lodash'

export const command = 'init <name> [value]'
export const describe = 'boots a new project'

export const handler = (argv) => {
  reactNativeCreate({
    name: argv.value,
  })
}
