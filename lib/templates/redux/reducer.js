export default ({ name }: { name:string }):string => (
`import {
  ACTION,
} from './constants'

const initialState = {}

export default function ${name.toLowerCase()}(state = initialState, { type, payload }){
  switch(type){
    case ACTION: return { ...state }
    default: return state
  }
} 
`
)
