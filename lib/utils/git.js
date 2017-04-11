import run from '~/utils/run'
import rimraf from 'rimraf'

export function clone(repo, name = '') {
  return run(`git clone ${gitRepoUrl} --depth=1 ${name}`)
}

export function remove(projectPath) {
  return new Promise((resolve, reject) => {
    rimraf(path.resolve(projectPath, '.git'), () => {
      resolve()
    })
  })
}
