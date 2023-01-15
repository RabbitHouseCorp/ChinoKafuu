// Set of useful functions to facilitate testing
import { lstatSync, readdirSync } from 'fs'

String.prototype.isUpperCase = function (index) {
  return this[typeof index === 'number' ? 0 : index].toUpperCase() === this[typeof index === 'number' ? 0 : index].toUpperCase()
}

String.prototype.getAt = function (splitter, index) {
  return this.split(splitter)[index === -1 ? this.split(splitter).length - 1 : index]
}

const getAllFilesRecursive = (path) => {
  const list = []
  const rec = (patht) => {
    readdirSync(patht.replace(/(\\test\/)|(test\/)|(\\test)|(\\test\/)|(\\test\/)/g, '')).forEach((df) => {
      const fp = `${patht.replace(/(\\test\/)|(test\/)|(\\test)/g, '')}/${df.replace(/(\\test\/)|(test\/)|(\\test)|(\\test\/)|(\\test\/)/g, '')}`
      if (lstatSync(fp).isDirectory()) return rec(fp)
      list.push(fp)
    })
  }
  rec(path)
  return list
}

const loadClassesRecursive = (path) => {
  getAllFilesRecursive(path.replace(/(\\test\/)|(test\/)|(\\test)|(\\test\/)/g, '')).forEach((df) => {
    // eslint-disable-next-line security/detect-non-literal-require
    const C = require(df)
    const resolveC = C.default != undefined ? C.default : C
    new resolveC()
  })
}

export { loadClassesRecursive, getAllFilesRecursive }

