// @flow
import findConfig from 'find-config'

export default function getMeteorRootPath():string {
  return findConfig('.meteor/packages').replace('.meteor/packages', '')
}
