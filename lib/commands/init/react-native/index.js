// @flow
import run from '~/utils/run'
import rimraf from 'rimraf'
import replace from 'replace'
import colors from 'colors/safe'
import path from 'path'

const gitRepoUrl = 'git@github.com:Astrocoders/astroapp-rn-boilerplate.git'
const boilerplateName = 'AstroApp'
export default function reactNative({ name }: {name: string}):void {
  const projectPath = path.resolve(process.cwd(), name)

  console.log(colors.white.bold('Fetching boilerplate...'))
  gitClone(gitRepoUrl, name)
    .then(() => {
      console.log(colors.green.bold('Boilerplate fetched'))
    })
    .then(() => {
      console.log(colors.white.bold('Configuring new project...'))
      return removeGit(projectPath)
    })
    .then(() => run(`cd ${projectPath} && git init`))
    .then(() => {
      replace({
        regex: boilerplateName,
        replacement: name,
        paths: [projectPath],
        recursive: true,
        silent: true,
      })
      replace({
        regex: boilerplateName.toLowerCase(),
        replacement: name.toLowerCase(),
        paths: [projectPath],
        recursive: true,
        silent: true,
      })
      console.log(colors.white(`Project ${name} successfully created.`))
    })
    .then(() => run(`cd ${projectPath} && mv android/app/src/main/java/com/astroapp android/app/src/main/java/com/${name.toLowerCase()}`))
    .catch(error => {
      console.log(colors.red('An error ocurred:'))
      console.log(error)
      process.exit(1)
    })
}

function gitClone(repo:string, name:string):Promise<void> {
  return run(`git clone ${gitRepoUrl} --depth=1 ${name}`)
}

function removeGit(projectPath:string):Promise<void> {
  return new Promise((resolve, reject) => {
    rimraf(path.resolve(projectPath, '.git'), () => {
      resolve()
    })
  })
}
