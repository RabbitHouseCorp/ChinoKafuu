const { Eris } = require('eris')
const Emoji = require('../../utils/EmotesInstance')
module.exports = class CommandContext {
	/**
	 *
	 * @param bot {Eris.Client}
	 * @param message {Eris.Message}
	 * @param args {Array<String>}
	 * @param db
	 * @param t
	 */
	constructor(bot, message, args, db, t) {
		this.client = bot
		this.message = message
		this.args = args
		this.db = db
		this.t = t
	}

	/**
	 * Sends a message to this channel
	 * @param content The content to be sent
	 * @param options {object}
	 * @returns {Promise<Eris.Message> | Promise<Eris.Message<Eris.TextableChannel>> | Promise<Eris.Message<Eris.TextChannel>> | Promise<Eris.Message<Eris.NewsChannel>> | Promise<Eris.Message<Eris.PrivateChannel>>}
	 */
	send(content, options) {
		if (typeof content === 'object') {
			return this.client.createMessage(this.message.channel.id, { embed: content })
		}
		return this.client.createMessage(this.message.channel.id, { content: content, options })
	}

	/**
	 *
	 * @param content
	 * @param data
	 * @param options
	 * @returns {Promise<Eris.Message<Eris.TextableChannel>>}
	 */
	sendT(content, data = {}, options = {}) {
		return this.client.createMessage(this.message.channel.id, { content: this.t(content, data), options})
	}

	/**
	 * Sends a message with the author mention and an emoji
	 * @param emoji The emoji of the message
	 * @param content The content to be sent
	 * @param options
	 * @returns {Promise<Eris.Message> | Promise<Eris.Message<Eris.TextableChannel>> | Promise<Eris.Message<Eris.TextChannel>> | Promise<Eris.Message<Eris.NewsChannel>> | Promise<Eris.Message<Eris.PrivateChannel>>}
	 */
	reply(emoji, content, options = {}) {
		Emoji[emoji] ? emoji = Emoji[emoji] : emoji = ':bug:'
		return this.client.createMessage(this.message.channel.id, { content: `${emoji} **|** <@${this.message.author.id}>, ${content}`, options})
	}

	/**
	 *
	 * @param emoji
	 * @param content
	 * @param data
	 * @param options
	 * @returns {Promise<Eris.Message<Eris.TextableChannel>>}
	 */
	replyT(emoji, content, data = {}, options = {}) {
		Emoji[emoji] ? emoji = Emoji[emoji] : emoji = ':bug:'
		return this.client.createMessage(this.message.channel.id, { content: `${emoji} **|** <@${this.message.author.id}>, ${this.t(content, data)}`, options})
	}
}
