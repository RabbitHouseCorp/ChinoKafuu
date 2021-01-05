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
	constructor(bot, message, args, db, _locale) {
		this.client = bot
		this.message = message
		this.args = args
		this.db = db
		this._locale = _locale
	}

	/**
	 * Sends a message to this channel
	 * @param content The content to be sent
	 * @param options {object}
	 * @returns {Promise<Eris.Message> | Promise<Eris.Message<Eris.TextableChannel>> | Promise<Eris.Message<Eris.TextChannel>> | Promise<Eris.Message<Eris.NewsChannel>> | Promise<Eris.Message<Eris.PrivateChannel>>}
	 */
	async send(content, options) {
		return await this.message.channel.createMessage(content, options)
	}

	/**
	 *
	 * @param content
	 * @param data
	 * @param options
	 * @returns {Promise<Eris.Message<Eris.TextableChannel>>}
	 */
	async sendT(content, data = {}, options = {}) {
		return await this.message.channel.createMessage({ content: this._locale(content, data), options })
	}

	/**
	 * Sends a message with the author mention and an emoji
	 * @param emoji The emoji of the message
	 * @param content The content to be sent
	 * @param options
	 * @returns {Promise<Eris.Message> | Promise<Eris.Message<Eris.TextableChannel>> | Promise<Eris.Message<Eris.TextChannel>> | Promise<Eris.Message<Eris.NewsChannel>> | Promise<Eris.Message<Eris.PrivateChannel>>}
	 */
	async reply(emoji, content, options = {}) {
		
		return await this.message.channel.createMessage({ content: `${Emoji.getEmoji(emoji).mention} **|** <@${this.message.author.id}>, ${content}`, options })
	}

	/**
	 *
	 * @param emoji
	 * @param content
	 * @param data
	 * @param options
	 * @returns {Promise<Eris.Message<Eris.TextableChannel>>}
	 */
	async replyT(emoji, content, data = {}, options = {}) {
		
		return await this.message.channel.createMessage({ content: `${Emoji.getEmoji(emoji).mention} **|** <@${this.message.author.id}>, ${this._locale(content, data)}`, options })
	}
}
