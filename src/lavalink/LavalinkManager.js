const { Manager } = require('@lavacord/eris')
const LavalinkPlayer = require('./LavalinkPlayer')
const { connect } = require('./LavalinkConfig')
const { Logger } = require('../utils')

module.exports = class LavalinkManager {
  constructor (client) {
    this.client = client
    this.manager = new Manager(this.client, connect, {
      user: this.client.user.id,
      shards: parseInt(process.env.SHARD_COUNT)
    })
  }

  getBestHost () {
    return connect[Math.floor(Math.random() * connect.length)].id
  }

  async connect () {
    try {
      await this.manager.connect()
      Logger.debug('Lavalink nodes has been sucessfully connected.')
    } catch {
      Logger.warning('Lavalink nodes aren\'t connected.')
    }
  }

  async join (channel) {
    const manager = await this.manager.join({ channel, guild: this.client.getChannel(channel).guild.id, node: this.getBestHost() }, { selfdeaf: true })
    return new LavalinkPlayer(manager)
  }
}
