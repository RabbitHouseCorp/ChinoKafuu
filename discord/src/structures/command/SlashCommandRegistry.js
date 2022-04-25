const Registry = require('../registry/Registry')

module.exports = class SlashCommandRegistry extends Registry {
  constructor(path = __dirname + '/../../commands/slash') {
    super({ path, autoReload: process.env.ENABLE_REGISTRY_RELOAD || !process.env.PRODUCTION })

    this.loadAll(this.path)
  }

  findByName(name) {
    return this.findByProperty('name', name) || this.modules.filter((a) => a.aliases.includes(name))[0]
  }

  filterByCategory(category) {
    return this.modules.filter((cmd) =>
      cmd.__path
        .replace(/(\/+|\\+)([a-zA-Z0-9_.,]+)\.js/, '') // Remove file name.
        .trim()
        .replace(/(.(.*)(commands)|(\/+|\\+)|(^[a-zA-Z0-9_.,])(\/+|\\+))/, '') // Remove all encounters from the folder.
        .split(/(\\+|\/+)/g).includes(category))
  }
}
