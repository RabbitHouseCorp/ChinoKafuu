// Set of useful functions to facilitate testing
const { readdirSync, lstatSync } = require('fs')

String.prototype.isUpperCase = function (index) {
  return this[index].toUpperCase() === this[index].toUpperCase()
}

String.prototype.getAt = function (splitter, index) {
  return this.split(splitter)[index == -1 ? this.split(splitter).length - 1 : index]
}

const getAllFilesRecursive = (path) => {
  const list = []
  const rec = (patht) => {
    readdirSync(patht).forEach((df) => {
      const fp = `${patht}/${df}`
      if (lstatSync(fp).isDirectory()) return rec(fp)
      list.push(fp)
    })
  }
  rec(path)
  return list
}

const loadClassesRecursive = (path) => {
  getAllFilesRecursive(path).forEach((df) => {
    const C = require(df)
    new C()
  })
}
module.exports = { loadClassesRecursive, getAllFilesRecursive }
