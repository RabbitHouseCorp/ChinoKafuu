const Command = require('../../structures/command/Command')
const fetch = require('node-fetch')
const Helper = require('../../structures/util/Helper')

module.exports = class AddEmojiCommand extends Command {
  constructor() {
    super({
      name: 'addemoji',
      aliases: ['adicionaremoji'],
      permissions: [{
        entity: 'both',
        permissions: ['manageEmojis']
      }]
    })
  }

  async run(ctx) {
    if (!ctx.args[0]) return new Helper(ctx, this.name, this.aliases, ctx.t(`commands:${this.name}.usage`, `commands:${this.name}.description`)).help() //FIXME fix undefined in description pls :sob:
    const url = ctx.args[0] ?? ctx.message.attachments[0]
    let name = ctx.args[1]
    if (!url) name = ctx.args[0]
    if (!name || !url) return ctx.replyT('error', 'basic:missingArgs', {
      prefix: ctx.db.guild.prefix,
      commandName: this.name
    }) //TODO Update to Helper
    try {
      const request = await fetch(url)
      const buffer = await request.buffer()
      const data = `data:image/${url.substr(url.length - 3)};base64,`
      const base64Emoji = buffer.toString('base64')
      return ctx.message.channel.guild.createEmoji({
        name: name,
        image: data + base64Emoji

      }).then(emoji => ctx.send(emoji.name)).catch(() => ctx.replyT('error', 'commands:addemoji.error'))
    } catch {
      return ctx.replyT('error', 'commands:addemoji.error')
    }
  }
}
