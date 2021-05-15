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
     * @param props {object}
     * @returns {Promise<Eris.Message> | Promise<Eris.Message<Eris.TextableChannel>> | Promise<Eris.Message<Eris.TextChannel>> | Promise<Eris.Message<Eris.NewsChannel>> | Promise<Eris.Message<Eris.PrivateChannel>>}
     */
  async send(content, ...props) {
    return await this.message.channel.createMessage({
      content: (typeof content === 'string') ? content : content.content,
      embed: content?.embed,
      messageReferenceID: this.message.id,
      options: props[0]?.options
    }, props[0]?.file)
  }

  /**
     *
     * @param content
     * @param data
     * @param props
     * @returns {Promise<Eris.Message<Eris.TextableChannel>>}
     */
  async sendT(content, data = {}, ...props) {
    return await this.message.channel.createMessage({
      content: this._locale(content, data),
      messageReferenceID: this.message.id,
      options: props[0]?.options
    }, props[0]?.file)
  }

  /**
     * Sends a message with the author mention and an emoji
     * @param emoji The emoji of the message
     * @param content The content to be sent
     * @param props
     * @returns {Promise<Eris.Message> | Promise<Eris.Message<Eris.TextableChannel>> | Promise<Eris.Message<Eris.TextChannel>> | Promise<Eris.Message<Eris.NewsChannel>> | Promise<Eris.Message<Eris.PrivateChannel>>}
     */
  async reply(emoji, content, ...props) {
    return await this.message.channel.createMessage({
      content: `${Emoji.getEmoji(emoji).mention} **|** <@${this.message.author.id}>, ${content}`,
      messageReferenceID: this.message.id,
      options: props[0]?.options
    }, props[0]?.file)
  }

  /**
     *
     * @param emoji
     * @param content
     * @param data
     * @param props
     * @returns {Promise<Eris.Message<Eris.TextableChannel>>}
     */
  async replyT(emoji, content, data = {}, ...props) {
    return await this.message.channel.createMessage({
      content: `${Emoji.getEmoji(emoji).mention} **|** <@${this.message.author.id}>, ${this._locale(content, data)}`,
      messageReferenceID: this.message.id,
      options: props[0]?.options
    }, props[0]?.file)
  }

  /**
     *
     * @param {string} args
     * @param {boolean} hasAuthor
     */
  async getUser(args, hasAuthor = false) {
    if (!args) {
      if (hasAuthor) {
        return this.message.author
      }

      return false
    }
    try {
      const member = await this.client.getRESTUser(args.replace(/[<@!>]/g, ''))

      return member
    } catch {
      const member = this.message.channel.guild.members.find((member) => member.username.toLowerCase().includes(args.toLowerCase())) || this.message.channel.guild.members.find((member) => `${member.username}#${member.discriminator}`.toLowerCase() === args.toLowerCase())
      if (!member) {
        if (hasAuthor) {
          return this.message.author
        }

        return false
      }

      return member.user
    }
  }

  /**
     *
     * @param {string} args
     */

  async getEmoji(args) {
    if (!args) return false
    if (args.includes('%')) args = decodeURIComponent(args)
    if (!args.includes(':')) {
      const emoji = this.message.channel.guild.emojis.find(emoji => emoji.name.toLowerCase().includes(args.toLowerCase())) || this.message.channel.guild.emojis.find(emoji => emoji.id === args)
      if (emoji) {
        return {
          animated: emoji.animated,
          name: emoji.name,
          mention: `${emoji.animated ? '<a:' : '<:'}${emoji.name}:${emoji.id}>`,
          id: emoji.id,
          url: `https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? 'gif' : 'png'}?v=1`
        }
      }

      const axios = require('axios')
      try {
        if (await axios.get(`https://twemoji.maxcdn.com/2/72x72/${this.toUnicode(args).join('-')}.png`)) {
          return {
            animated: false,
            name: args,
            mention: args,
            id: this.toUnicode(args).join('-').toString(0),
            url: `https://twemoji.maxcdn.com/2/72x72/${this.toUnicode(args).join('-')}.png`
          }
        } else {
          return false
        }
      } catch {
        return false
      }
    }

    const m = args.match(/<?(?:(a):)?(\w{2,32}):(\d{17,19})?>?/)
    if (!m) return false
    if (m[2] && !m[3]) return false

    return {
      animated: Boolean(m[1]),
      name: m[2],
      mention: `${m[1] ? '<a:' : '<:'}${m[2]}:${m[3]}>`,
      id: m[3],
      url: `https://cdn.discordapp.com/emojis/${m[3]}.${m[1] ? 'gif' : 'png'}?v=1`
    }
  }

  /**
     *
     * @param {string} text
     */

  toUnicode(text) {
    const emojis = []
    for (const codePoint of text) {
      emojis.push(codePoint.codePointAt(0).toString(16))
    }
    return emojis
  }

  getRole(role) {
    if (!role) return false
    const getRole = this.message.channel.guild.roles.find(role => role.name.toLowerCase().includes(role.toLowerCase)) || this.message.channel.guild.roles.get(role.replace(/[<@&>]/g, ''))
    if (!getRole) return false
    return getRole
  }

  getChannel(channel) {
    if (!channel) return false
    const getChannel = this.client.getChannel(channel.replace(/[<#>]/g, ''))
    if (!getChannel) return false

    return getChannel
  }
}
