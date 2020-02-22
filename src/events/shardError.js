module.exports = class ShardErrorReceive {
    constructor(client) {
        this.client = client
    }

    run(err, shard) {
        console.log(`An error occurred in shard ${shard}\n\nShard error: ${err}`)
    }
}