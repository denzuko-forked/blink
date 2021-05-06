const fs = require('fs')
const path = require('path')
const { orderBy } = require('natural-orderby')

function sidebar(folder) {
  const objs = fs.readdirSync(folder, { withFileTypes: true })
  return orderBy(objs, x => x.name).map(x => {
    const basePath = path.join(folder, x.name)

    return x.isDirectory()
      ? {
          type: 'category',
          label: x.name,
          items: sidebar(basePath)
        }
      : basePath.substring(5, basePath.length - 3) // strip out docs/ prefix and .md postfix
  })
}

module.exports = {
  docs: sidebar('docs')
}
