/* eslint-disable no-unused-vars */
import axios from 'axios'
import { CommandDataOption, Interaction, Message } from 'eris'
import { Model } from 'mongoose'
import IGuildCollection from '../interfaces/IGuildCollection'
import IUserCollection from '../interfaces/IUserCollection'
import { Emoji } from '../util/EmotesInstance'
import { CommandContext } from './CommandContext'

/**
 * @typedef {object} DBOptions
 * @property {IUserCollection} user
 * @property {IGuildCollection} guild
 * @property {import('mongoose').Model} db
 */

/**
 * @typedef {object} SlashCommandOptions
 * @property {Interaction} getInteraction
 * @property {Message} message
 * @property {string[]} args
 * @property {DBOptions} db
 * @property {[{title: ''}]} embeds
 */
/**
 * @class
 * @extends {CommandContext}
 */
export class SlashCommandContext extends CommandContext {
  /**
  * @constructor
  * @param {SlashCommandOptions} options
  * @property {Interaction} interaction
  * @property {Map<string, CommandDataOption>} args
  */
  constructor(bot, interaction, args, db, _locale, statsDB) {
    super(bot, interaction.message, args, db, _locale)
    /**
     * @type {Interaction}
     */
    this.getInteraction = interaction
    /**
     * @type {Message}
     */
    this.message = interaction
    /**
     * @type {Map<string, CommandDataOption>}
     */
    this.args = args
    /**
     * @type {DBOptions}
     */
    this.db = db
    this.embeds = []
    this._locale = _locale
    this.used = false
    this.content = {}
    this.deferMessage = null
    /**
     * @type {{jitter: number; latency: number;}}
     */
    this.statsDB = {
      jitter: statsDB?.jitter ?? 0,
      latency: statsDB?.latency ?? 0
    }
  }

  createInteractionFunction(name, message, options) {
    this.interactionBase = this.client.interactionManager.createInteractionBase(message.id, -1, {
      expireUntil: 420 * 1000,
      name,
      ...options
    })
  }

  createInteractionModal(name, interactionId, options) {
    this.interactionBase = this.client.interactionManager.createInteractionModal(interactionId, 5, {
      expireUntil: 420 * 1000,
      name,
      isModal: true,
      ...options
    })
  }

  /**
   * Sends a message to this channel
   * @param {string} content The content to be sent
   * @param {string} props {object}
   * @returns {Promise<Eris.Message> | Promise<Eris.Message<Eris.TextableChannel>> | Promise<Eris.Message<Eris.TextChannel>> | Promise<Eris.Message<Eris.NewsChannel>> | Promise<Eris.Message<Eris.PrivateChannel>>}
   */
  async send(content, ...props) {

    if (content?.embeds !== undefined) {
      for (const embed of content.embeds) {
        this.embeds.push(embed)
      }
    }

    this.content = {
      content: (typeof content === 'string') ? content : content.content,
      embeds: this.embeds,
      flags: content.flags ?? 0,
      components: content.components ?? this.commandInteractions.component,
      options: props[0]?.options
    }

    if (this.content.options == undefined) {
      delete this.content.options
    }
    if (this.used) {
      const messageFunction = this.deferMessage.deferEdit(this.content, props[0]?.file, 6)
      this.deferMessage = messageFunction
      return messageFunction
    } else {
      this.used = true
      const messageFunction = this.message.hook.createMessage(this.content, props[0]?.file)
      this.deferMessage = messageFunction
      return messageFunction
    }
    // const messageFunction = this.message.hook.createMessage(this.content, props[0]?.file)
    // this.deferMessage = messageFunction
    // return messageFunction
  }

  /**
   *
   * @param {object} data
   * @param {Buffer} file
   * @returns {any}
   */
  async sendHook(data, file = null) {
    return this.client.interactionManager.hookInteraction({ id: this.getInteraction.id, token: this.getInteraction.token }, {
      type: 4,
      data: data,
    }, file)
  }

  /**
   *
   * @param {string} content
   * @param {{content: string, embeds: [], attachments: []}} data
   * @param {object} props
   * @returns {Promise<Eris.MessageInteraction>}
   */
  async sendT(content, data = {}, ...props) {
    return this.message.hook.createMessage({
      content: this._locale(content, data),
      components: this.commandInteractions.component,
      options: props[0]?.options
    }, props[0]?.file)
  }

  /**
   * Sends a message with the author mention and an emoji
   * @param {string} emoji The emoji of the message
   * @param {string | {content: string, components: [], options: any}} content The content to be sent
   * @param props
   * @returns {Promise<Eris.Message> | Promise<Eris.Message<Eris.TextableChannel>> | Promise<Eris.Message<Eris.TextChannel>> | Promise<Eris.Message<Eris.NewsChannel>> | Promise<Eris.Message<Eris.PrivateChannel>>}
   */
  async reply(emoji, content, ...props) {
    return this.message.hook.createMessage({
      content: `${Emoji.getEmoji(emoji).mention} **》**<@${this.message.member.user.id}> ${content}`,
      components: this.commandInteractions.component,
      options: props[0]?.options,
    }, props[0]?.file)
  }

  /**
   *
   * @param {string} emoji
   * @param {string | {content: string, components: [], options: any}} content
   * @param {object} data
   * @param {any} props
   * @returns {Promise<Eris.MessageInteraction>}
   */
  async replyT(emoji, content, data = {}, ...props) {
    return this.message.hook.createMessage({
      content: `${Emoji.getEmoji(emoji).mention} **》** <@${this.message.member.user.id}> ${this._locale(content, data)}`,
      components: props[0]?.components ?? this.commandInteractions.component,
      ...data,
      options: props[0]?.options
    }, props[0]?.file)
  }

  /**
   *
   * @param {string} args
   * @param {boolean} hasAuthor
   */
  async getUser(args, hasAuthor = false) {
    try {
      if (!args) {
        if (hasAuthor) {
          return await this.client.getRESTUser(this.message.author.id)
        }

        return undefined
      }

      const member = await this.client.getRESTUser(args.replace(/[<@!>]/g, ''))

      return member
    } catch {
      const member = this.message.guild.members.find((member) => member.username.toLowerCase().includes(args.toLowerCase())) || this.message.guild.members.find((member) => `${member.username}#${member.discriminator}`.toLowerCase() === args.toLowerCase())
      if (!member) {
        if (hasAuthor) {
          return await this.client.getRESTUser(this.message.author.id)
        }

        return undefined
      }

      return await this.client.getRESTUser(member.user.id)
    }
  }

  /**
   *
   * @param {string} args
   */

  async getEmoji(args) {
    if (!args) return undefined
    if (args.includes('%')) args = decodeURIComponent(args)
    if (!args.includes(':')) {
      const emoji = this.message.guild.emojis.find(emoji => emoji.id === args)
      if (emoji) {
        return {
          animated: emoji.animated,
          name: emoji.name,
          mention: `${emoji.animated ? '<a:' : '<:'}${emoji.name}:${emoji.id}>`,
          id: emoji.id,
          url: `https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? 'gif' : 'png'}?v=1`
        }
      }

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
          return undefined
        }
      } catch {
        return undefined
      }
    }

    // eslint-disable-next-line security/detect-unsafe-regex
    const m = args.match(/<?(?:(a):)?(\w{2,32}):(\d{17,19})?>?/)
    if (!m) return undefined
    if (m[2] && !m[3]) return undefined

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
    if (!role) return undefined
    const getRole = this.message.guild.roles.find(role => role.name.toLowerCase().includes(role.toLowerCase)) || this.message.guild.roles.get(role.replace(/[<@&>]/g, ''))
    if (!getRole) return undefined
    return getRole
  }

  getChannel(channel) {
    if (!channel) return undefined
    const getChannel = this.client.getChannel(channel.replace(/[<#>]/g, ''))
    if (!getChannel) return undefined

    return getChannel
  }

  async getMember(user) {
    if (!user) return undefined
    try {
      const member = this.message.guild.members.get(user.replace(/<@!>/g, ''))
      if (member) {
        return member
      } else {
        return await this.client.getRESTGuildMember(this.message.guild.id, user.replace(/<@!>/g, ''))
      }
    } catch {
      return undefined
    }
  }
}
