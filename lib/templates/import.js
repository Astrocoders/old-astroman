// @flow
export default ({ namespace, path }: { namespace: string, path: string }):string =>
  `import ${namespace} from '${path}'`
