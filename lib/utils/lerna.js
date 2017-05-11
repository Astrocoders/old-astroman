import colors from 'colors/safe'
import run from '~/utils/run'

/* eslint-disable import/prefer-default-export */
export function bootstrap() {
  console.log(colors.white('Bootstrapping with Lerna'))
  return run(`$(npm bin)/lerna bootstrap`)
}
