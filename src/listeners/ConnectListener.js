const Listener = require('../structures/events/Listener')
const Logger = require('../structures/util/Logger')

module.exports = class ConnectListener extends Listener {
    constructor() {
        super()
        this.event = 'connect'
    }

    async on(client, shardID) {
        Logger.shardMessage(`Hurry up! Shard ${shardID} has alive!`)
    }
}
