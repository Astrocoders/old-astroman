export default ({ name }: { name:string }):string => (
`import {
  ACTION,
} from './actions'

export default function ${name}(state = {
}, action = {}){
  switch(action.type){
    case ACTION: return { ...state }
    default: return state
  }
} 
`
)
