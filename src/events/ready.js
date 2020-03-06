const lavalinkManager = require("../lavalink/lavalinkManager")
const DBL = require("dblapi.js")
module.exports = class {
	constructor(client) {
		this.client = client
	}

	async run() {
		const dbl = new DBL(this.client.config.dbltoken, this.client)
		let guilds = await this.client.shardManager.getAllSizeObject("guilds")
		let users = await this.client.shardManager.getAllSizeObject("users")
		dbl.postStats(this.client.guilds.cache.size, this.client.shard.ids, this.client.shard.count)
		console.log(`${this.client.user.username} has been connected to Discord`)
		this.client.owner = await this.client.users.fetch("395788326835322882")
		this.client.lavalinkManager = new lavalinkManager(this.client)
		let status = [
			{ name: `If you need support, use ${this.client.config.prefix}help`, type: "PLAYING" },
			{ name: `Find out it my commands using ${this.client.config.prefix}commands`, type: "PLAYING" },
			{ name: "With Cocoa Hoto in Rabbit House 🐰", type: "WATCHING" },
			{ name: "🐦 Follow me in twitter: @ChinoKafuuBot", type: "PLAYING" },
			{ name: `I was raised by ${this.client.owner.tag}`, type: "PLAYING" },
			{ name: `Add me using ${this.client.config.prefix}invite`, type: "LISTENING" },
			{ name: `Happiless for ${Number(users).toLocaleString()} users!`, type: "WATCHING" },
			{ name: `Join in my support server using ${this.client.config.prefix}help or ${this.client.config.prefix}invite`, type: "PLAYING" },
			{ name: "Gochuumon Wa Usagi Desu Ka?", type: "WATCHING" },
			{ name: `If you find a bug, use ${this.client.config.prefix}help and warn my developer team.`, type: "PLAYING" },
			{ name: "Rabbits are cute, and nobody discord this! 🐰", type: "LISTENING" },
			{ name: `Much love for ${Number(users).toLocaleString()} users`, type: "PLAYING", url: "https://twitch.tv/danielagc" },
			{ name: "Coffee is my favorite drink.", type: "PLAYING" },
			{ name: `A total of ${Number(guilds).toLocaleString()} guilds`, type: "WATCHING" }
		]

		setInterval(() => {
			let randomStatus = status[Math.floor(Math.random() * status.length)]
			this.client.user.setPresence({ activity: randomStatus })
		}, 30000)
	}
}