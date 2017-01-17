import path from 'path'

const ROOT = 'app/'
export default {
  components: path.join(ROOT, '/Components'),
  redux: path.join(ROOT, '/redux'),
  scenes: path.join(ROOT, 'Scenes/'),
  rootRouter: path.join(ROOT, '/Scenes/App/index.js'),
  rootScenes: path.join(ROOT, '/Scenes/index.js'),
  meteor: {
    methods: '/imports/server/methods/',
    publications: '/imports/publications/methods/',
    collections: '/imports/both/collections/',
  },
}
