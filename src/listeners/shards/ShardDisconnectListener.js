const Listener = require('../../structures/events/Listener')
const Logger = require('../../structures/util/Logger')

module.exports = class ShardDisconnectListener extends Listener {
  constructor () {
    super()
    this.event = 'shardDisconnect'
  }

  async on (client, error, shardID) {
    client.shardUptime.set(shardID, {
      shardID,
      uptime: NaN
    })

    Logger.shardMessage(`Mayday! Shard ${shardID} has died!`)
  }
}
