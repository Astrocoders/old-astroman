export default ({ name }: { name:string }):string => (
`import {
  ACTION,
} from './constants'

export default function ${name.toLowerCase()}(state = {
}, action = {}){
  switch(action.type){
    case ACTION: return { ...state }
    default: return state
  }
} 
`
)
