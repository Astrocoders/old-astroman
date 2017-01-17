// @flow
import fs from 'fs'
import path from 'path'
import { merge } from 'lodash'
import findConfig from 'find-config'

export default function getMeteorRootPath():string {
  return findConfig('.meteor/packages').replace('.meteor/packages', '')
}
