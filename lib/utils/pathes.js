import path from 'path'

const ROOT = 'app/'
export default {
  components: path.resolve(ROOT, '/components'),
  redux: path.resolve(ROOT, '/redux'),
  scenes: path.resolve(ROOT, 'Routes/'),
  rootRouter: path.resolve(ROOT, '/Scenes/App/index.js'),
  rootScenes: path.resolve(ROOT, '/Scenes/index.js'),
}
