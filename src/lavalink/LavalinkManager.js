const { Manager } = require('@lavacord/eris')
const LavalinkPlayer = require('./LavalinkPlayer')
let nodes = require('./LavalinkConfig').connect

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
        return await this.manager.connect()
    }
    async join(channel) {
        return new LavalinkPlayer(await this.manager.join({ channel, guild: this.client.getChannel(channel).guild.id, node: this.getBestHost() }, { selfdeaf: true }))
    }
}