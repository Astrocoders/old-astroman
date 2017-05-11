import colors from 'colors/safe'
import * as reactNativeCmds from './react-native/index'
import * as meteorCmds from './meteor/index'
import {
  isReactNative,
  isMeteor,
  isAstroPlugin,
} from '~/utils/filesystem/environment'

export const command = 'create <name> [value] [params]'
export const describe = 'scaffolds a file'

export const handler = argv => {
  // Now only supporting RN
  if (isReactNative() || isAstroPlugin()) {
    if (!reactNativeCmds[argv.name]) {
      console.log(`${argv.name} doesn't seem to be a create sub-command.`.red)
      return
    }
    reactNativeCmds[argv.name]({name: argv.value})
    return
  } else if (isMeteor()) {
    if (!meteorCmds[argv.name]) {
      console.log(`${argv.name} doesn't seem to be a create sub-command.`.red)
      return
    }
    meteorCmds[argv.name]({name: argv.value, params: (argv.params || '').split(',')})
    return
  }

  console.log(colors.red('You do not seem to be in any of the supported envs'))
}

