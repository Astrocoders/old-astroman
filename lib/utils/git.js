import run from '~/utils/run'
import path from 'path'
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

export function getRepoNameFromUrl(source){
  return source.match(/[^/]+\/?$/g)[0].replace(/(.git)$/, '')
}
