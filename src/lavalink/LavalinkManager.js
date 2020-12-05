const { Manager } = require('@lavacord/eris')
const LavalinkPlayer = require('./LavalinkPlayer')
const nodes = require('./LavalinkConfig').connect
const { Logger } = require('../utils')

module.exports = class LavalinkManager {
    constructor(client) {
        this.client = client
        this.manager = new Manager(this.client, nodes, {
            user: this.client.user.id,
            shards: parseInt(process.env.SHARD_COUNT)
        })
    }

    getBestHost() {
        return nodes[Math.floor(Math.random() * nodes.length)].id
    }
    async connect() {
        try {
            await this.manager.connect()
            Logger.info('Lavalink nodes has been sucessfully connected.')
        } catch {
            Logger.warning('Lavalink nodes aren\'t connected.')
        }
    }
    async join(channel) {
        const manager = await this.manager.join({ channel, guild: this.client.getChannel(channel).guild.id, node: this.getBestHost() }, { selfdeaf: true })
        return new LavalinkPlayer(manager)
    }
}