const { Command } = require('../../../utils')
const { CommandBase, CommandOptions } = require('eris')

module.exports = class RemoveEmojiCommand extends Command {
  constructor() {
    super({
      name: 'removeemoji',
      aliases: ['removeremoji'],
      hasUsage: true,
      permissions: [{
        entity: 'both',
        permissions: ['manageEmojis']
      }],
      arguments: 1,
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
    const getEmoji = await ctx.getEmoji(ctx.message.command.interface.get('emoji').value)
    const emoji = guild.emojis.find(emoji => emoji.id === getEmoji.id)
    if (!emoji) return ctx.replyT('error', 'basic:invalidEmoji')

    guild.deleteEmoji(emoji.id).then(() => {
      ctx.replyT('trash', 'commands:removeemoji.successfullyRemoved')
    })
  }
}
