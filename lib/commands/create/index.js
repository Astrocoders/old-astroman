// @flow
import colors from 'colors/safe'
import * as reactNativeCmds from './react-native/index'
import {
  isReactNative,
  isMeteor,
} from '../../utils/environment'

export const command = 'create <name> [value]'
export const describe = 'scaffolds a file'

export const handler = (argv:Object):void => {
  if(isReactNative()){
    if(!reactNativeCmds[argv.name]){
      console.log(colors.red(`${argv.name} doesn't seem to be a create sub-command.`))
      return
    }
    reactNativeCmds[argv.name]({ name: argv.value })
    return
  }

  console.log(colors.red('You do not seem to be in any of the supported envs'))
}

