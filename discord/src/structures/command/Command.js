const Module = require('../registry/Module')

module.exports = class Command extends Module {
  constructor (options) {
    super()
    this.name = options.name
    this.aliases = options.aliases || []
    this.permissions = options.permissions || []
    this.isBeta = options.isBeta || false
    this.cooldown = options.cooldown || 5
    this.slash = options.slash || null
    this.removeDefaultCallback = options.removeDefaultCallback || false
    this.callback_metadata = {}
  }

  // This is done to return the interaction data so when the user will execute the command automatically the function will be executed.
  // eslint-disable-next-line no-unused-vars
  callback(interaction) { }

  // eslint-disable-next-line no-unused-vars
  run (ctx) {}
}
