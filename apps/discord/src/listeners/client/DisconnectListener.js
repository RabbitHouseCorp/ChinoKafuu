const Listener = require('../../structures/events/Listener')
const Logger = require('../../structures/util/Logger')

module.exports = class DisconnectListener extends Listener {
  constructor() {
    super()
    this.event = 'disconnect'
  }

  // eslint-disable-next-line no-unused-vars
  async on(client) {
    Logger.shardMessage('Mayday! All shard has died!')
  }
}
