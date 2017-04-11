#!/usr/bin/env node
import yargs from 'yargs'
import 'colors'

// Commands
const createCommand = require('./commands/create')
const initCommand = require('./commands/init')
const plugCommand = require('./commands/plug')

yargs
  .usage(
    `A one-in-all scaffolding tool for React Native, Meteor and React Boilerplate projects.

    Usage: $0 <command> [options]
    `
  )

// Create command
  .command(createCommand)
  .alias('c', 'create')
  .example('$0 create scene <name>', 'will create a app scene and update the router entries')
  .example('$0 create redux <name>', 'will create the redux interface: reducer, actions and Container files')
  .example('$0 create meteor <name>', 'will create a Meteor container with a methods logic [NOT READY]')
  .example('$0 create component <name>', 'will create a reusable component')

// Init command
  .command(initCommand)
  .example('$0 init reactNative <name>', 'will create a new React Native project from Astrocoders boilerplate')

// Plug command
  .command(plugCommand)
  .example('$0 plug <url>')

  .help('h')
  .alias('h', 'help')
  .argv
