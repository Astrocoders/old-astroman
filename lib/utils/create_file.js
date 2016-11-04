import fs from 'fs'
import colors from 'colors/safe'
import path from 'path'

export default function createFile({ filePath, content }: { filePath: string, content: string }):void {
  console.log(colors.white.bold(`Creating component ${path.basename(name)}`))

  try {
    fs.writeFileSync(filePath, content)
  } catch(error) {
    console.log(colors.red.bold('Couldn\'t create file due to:'))
    console.log(error)
    process.exit(1)
  }

  console.log(colors.green.bold(`Successfully created ${filePath}`))
}
