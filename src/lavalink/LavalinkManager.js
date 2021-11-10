const { Manager } = require('@lavacord/eris')
const LavalinkPlayer = require('./LavalinkPlayer')
const { Logger } = require('../utils')
const EventEmitter = require('events')
// fallback for test env
let connect
try {
  connect = require('./LavalinkConfig').connect
} catch (e) {
  Logger.info('Couldn\'t find LavalinkConfig.json. Music support will be unavaliable.')
  connect = []
}

module.exports = class LavalinkManager extends EventEmitter {
  constructor(client) {
    super()
    this.client = client

    if (!(connect !== undefined)) {
      this.emit('state', (false))
    }
    /**
     * @description
     * @type {TrackData?}
     */
    this.track = null;
    this.default = false;

    if (this.default === false) {
      this.on('setManager', (client) => {

        this.client = client
        this.default = true
        this.manager = new Manager(this.client, connect, {
          user: this.client.user.id,
          shards: parseInt(process.env.SHARD_COUNT)
        })
        this.manager.connect().catch(() => Logger.error('I\'m unable to connect to Lavalink, sorry...'))
      })
    }
  }

  getBestHost () {
    return connect[Math.floor(Math.random() * connect.length)].id
  }

  async connect () {
    try {
      await this.manager.connect()
      Logger.info('Lavalink nodes has been sucessfully connected.')
    } catch {
      Logger.warning('Lavalink nodes aren\'t connected.')
    }
  }

  async join (channel) {
    const manager = await this.manager.join({ channel, guild: this.client.getChannel(channel).guild.id, node: this.getBestHost() }, { selfdeaf: true })
    return new LavalinkPlayer(manager, this)
  }
}
