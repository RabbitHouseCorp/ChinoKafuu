const { Command, EmbedBuilder } = require('../../../utils')
const { CommandBase, CommandOptions } = require('eris')

module.exports = class EmojiInfoCommand extends Command {
  constructor() {
    super({
      name: 'emojiinfo',
      aliases: [],
      hasUsage: true,
      arguments: 1,
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }],
      slash: new CommandBase()
        .setName('emojiinfo')
        .setDescription('Get some info about an emoji.')
        .addOptions(
          new CommandOptions()
            .setType(3)
            .setName('emoji')
            .setDescription('Mention an emoji added on the server. (Remembering that this doesn\'t work by placing other emoji from another server.)')
            .isRequired()
        )
    })
  }

  async run(ctx) {
    const emoji = await ctx.getEmoji(ctx.message.command.interface.get('emoji').value)
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
