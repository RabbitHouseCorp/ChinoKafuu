const { ShardingManager } = require("discord.js")
const { shard } = require("./config.json")
const shards = new ShardingManager("./index.js", {
	respawn: true,
	totalShards: shard
})

shards.on("shardCreate", (shard) => {
	console.warn(`Starting shard: ${shard.id}`)
})
async function spawn() {
	await shards.spawn()
}

spawn()
