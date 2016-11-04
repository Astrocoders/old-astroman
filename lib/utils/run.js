import { exec } from 'child_process'

/*
 * Run a given command in shell and returns a Promise
*/
export default function run(command:string):Promise {
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
