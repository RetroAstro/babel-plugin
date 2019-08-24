const fs = require('fs')
const path = require('path')
const babel = require('@babel/core')

function transform(code, options) {
  return babel
    .transform(code, { ...options, sourceMaps: 'inline' }).code
}

var code = fs.readFileSync(
  path.resolve(__dirname, '../input.js'),
  'utf-8'
)

var result = transform(
  transform(code, { plugins: ['./lib/plugin'] }),
  { presets: ['@babel/preset-env'] }
)

fs.writeFileSync(
  path.resolve(__dirname, '../output.js'),
  result
)
