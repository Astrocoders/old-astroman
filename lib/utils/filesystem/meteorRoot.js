//
import findConfig from 'find-config'

export default function getMeteorRootPath() {
  return (findConfig('.meteor/.finished-upgraders') || '').replace('.meteor/.finished-upgraders', '')
}
