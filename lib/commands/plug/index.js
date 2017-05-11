import colors from 'colors/safe'
import reactNativeHandler from './react-native'
import {
  isReactNative,
} from '~/utils/filesystem/environment'

export const command = 'plug <source>'
export const aliases = ['p']
export const describe = 'plugs a plugin into the project'

export const handler = argv => {
  if (isReactNative()) {
    reactNativeHandler({source: argv.source})
    return
  }

  console.log(colors.white('You do not seem to be in any of the supported envs'))
}

