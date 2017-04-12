import path from 'path'
import { getAppMainPackagePath } from '~/utils/filesystem/packageJson'
import run from '~/utils/run'
import * as git from '~/utils/git'
import * as lerna from '~/utils/lerna'

export default function plug({ source }){
  git
    .clone({
      repo: source,
      where: path.join(getAppMainPackagePath(), 'packages'),
    })
    .then(lerna.bootstrap)
    .catch(e => console.log(e))
}
