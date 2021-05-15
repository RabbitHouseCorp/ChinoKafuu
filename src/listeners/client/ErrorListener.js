const Listener = require('../../structures/events/Listener')
const { Logger } = require('../../utils')

module.exports = class ErrorListener extends Listener {
  constructor () {
    super()
    this.event = 'error'
  }

  async on (client, error) {
    Logger.error(error)
  }
}
