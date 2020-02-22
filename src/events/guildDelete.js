const { Client } = require("discord.js")
let client = new Client()
module.exports = class GuildDelete {
	constructor(client) {
		this.client = client
	}

	async run(guild) {
		client = this.client
		await client.database.Guilds.findByIdAndDelete(guild.id)
	}
}