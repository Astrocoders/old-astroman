import path from 'path'

const ROOT = 'src/'
export default {
  components: path.join(ROOT, '/Components'),
  componentsTests: path.join(ROOT, '/Components/__tests__'),
  redux: path.join(ROOT, '/redux'),
  rootReduxReducers: path.join(ROOT, '/redux/reducers.js'),
  rootReduxLogics: path.join(ROOT, '/redux/logics.js'),
  scenes: path.join(ROOT, 'Scenes/'),
  rootRouter: path.join(ROOT, '/index'),
  rootScenes: path.join(ROOT, '/Scenes/index.js'),
  meteor: {
    methods: '/imports/server/methods/',
    publications: '/imports/publications/methods/',
    collections: '/imports/both/collections/',
    entity: '/imports/client/Pages/',
  },
}
