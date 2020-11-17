const Listener = require('../structures/events/Listener')
const Logger = require('../structures/util/Logger')

module.exports = class ShardPreReadyListener extends Listener {
    constructor() {
        super()
        this.event = 'shardPreReady'
    }

    async on(client, shardID) {
        Logger.shardMessage(`Alright! Connecting shard ${shardID}...`)
    }
}
