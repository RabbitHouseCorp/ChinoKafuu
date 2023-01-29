import EventEmitter from 'events'
import { EmbedBuilder, NightlyInteraction } from './util'

export class EmbedPage extends EventEmitter {
  constructor(
    time = 50 * 1000,
    options = { users: [], waitMessage: false },
    ctx,
    message
  ) {
    super()
    this.ctx = ctx
    this.page = -1
    this.componentsEmbed = []
    this.options = options ?? { users: [], waitMessage: false }

    if (!options.waitMessage) {
      this.nightly = new NightlyInteraction(message)
      this.setListenerEmbed()
    }

    this.closed = false
    this.components = []
    this.timeout = null
    this.time = time ?? 50 * 10000

    this.#setTimeout()
    this.#setButton()
  }

  get maxPage() {
    return this.componentsEmbed.length - 1
  }

  setListenerEmbed() {
    this.on('nextPage', () => {
      this.page++
      const component = this.componentsEmbed[Math.min(this.maxPage, this.page)]
      this.emit('page', (component == undefined ? [this.#defaultEmbed()] : [component]))
    })

    this.on('backPage', () => {
      this.page = Math.max(0, this.page - 1)
      const component = this.componentsEmbed[Math.min(this.maxPage, this.page)]

      this.emit('page', (component == undefined ? [this.#defaultEmbed()] : [component]))
    })

    this.on('page', async (component) => {
      await this.nightly.sendAck('update', {
        // content: '',
        embeds: component,
        components: this.#getComponents,
        attachments: [],
        flags: 0
      })
    })

    this.nightly.on('collect', async ({ interaction }) => {
      if (!this.options.users.includes(this.ctx.message.member.id)) this.nightly.sendAck('respond', { content: this.ctx._locale('commands:inventory.notAllowed'), flags: 1 << 6 })
      if (interaction.data.component_type == 2) {
        if (interaction.data.custom_id === 'nextPage') {
          this.emit('nextPage')
        } else if (interaction.data.custom_id == 'backPage') {
          this.emit('backPage')
        }
      }
    })

  }

  #setButton() {
    const data = [{
      type: 2,
      style: 3,
      label: this.ctx._locale('basic:page.backPage'),
      custom_id: `backPage`,
      disabled: this.page - 1 <= -1
    },
    {
      type: 2,
      style: 3,
      label: this.ctx._locale('basic:page.nextPage'),
      custom_id: `nextPage`,
      disabled: this.page >= this.maxPage
    }]
    return this.componentsEmbed.length >= 2 ? data : []
  }

  get #getComponents() {
    const components = this.components
    return this.componentsEmbed.length >= 2 ? [
      {
        type: 1,
        components: this.#setButton()
      },
      ...components
    ] : []
  }

  prepareToSend() {
    this.page = 0
    const component = this.componentsEmbed[Math.max(0, this.page)]

    return {
      components: this.#getComponents,
      embeds: [component == undefined ? this.#defaultEmbed() : component]
    }
  }

  setDefaultMessage(message) {
    this.nightly = new NightlyInteraction(message)
    this.setListenerEmbed()
  }

  addComponents(...args) {
    this.componentsEmbed.push(...args)
  }

  #defaultEmbed() {
    return new EmbedBuilder()
      .setTitle('EmbedPage - Component')
      .setColor('DEFAULT')
      .setDescription('Error 404 —— Embed not found')
  }

  #setTimeout() {
    this.timeout = setTimeout(() => {
      this.#destroy()
    }, this.time)
  }

  #clearTimeout() {
    clearTimeout(this.timeout)
  }

  #destroy() {
    this.closed = true
    this.emit('destroy', this.closed)
    this.removeAllListeners()
    this.#clearTimeout()
    this.components.slice(0, this.components.length)
    this.componentsEmbed.slice(0, this.componentsEmbed.length)
  }
}