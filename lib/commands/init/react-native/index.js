import replace from 'replace'
import colors from 'colors/safe'
import path from 'path'
import run from '~/utils/run'
import * as git from '~/utils/git'

const gitRepoUrl = 'git@github.com:Astrocoders/astroapp-rn-boilerplate.git'
const boilerplateName = 'AstroApp'
export default function reactNative({name}) {
  const projectPath = path.resolve(process.cwd(), name)

  console.log(colors.white.bold('Fetching boilerplate...'))
  git.clone(gitRepoUrl, name)
    .then(() => {
      console.log(colors.green.bold('Boilerplate fetched'))
    })
    .then(() => {
      console.log(colors.white.bold('Configuring new project...'))
      return git.remove(projectPath)
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
    .catch(err => {
      console.log(colors.red('An error ocurred:'))
      console.log(err)
      process.exit(1)
    })
}
