const Listener = require('../structures/events/Listener')
const Logger = require('../structures/util/Logger')

module.exports = class DebugListener extends Listener {
  constructor() {
    super()
    this.event = 'shardDisconnect'
  }

  async on(client, shardId) {
    Logger.shardMessage('Mayday! Shard ' + shardId + ' has died!')
  }
}
