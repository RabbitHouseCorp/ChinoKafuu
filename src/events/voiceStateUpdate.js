module.exports = class voiceStateUptade {
	constructor(client) {
		this.client = client
	}

	async run(oldMember, newMember) {
		const server = await this.client.database.Guilds.findById(newMember.guild.id)
		const newVoiceChannel = this.client.guilds.cache.get(server._id).channels.cache.get(server.animuChannel)
		const guild = this.client.guilds.cache.get(server._id)
		if (server.animu) {
			if (newVoiceChannel) {
				if (newVoiceChannel.members.get(this.client.user.id) && newVoiceChannel.members.size === 1) {
					await this.client.lavalink.manager.leave(guild.id)
					this.client.lavalink.manager.players.delete(guild.id)
					this.client.player.delete(guild.id)
				}

				if (newVoiceChannel.members.size >= 1) {
					if (newVoiceChannel.members.get(this.client.user.id)) return
					if (this.client.player.has(guild.id)) return
					const song = await this.client.lavalink.join(newVoiceChannel.id)
					song.playAnimu()
					this.client.player.set(guild.id, song)
				}
			}
		}

	}
}