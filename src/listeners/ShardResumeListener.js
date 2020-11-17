const Listener = require('../structures/events/Listener')
const Logger = require('../structures/util/Logger')

module.exports = class ShardResumeListener extends Listener {
    constructor() {
        super()
        this.event = 'shardResume'
    }

    async on(client, shardID) {
        Logger.shardMessage(`Let's go! Shard ${shardID} has been resumed!`)
    }
}
