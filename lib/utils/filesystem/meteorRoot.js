// @flow
import findConfig from 'find-config'

export default function getMeteorRootPath():string {
  return (findConfig('.meteor/.finished-upgraders') || '').replace('.meteor/.finished-upgraders', '')
}
