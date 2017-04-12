import run from '~/utils/run'

export function bootstrap() {
  console.log('Bootstrapping with Lerna'.white)
  return run(`lerna bootstrap`)
}
