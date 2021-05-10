const Listener = require('../../structures/events/Listener')
const Logger = require('../../structures/util/Logger')

module.exports = class DebugListener extends Listener {
  constructor () {
    super()
    this.event = 'debug'
  }

  async on (client, message) {
    if (process.env.PRODUCTION === 'false') {
      Logger.debug(message)
    }
  }
}
