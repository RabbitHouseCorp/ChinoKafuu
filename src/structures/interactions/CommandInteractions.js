const { Message, Client } = require('eris')
const CommandContext = require('../command/CommandContext')
const Button = require('./Button')

module.exports = class CommandInteractions {
	constructor(message, commandContext) {
		this.message = message
		this.ctx = commandContext
		this.component = []
	}
	/**
	 *
	 *    | Type | Name      | Description                      |
	 *    | ---- | --------- | -------------------------------- |
	 *    | 1    | ActionRow | A container for other components |
	 *    | 2    | Button    | A clickable button               |
	 */
	components(...components) {
		const buttons = []

		for (let data of components) {
			buttons.push(data.data())
		}

		this.component.push({
			type: 1,
			components: buttons
		})
		return this
	}

	/**
	 *
	 *    | Type | Name      | Description                      |
	 *    | ---- | --------- | -------------------------------- |
	 *    | 1    | ActionRow | A container for other components |
	 *    | 2    | Button    | A clickable button               |
	 */
	actionRow(...action) {}

	returnCtx() {
		return this.ctx
	}
}
