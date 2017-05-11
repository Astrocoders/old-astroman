//
import {exec} from 'child_process'

/*
 * Run a given command in shell and returns a Promise
*/
export default function run(command) {
  return new Promise((resolve, reject) => {
    const proc = exec(command)

    proc.on('close', code => {
      if (code !== 0) {
        reject(new Error({command, code}))
        return
      }

      resolve()
    })
  })
}
