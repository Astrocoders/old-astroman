# `astroman`
[![travis](https://travis-ci.org/Astrocoders/astroman.svg?branch=develop)](https://travis-ci.org/Astrocoders/astroman)

Rapid scaffolding for React Native, Meteor and React Boilerplate [add more description] projects

## Install
```
yarn global add astroman
```

## Usage

## Init
`astroman` helps you initialize these type of projects:
```
astroman init react-native MyProject
```
![Init react native](https://github.com/Astrocoders/astroman/raw/develop/imgs/initReactNative.gif)

## Create
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
$ astroman create redux Todos
# creates redux/Todos/reducer.js, redux/Todos/actions.js/ redux/Todos/Container.js redux/Todos/logic.js
# it also update the main reducers file with the new reducer
```
Create redux action (requires `create redux` to have been called before!):
```
$ astroman create reduxAction Todo/addNewOne
```
This one will create the action creator in `Todos/actions.js`, the constant in `Todos/constants.js` and add the new
switch entry in `Todos/reducer.js`
### Meteor
Create methods:
```
$ astroman create method articles/update articleSlug:String,authorId:SimpleSchema.RegEx.Id
```

### What's coming
- A single boilerplate for React Native and commands for removing or adding integrations (Meteor, Relay, Apollo, etc.).
- Better testing integration

### Contributing
PRs and issues are welcome!
