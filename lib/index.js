#!/usr/bin/env node
import yargs from 'yargs'
import 'colors'

yargs
  .usage(
    `A one-in-all scaffolding tool for React Native, Meteor and React Boilerplate projects.

    Usage: $0 <command> [options]
    `
  )
  .command(require('./commands/create'))
  .alias('c', 'create')
  .example('$0 create scene <name>', 'will create a app scene and update the router entries')
  .example('$0 create reduxer <name>', 'will create redux reducer, actions and Container files for the state')
  .example('$0 create service <name>', 'will create a service file [NOT YET]')
  .example('$0 create helper <name>', 'will create a helper file [NOT YET]')
  .example('$0 create container <name>', 'will create a container component [NOT YET]')
  .example('$0 create component <name>', 'will create a reusable component')
  .command(require('./commands/init'))
  .example('$0 init react-native-meteor <name>', 'will create a new React Native project backed by a Meteor Server from Astrocoders boilerplate')
  .example('$0 init react-native-relay <name>', 'will create a new React Native project that uses relay [NOT YET]')
  .example('$0 init meteor <name>', 'will create a new Meteor project [NOT YET]')
  .help('h')
  .argv
