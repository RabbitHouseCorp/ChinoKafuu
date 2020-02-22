module.exports = class voiceStateUptade {
	constructor(client) {
		this.client = client
	}

	async run(oldMember, newMember) {
		if (this.client.player.get(oldMember.guild.id)) {
			let voiceChannel = this.client.channels.cache.get(this.client.player.get(oldMember.guild.id).player.channel)
			if (voiceChannel.members.size === 1) {
				await this.client.lavalinkManager.manager.leave(oldMember.guild.id)
				this.client.lavalinkManager.manager.delete(oldMember.guild.id)
				this.client.player.delete(oldMember.guild.id)
			}
		}

		let server = await this.client.database.Guilds.findById(newMember.guild.id)
		let newVoiceChannel = this.client.guilds.cache.get(server._id).channels.cache.get(server.animuChannel)
		if (newVoiceChannel) {
			if (server.animu) {
				if (newVoiceChannel) {
					if (newVoiceChannel.members.size >= 1) {
						newVoiceChannel.join().then(connection => {
							connection.play("http://cast.animu.com.br:9021/stream", { volume: 0.5 })
						})
					}
				}

				if (newVoiceChannel.members.get(this.client.user.id) && newVoiceChannel.members.size === 1) {
					newVoiceChannel.leave()
				}
			}
		}
	}
}