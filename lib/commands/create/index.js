// @flow
import colors from 'colors'
import * as reactNativeCmds from './react-native/index'
import {
  isReactNative,
  isMeteor,
} from '../../utils/environment'

export const command = 'create <name> [value]'
export const describe = 'scaffolds a file'

export const handler = (argv:Object):void => {
  if(isReactNative()){
    reactNativeCmds[argv.name]({ name: argv.value })
  }
}
