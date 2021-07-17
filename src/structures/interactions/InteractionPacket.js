const ButtonEvent = require('./ButtonEvent')

module.exports = class InteractionPacket {
	constructor(data) {
		this.token = data.token
		this.version = data.version
		this.id = data.id
		this.guildID = data.guild_id
		this.data = data.data
		this.channelID = data.channel_id
		this.applicationID = data.application_id
		this.buttonEvent = new ButtonEvent(data.data)
	}
}
