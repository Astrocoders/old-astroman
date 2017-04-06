import saveFile from '~/utils/filesystem/saveFile'

export default function saveASTtoFile({ filePath, ast }){
  const newContent = ast
    .toSource({
      quote: 'single',
      trailingComma: true,
      tabWidth: 2,
      trailingComma: true,
      wrapColumn: 80,
      reuseWhitespace: true,
    })

  saveFile({
    filePath,
    content: sanitizeLineSemicolons(newContent),
  })
}

function sanitizeLineSemicolons(string){
  return string.replace(/;$/gim, '')
}
