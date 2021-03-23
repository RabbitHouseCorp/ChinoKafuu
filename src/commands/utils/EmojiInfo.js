const { Command, EmbedBuilder } = require('../../utils')
module.exports = class EmojiInfoCommand extends Command {
  constructor () {
    super({
      name: 'emojiinfo',
      aliases: [],
      hasUsage: true,
      arguments: 1,
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }]
    })
  }

  async run (ctx) {
    const emoji = await ctx.getEmoji(ctx.args[0])
    if (!emoji) return ctx.replyT('error', 'basic:invalidEmoji')
    const embed = new EmbedBuilder()
    embed.setColor('DEFAULT')
    embed.setTitle(ctx._locale('commands:emojiinfo.embed.title'))
    embed.setThumbnail(emoji.url)
    embed.addField(ctx._locale('commands:emojiinfo.embed.name'), `\`${emoji.name}\``)
    embed.addField(ctx._locale('commands:emojiinfo.embed.id'), `\`${emoji.id}\``)
    embed.addField(ctx._locale('commands:emojiinfo.embed.mention'), `\`${emoji.mention}\``)
    embed.addField(ctx._locale('commands:emojiinfo.embed.url'), `[Download](${emoji.url})`)

    ctx.send(embed.build())
  }
}
