import { exec } from 'child_process'
import rimraf from 'rimraf'
import replace from 'replace'
import colors from 'colors/safe'
import path from 'path'

const gitRepo = 'git@github.com:Astrocoders/astro-meteor-served-rn-boilerplate.git'
const boilerplateName = 'AstroApp'
export default function reactNativeMeteor({ name }: {name: string}):void {
  const projectPath = path.resolve(process.cwd(), name)
  console.log(colors.white.bold('Fetching boilerplate...'))

  run(`git clone ${gitRepo} --depth=1 ${name}`)
    .then(() => {
      console.log(colors.green.bold('Boilerplate fetched'))
    })
    .then(() => {
      console.log(colors.white.bold('Configuring new project...'))
      return new Promise((resolve, reject) => {
        rimraf(path.resolve(projectPath, '.git'), () => {
          resolve()
        })
      })
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
      console.log(colors.white(`Done. Project ${name} created and git initialized under the working directory`))
    })
}

function run(command:string):Promise {
  return new Promise((resolve, reject) => {
    const proc = exec(command)

    proc.on('close', code => {
      if(code !== 0) {
        reject({command, code})
        return
      }

      resolve()
    })
  })
}
