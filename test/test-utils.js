// Set of useful functions to facilitate testing
const { readdirSync, lstatSync } = require('fs')


const loadClassesRecursive = (path) => {
  readdirSync(path).forEach((df) => {
    const fp = `${path}/${df}`
    if (lstatSync(fp).isDirectory()) return loadClassesRecursive(fp)
    const C = require(fp)
    new C()
  })
}

module.exports = { loadClassesRecursive }
