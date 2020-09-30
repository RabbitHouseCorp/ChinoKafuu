module.exports = class ShardErrorReceive {
    constructor(client) {
        this.client = client
    }

    run(err, shard) {
        console.log(`[SHARDING MANAGER] ERR! Shard ${shard} error: ${err}`)
    }
}
