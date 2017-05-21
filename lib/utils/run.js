import {exec} from 'child_process'

/*
 * Run a given command in shell and returns a Promise
*/
export default function run(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      console.log(stdout)
      console.log(stderr)

      if (error) {
        reject(error)
        return
      }

      resolve()
    })
  })
}
