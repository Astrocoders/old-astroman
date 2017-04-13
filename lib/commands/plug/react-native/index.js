import path from 'path'
import { getAppMainPackagePath } from '~/utils/filesystem/packageJson'
import run from '~/utils/run'
import * as git from '~/utils/git'
import * as lerna from '~/utils/lerna'
import pluginWireUp from './utils/wireUp'

export default function plug({ source }){
  const wherePath = path.join(getAppMainPackagePath(), 'packages')

  git
    .clone({
      repo: source,
      where: wherePath,
    })
    .then(() => git.remove({
      projectPath: path.join(wherePath, git.getRepoNameFromUrl(source))
    }))
    .then(lerna.bootstrap)
    .then(() => pluginWireUp({ source }))
    .catch(e => console.log(e))
}
