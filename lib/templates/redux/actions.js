export default ({ name }: { name:string }):string => (
`export default ACTION = '${name}/ACTION'`
)
