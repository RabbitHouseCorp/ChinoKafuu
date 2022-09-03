const { Command } = require('../../../structures/util')
const { CommandBase, CommandOptions } = require('eris')

module.exports = class RemoveEmojiCommand extends Command {
  constructor() {
    super({
      name: 'removeemoji',
      aliases: ['removeremoji'],
      permissions: [{
        entity: 'both',
        permissions: ['manageEmojisAndStickers']
      }],
      slash: new CommandBase()
        .setName('removeemoji')
        .setDescription('Removes an emoji in the current guild.')
        .addOptions(
          new CommandOptions()
            .setType(3)
            .setName('emoji')
            .setDescription('Removes an emoji in the current guild.')
            .isRequired()
        )
    })
  }

  async run(ctx) {
    const guild = ctx.message.guild
    const getEmoji = await ctx.getEmoji(ctx.args.get('emoji').value)
    const emoji = guild.emojis.find(emoji => emoji.id === getEmoji.id)
    if (!emoji) return ctx.replyT('error', 'basic:invalidEmoji')

    guild.deleteEmoji(emoji.id).then(() => {
      ctx.replyT('trash', 'commands:removeemoji.successfullyRemoved')
    })
  }
}
