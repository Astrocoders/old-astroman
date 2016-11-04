# `astroman`
[![travis](https://travis-ci.org/Astrocoders/astroman.svg?branch=develop)](https://travis-ci.org/Astrocoders/astroman)

Rapid scaffolding for React Native, Meteor and React Boilerplate [add more description] projects

## Install
```
yarn add --global astroman
```

## Usage
Create scenes:
```
$ astroman create scene Dashboard
```
Create component:
```
$ astroman create component ButtonRounded
```
Create redux files:
```
$ astroman create reduxer Todos
# creates redux/Todos/reducer.js, redux/Todos/actions.js/ redux/Todos/Container.js
# it also update the main reducers file with the new reducer
```

## Init helper
`astroman` helps you initialize these type of projects:
```
astroman init react-native-meteor MyProject // Will create a react native project from https://github.com/Astrocoders/astro-meteor-served-rn-boilerplate
```

### What's coming
- A single boilerplate for React Native and commands for removing or adding integrations (Meteor, Relay, Apollo, etc.).
- Better JS code update logic (for now we're using RegExps [ok we know, sorry!]) we plan to use some neat AST.

### Contributing
PRs and issues are welcome!
