const Module = require('../registry/Module')

module.exports = class Command extends Module {
  constructor (options) {
    super()
    this.name = options.name
    this.arguments = options.arguments || 0
    this.aliases = options.aliases || []
    this.hasUsage = options.hasUsage || false
    this.permissions = options.permissions || []
    this.cooldown = options.cooldown || 5
    this.slash = options.slash || null
  }

  // eslint-disable-next-line no-unused-vars
  run (ctx) {}
}
