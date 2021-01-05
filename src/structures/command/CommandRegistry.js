const Registry = require('../registry/Registry')

module.exports = class CommandRegistry extends Registry {
    constructor(path = __dirname + '/../../commands') {
        super({ path, autoReload: process.env.ENABLE_REGISTRY_RELOAD || !process.env.PRODUCTION })

        this.loadAll(this.path)
    }

    findByName(name) {
        return this.findByProperty('name', name) || this.modules.filter((a) => a.aliases.includes(name))[0]
    }

    filterByCategory(category) {
        return this.modules.filter((cmd) => cmd.__path.trim().split('/').includes(category))
    }
}
