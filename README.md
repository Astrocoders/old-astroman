# `astroman`
[![travis](https://travis-ci.org/Astrocoders/astroman.svg?branch=develop)](https://travis-ci.org/Astrocoders/astroman)

Rapid scaffolding for React Native, Meteor and React Boilerplate [add more description] projects

## Install
```
yarn global add astroman
```

## Usage
# React Native
Commands in React Native environment

## Init
`astroman` helps you initialize these type of projects:
```
astroman init react-native MyProject
```
![Init react native](https://github.com/Astrocoders/astroman/raw/develop/imgs/initReactNative.gif)

## Create

### astroman create scene [name]
```
$ astroman create scene Dashboard
```
### astroman create component [name]
```
$ astroman create component ButtonRounded
```

### astroman create redux [InterfaceName]
We call interface the reducer name in which that state will be hold on along with 
this particular reducer actions, container and logic.
```
$ astroman create redux Todos
# creates redux/Todos/reducer.js, redux/Todos/actions.js/ redux/Todos/Container.js redux/Todos/logic.js
# it also update the main reducers file with the new reducer
```
### astroman create reduxAction [InterfaceName/actionName]
IMPORTANT: _Requires `create redux` to have been called before!_
```
$ astroman create reduxAction Todos/addNewOne
```
This one will create the action creator in `Todos/actions.js`, the constant in `Todos/constants.js` and add the new
switch entry in `Todos/reducer.js`

## Astroplugins
With astroplugins we intend to encapsule "tiny apps" with their own ecosystem as reusable packages
easily to plug in in the main one.
For that we estabilished that the main app should always when possible use only redux and redux-logics as middleman to communicate
with data and site effects. Of course that there should be cases where you need to make exceptions, but try to stick with that as much as you can. Using redux and redux-logics as middleman offers a incredible abstraction allowing you to stop rewriting integrations for every backend.

## Commands
### astroman plug [gitURL]
```
$ astroman plug git@github.com:user/repo.git
```
### astroman create plugin [pluginName]
NOT DONE
### astroman remove plugin [pluginName]
NOT DONE

### Contributing
PRs and issues are welcome!
