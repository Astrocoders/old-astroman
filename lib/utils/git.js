import run from '~/utils/run'
import rimraf from 'rimraf'

export function clone({repo, name = '', where = './'}) {
  return run(`cd ${where} && git clone ${repo} --depth=1 ${name}`)
}

export function remove(projectPath) {
  return new Promise((resolve, reject) => {
    rimraf(path.resolve(projectPath, '.git'), () => {
      resolve()
    })
  })
}
