// @flow
import colors from 'colors/safe'
import * as reactNativeCmds from './react-native/index'
import * as meteorCmds from './meteor/index'
import {
  isReactNative,
  isMeteor,
} from '~/utils/filesystem/environment'

export const command = 'create <name> [value] [params]'
export const describe = 'scaffolds a file'

export const handler = (argv:Object):void => {
  if(isReactNative()){
    if(!reactNativeCmds[argv.name]){
      console.log(colors.red(`${argv.name} doesn't seem to be a create sub-command.`))
      return
    }
    reactNativeCmds[argv.name]({ name: argv.value })
    return
  } else if(isMeteor()){
    if(!meteorCmds[argv.name]){
      console.log(colors.red(`${argv.name} doesn't seem to be a create sub-command.`))
      return
    }
    meteorCmds[argv.name]({ name: argv.value, params: (argv.params || '').split(',') })
    return
  }

  console.log(colors.red('You do not seem to be in any of the supported envs'))
}

