import path from 'path'

const ROOT = 'app/'
export default {
  components: path.join(ROOT, '/Components'),
  redux: path.join(ROOT, '/redux'),
  scenes: path.join(ROOT, 'Routes/'),
  rootRouter: path.join(ROOT, '/Scenes/App/index.js'),
  rootScenes: path.join(ROOT, '/Scenes/index.js'),
}