// @flow
import colors from 'colors'
import scene from './scene'

export const command = 'create <name> [value]'
export const describe = 'scaffolds a file'

export const handler = (argv:Object):void => {
  switch(argv.name){
    case 'scene': return scene({ name: argv.value })
  }
}
