module.exports = class ShardReadyReceive {
    constructor(client) {
        this.client = client
    }

    run(shard) {
        console.log(`Shard: ${shard} successfully connected.`)
    }
}