export default ({ name }: { name:string }):string => (
`export const ACTION = '${name.toLowerCase()}/ACTION'`
)
