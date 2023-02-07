import { defineTypeInteraction, defineTypeInteractionMessage } from './InteractionManager'
import { Emoji } from './util'

export class InteractionContext {
  constructor(data, client, messageCreated, interactionManager, options, interactionBase) {
    this.client = client
    this.messageCreated = messageCreated
    this.interactionManager = interactionManager
    this.options = options
    this.id = options.interactionData.id
    this.interactionData = options.interactionData
    this.typeResolved = options.typeResolved
    this.token = options.interactionData.token
    this.interactionBase = interactionBase
    this.trackingCommand = interactionBase?.trackingCommand
    this.isModal = options.isModal ?? false
    this.data = data ?? {}
  }

  async sendEmbedPage(embedPageManager, data) {
    this.interactionBase.isEmbed = true
    this.interactionBase.embedPage = embedPageManager
    if (this.interactionBase.isModal) {
      try {
        this.interactionBase.isModal = false
        return this.createMessageInteraction({
          type: 4,
          data: {
            ...embedPageManager.prepareToSend(true)
          }
        })
      } catch (err) {
        console.log(err)
        return null
      }
    }

    return this.editInteraction(embedPageManager.prepareToSend())
  }

  getData() {
    return this.data
  }

  deleteInteraction() {
    if (typeof this.interactionBase?.state?.actionStatedestroy === 'function') {
      this.interactionBase?.state?.actionStatedestroy()
    }
    this.interactionManager.removeInteraction(this.id)
  }

  userGetsInteractionAccess(userID = '') {
    // If the list is empty, it will not be limited. That is, it will return true.
    if (this.interactionBase.users.length <= 0) return true
    return this.interactionBase.users.includes(userID)
  }

  _locale(...args) {
    return this.options._locale(...args)
  }

  async editT(emoji, content, data = {}, ...props) {
    return this.editMessageInteraction({
      content: this.contentWithEmoji(emoji, content),
      ...data
    })
  }

  async edit(emoji, content, data = {}, ...props) {
    return this.editMessageInteraction({
      content: this.contentWithEmoji(emoji, content, false),
      ...data
    })
  }

  async editInteraction(data = {}) {
    return this.editMessageInteraction(data)
  }

  async editMessageInteraction(data = {}) {
    let file = null
    if (data.enableEphemeral) {
      delete data.enableEphemeral
      data.flags = 1 << 6
    }
    if (data.file) {
      file = data.file
      delete data.file
    }
    return this.client.requestHandler.request('POST', `/interactions/${this.id}/${this.token}/callback`, true, {
      type: defineTypeInteractionMessage('updateMessage'),
      data: data,
    }, file?.image ?? null)
  }

  async createMessageInteraction(option = {
    type: defineTypeInteractionMessage('channelMessageWithSource'),
    data: {},
    attachments: null
  }) {
    let file = null
    if (typeof type === 'string') {
      this.type = defineTypeInteraction(this.type, true)
    }
    if (option?.file) {
      file = option.file
      delete option.file
    }
    if (option?.data?.enableEphemeral !== undefined && option?.data?.enableEphemeral) {
      delete option.data.enableEphemeral
      option.data.flags = (1 << 1) + (1 << 6)
    }
    if (option?.enableEphemeral !== undefined && option?.enableEphemeral) {
      delete option.enableEphemeral
      option.data.flags = (1 << 1) + (1 << 6)
    }
    let attachments = null

    if (option.attachments !== undefined) {
      attachments = option.attachments
      delete option.attachments
    }
    return this.client.requestHandler.request('POST', `/interactions/${this.id}/${this.token}/callback`, true, {
      type: option?.type ?? defineTypeInteractionMessage(option.type),
      data: option.data,
    }, file?.image ?? null)
  }

  async modalSumbit(option = {}) {
    // let file = null
    // if (option.file) {
    //   file = option.file
    //   delete option.file
    // }
    // if (option.enableEphemeral !== undefined && option.enableEphemeral) {
    //   delete option.data.enableEphemeral
    //   option.flags = (1 << 1) + (1 << 6)
    // }
    // if (option.enableEphemeral !== undefined && option.enableEphemeral) {
    //   delete option.enableEphemeral
    //   option.flags = (1 << 1) + (1 << 6)
    // }
    // let attachments = null

    // if (option.attachments !== undefined) {
    //   attachments = option.attachments
    //   delete option.attachments
    // }
    // return this.client.requestHandler.request('POST', `/interactions/${this.id}/${this.token}/callback`, true, {
    //   type: 7,
    // }, file?.image ?? null)
  }

  async replyT(emoji, content, data = {
    enableEphemeral: false
  }, ...props) {
    return this.createMessageInteraction({
      type: data?.type ?? defineTypeInteractionMessage('channelMessageWithSource'),
      data: {
        content: this.contentWithEmoji(emoji, content, true),
        enableEphemeral: data.enableEphemeral,
        ...data.data
      },
      ...props
    })
  }

  async send(content, data = {}, ...props) {
    return this.createMessageInteraction({
      type: data?.type ?? defineTypeInteractionMessage('channelMessageWithSource'),
      data: {
        content: content,
        ...data.data
      },
      ...props
    })
  }

  async sendT(content, dataLocale = {}, data = {}, ...props) {
    return this.createMessageInteraction({
      type: data?.type ?? defineTypeInteractionMessage('channelMessageWithSource'),
      data: {
        content: this._locale(content, dataLocale),
        ...data.data
      },
      ...props
    })
  }

  async reply(emoji, content, data = {}, ...props) {
    return this.createMessageInteraction({
      type: data?.type ?? defineTypeInteractionMessage('channelMessageWithSource'),
      data: {
        content: this.contentWithEmoji(emoji, content),
        ...data.data
      },
      ...props
    })
  }

  getUserInteraction(userID = null) {
    if (userID !== undefined && userID !== null) return this.client.users.get(userID)
    const user = (this.interactionData?.member?.user?.id ?? this.interactionData?.user?.id) ?? null

    return this.client.users.get(user)
  }

  get getMemberInteraction() {
    return this.getUserInteraction()
  }

  contentWithEmoji(emoji, content = '', ...args) {
    const data = {}
    args
      .filter((arg) => typeof arg === 'object')
      .map((i) => Object.assign(data, i))
    const IsTranslate = args.find((i) => i == true || i == false)
    const t = typeof IsTranslate === 'boolean' && IsTranslate ? this._locale(content, data) : content
    let str = ''

    if (typeof emoji === 'string') {
      str = `${Emoji.getEmoji(emoji).mention} **|** `
    } else if (typeof emoji == 'object') {
      str = Emoji.getEmoji(emoji.name)[emoji.type]
    }
    return `${str}${t}`
  }

}