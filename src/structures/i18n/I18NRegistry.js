const Logger = require('../util/Logger')
const { resolve, sep } = require('path')
const Registry = require('../registry/Registry')
const LanguageModule = require('./LanguageModule')
const DEFAULT_LANG = 'en-ES'

module.exports = class I18NRegistry extends Registry {
  constructor (path = resolve(__dirname, '..', '..', 'locales')) {
    super({ path, autoReload: process.env.ENABLE_REGISTRY_RELOAD || !process.env.PRODUCTION })
    this._defaultLang = null
    this.loadAll(this.path)
  }

  registerLanguage (language, path) {
    const existing = this.modules.find(m => m.language === language)
    if (existing) {
      return existing
    }
    const newLanguage = new LanguageModule(path, language)
    this.modules.push(newLanguage)
    return newLanguage
  }

  loadAll (...args) {
    super.loadAll(...args)
  }

  loadModule (path) {
    try {
      delete require.cache[require.resolve(path)]
      const data = require(path)

      const [, language, namespace] = path.replace(this.path, '').split(sep)
      const module = this.registerLanguage(language, resolve(this.path, path))

      module.loadNamespace(namespace.replace('.json', ''), data)

      this.emit('load', module)
      return true
    } catch (e) {
      Logger.error(`Error loading ${path}: ${e.stack}`)
      return false
    }
  }

  t (languageModule, key, placeholders) {
    if (!languageModule || !Object.prototype.hasOwnProperty.call(languageModule.translations, key)) {
      return
    }

    return I18NRegistry.interpolation(languageModule.translations[key], placeholders)
  }

  get defaultLanguage () {
    if (!this._defaultLang) {
      this._defaultLang = this.modules.find(m => m.language === DEFAULT_LANG)
    }
    return this._defaultLang
  }

  getT (language) {
    return (key, placeholders) => {
      const languageModule = this.modules.find(m => m.language === language) || this.defaultLanguage
      return this.t(languageModule, key, placeholders) || this.t(this.defaultLanguage, key, placeholders) || key
    }
  }

  static interpolation (str, placeholders) {
    return str.replace(/\{\{(\w)\}\}/g, (_, i) => placeholders[i] || '')
  }
}
