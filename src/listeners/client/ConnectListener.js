const Listener = require('../../structures/events/Listener')
const Logger = require('../../structures/util/Logger')

module.exports = class ConnectListener extends Listener {
  constructor () {
    super()
    this.event = 'connect'
  }

  async on (client, shardID) {
    client.shardUptime.set(shardID, {
      shardID,
      uptime: Date.now()
    })

    Logger.shardMessage(`Hurry up! Shard ${shardID} is alive!`)
  }
}
