// @flow
import colors from 'colors/safe'
import * as reactNativeCmds from './react-native/index'
import { camelCase } from 'lodash'

export const command = 'init <name> [value]'
export const describe = 'boots a new project'

export const handler = (argv:Object):void => {
  const name = camelCase(argv.name)
  if(!reactNativeCmds[name]){
    console.log(colors.red(`Not supported ${argv.name}`))
  }

  reactNativeCmds[name]({
    name: argv.value,
  })
}
