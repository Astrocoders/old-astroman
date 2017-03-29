export default ({ name }: { name:string }):string => (
`import { Map } from 'immutable'
import {
  ACTION,
} from './constants'

const initialState = Map({})

export default function ${name.toLowerCase()}(state = initialState, { type, payload }){
  switch(type){
    case ACTION: return state
    default: return state
  }
} 
`
)
