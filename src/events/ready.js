const DBL = require("dblapi.js")
const Sentry = require('@sentry/node')
const LavalinkManager = require('../lavalink/LavalinkManager')
module.exports = class {
	constructor(client) {
		this.client = client
	}

	async run() {
		const lavalink = new LavalinkManager(this.client)
		this.client.lavalink = lavalink
		await lavalink.connect()
		if (!this.client.config.canary) {
			const dbl = new DBL(this.client.config.dbltoken, this.client)
			dbl.postStats(this.client.guilds.cache.size, this.client.shard.ids, this.client.shard.count)
			dbl.on("error", console.error)
		}
		
		console.log(`${this.client.user.username} has been connected to Discord`)
		this.client.owner = await this.client.users.fetch("395788326835322882")
		let status = [
			{ name: `If you need support, use ${this.client.config.prefix}help`, type: "PLAYING" },
			{ name: `Find out it my commands using ${this.client.config.prefix}commands`, type: "PLAYING" },
			{ name: "With Cocoa Hoto in Rabbit House 🐰", type: "WATCHING" },
			{ name: "🐦 Follow me in twitter: @ChinoKafuuBot", type: "PLAYING" },
			{ name: `I was created by ${this.client.owner.tag}`, type: "PLAYING" },
			{ name: `Add me using ${this.client.config.prefix}invite`, type: "LISTENING" },
			{ name: `Join in my support server using ${this.client.config.prefix}help or ${this.client.config.prefix}invite`, type: "PLAYING" },
			{ name: "Gochuumon Wa Usagi Desu Ka?", type: "WATCHING" },
			{ name: `If you find a bug, use ${this.client.config.prefix}help and warn my developer team.`, type: "PLAYING" },
			{ name: "Rabbits are cute, and nobody discord this! 🐰", type: "LISTENING" },
			{ name: "Coffee is my favourite drink.", type: "PLAYING" }
		]

		setInterval(() => {
			let randomStatus = status[Math.floor(Math.random() * status.length)]
			this.client.user.setPresence({ activity: randomStatus })
		}, 30000)
		Sentry.init({ dsn: process.env.SENTRY_DSN })
	}
}
