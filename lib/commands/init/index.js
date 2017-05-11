import reactNativeCreate from './react-native/index'

export const command = 'init <name> [value]'
export const describe = 'boots a new project'

export const handler = argv => {
  reactNativeCreate({
    name: argv.value,
  })
}
