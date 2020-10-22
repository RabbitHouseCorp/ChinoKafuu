const Module = require('../registry/Module')

module.exports = class Command extends Module {
  constructor (options) {
    super()
    this.name = options.name
    this.arguments = options.arguments || null
    this.aliases = options.aliases || []
    this.permissions = options.permissions || []
  }

  run (ctx) {}
}
