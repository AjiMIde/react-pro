'use strict'
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '../', dir)
}
console.log(path.join(__dirname, '../', 'src/views'))

module.exports = {
  context: path.resolve(__dirname, './'),
  resolve: {
    // extensions: ['.js', '.vue', '.json'],
    alias: {
      '@views': path.join(__dirname, '../', 'src/views'),
      // '@api': path.join(__dirname, '../', 'src/api'),
      // '@assets': path.join(__dirname, '../', 'src/assets'),
      // '@components': path.join(__dirname, '../', 'src/components'),
      // '@styles': path.join(__dirname, '../', 'src/styles'),
    }
  }
}
