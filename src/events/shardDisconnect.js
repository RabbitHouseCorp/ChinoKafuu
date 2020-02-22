module.exports = class ShardDisconnectReceive {
    constructor(client) {
        this.client = client
    }

    run(shard) {
        console.log(`Shard ${shard} has be desconnected of websoket`)
    }
}