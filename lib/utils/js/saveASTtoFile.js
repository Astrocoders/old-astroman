import saveFile from '~/utils/filesystem/saveFile'
import prettier from 'prettier'

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

  const lintedContent = prettier.format(newContent, {
    trailingComma: 'all',
    bracketSpacing: true,
    singleQuote: true,
  })

  saveFile({
    filePath,
    content: sanitizeLineSemicolons(lintedContent),
  })
}

function sanitizeLineSemicolons(string){
  return string.replace(/;$/gim, '')
}
