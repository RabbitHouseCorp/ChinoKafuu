const { Command } = require('../../utils')
const axios = require('axios')

module.exports = class AddEmojiCommand extends Command {
  constructor () {
    super({
      name: 'addemoji',
      aliases: ['adicionaremoji'],
      arguments: 1,
      hasUsage: true,
      permissions: [{
        entity: 'both',
        permissions: ['manageEmojis']
      }]
    })
  }

  async run (ctx) {
    const emoji = await ctx.getEmoji(ctx.args[1]);
    const url = !emoji ? ctx.args[1] ?? ctx.message.attachments[0]?.url : emoji.url;
    const name = ctx.args[0]
    if (!name || !url) {
      return ctx.replyT('error', 'basic:missingArgs', {
        prefix: ctx.db.guild.prefix,
        commandName: this.name
      })
    }
    try {
      const buffer = await axios.get(url, { responseType: 'arraybuffer' }).then(d => Buffer.from(d.data, 'binary').toString('base64'))
      const base64Emoji = `data:image/${url.substr(url.length - 3)};base64,${buffer}`

      const emoji = await ctx.message.channel.guild.createEmoji({
        name: name,
        image: base64Emoji
      })
      const getEmoji = await ctx.getEmoji(emoji.id)
      ctx.send(`${getEmoji.mention} **|** ${ctx.message.author.mention}, ${ctx._locale('commands:addemoji.added')}`)
    } catch {
      return ctx.replyT('error', 'commands:addemoji.error')
    }
  }
}
