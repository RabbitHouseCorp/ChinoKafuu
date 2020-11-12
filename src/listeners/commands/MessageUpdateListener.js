const Listener = require('../../structures/events/Listener')
const CommandRunner = require('../../structures/command/CommandRunner')

module.exports = class MessageUpdateListener extends Listener {
	constructor() {
		super()

		this.event = 'messageUpdate'
	}

	async on(client, newMsg, oldMsg) {
		if (newMsg.content === oldMsg.content) return
		await CommandRunner.run(client, newMsg)
	}
}
