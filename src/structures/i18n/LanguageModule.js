const Module = require('../registry/Module')

class LanguageModule extends Module {
  constructor (path, language) {
    super()
    this.__path = path
    this.language = language
    this.translations = {}
  }

  loadNamespace (namespace, data) {
    this.translations = { ...this.translations, ...LanguageModule.parseObj(namespace + ':', data)[0] }
  }

  static parseObj (name, o) {
    return Object.keys(o).reduce((p, v) => {
      const [currentObj, key] = p
      const seperator = key.endsWith(':') ? '' : '.'

      if (typeof o[v] === 'object') {
        const [newObj] = LanguageModule.parseObj(key + seperator + v, o[v])

        Object.keys(newObj).forEach(n => {
          currentObj[n] = newObj[n]
        })

        return [currentObj, key]
      }

      return [{ ...currentObj, [key + seperator + v]: o[v] }, key]
    }, [{}, name])
  }
}

module.exports = LanguageModule
