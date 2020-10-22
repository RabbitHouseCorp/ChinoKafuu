const Logger = require('../util/Logger')
const { lstatSync } = require('fs')
const Registry = require('../registry/Registry')

module.exports = class I18NRegistry extends Registry {
  constructor (path = __dirname + '/../../locales') {
    super({ path, autoReload: process.env.ENABLE_REGISTRY_RELOAD || !process.env.PRODUCTION })
    
    this.loadAll(this.path)
  }
  
  loadModule (path) {
    try {
      delete require.cache[require.resolve(path)]
      let module = require(path)
      if (this.modules.filter((a) => a.__path === path)[0]) return true
      
      module.__path = path
      module.language = path.replace(this.path, '').split('/')[1]
      const fullPath = path.split('.')[path.split('.').length - 2].split('/')
      
      module.namespace = fullPath[fullPath.length - 1]
      this.modules.push(module)
      
      this.emit('load', module)
      return true
    } catch (e) {
      Logger.error(`Error loading ${path}: ${e.stack}`)
      return false
    }
  }
  
  getT (language) {
    const languageModules = this.modules.filter(b => b.language === language)
    
    if (!languageModules[0]) return undefined
    return (key, templates) => {
      let namespace = key.split(':')
      let fullPath = namespace.pop().split('.')
      let currentPath = languageModules.filter(z => z.namespace === namespace[0])[0]

      fullPath.forEach((path) => {
        currentPath = currentPath[path]
        if (!currentPath) return undefined
      })
      
      for (const template in templates) {
        currentPath = currentPath.split(`{{${template}}}`).join(templates[template])
      }
      
      return currentPath
    }
  }
}
