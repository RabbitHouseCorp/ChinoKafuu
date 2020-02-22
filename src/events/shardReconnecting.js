module.exports = class ShardReconnectReceive {
    constructor(client) {
        this.client = client
    }

    run(shard) {
        console.log(`Reconnecting shard ${shard}...`)
    }
}