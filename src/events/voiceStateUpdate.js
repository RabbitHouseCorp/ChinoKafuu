module.exports = class voiceStateUptade {
	constructor(client) {
		this.client = client
	}

	async run(oldMember, newMember) {
		let server = await this.client.database.Guilds.findById(newMember.guild.id)
		let newVoiceChannel = this.client.guilds.cache.get(server._id).channels.cache.get(server.animuChannel)
		if (newVoiceChannel) {
			if (server.animu) {
				if (newVoiceChannel) {
					if (newVoiceChannel.members.get(this.client.user.id) && newVoiceChannel.members.size === 1) {
						newVoiceChannel.leave()
					}
					if (newVoiceChannel.members.size >= 1) {
						if (newVoiceChannel.members.get(this.client.user.id)) return
						newVoiceChannel.join().then(connection => {
							connection.play("http://cast.animu.com.br:9021/stream", { volume: 0.5 })
						})
					}
				}
			}
		}
	}
}