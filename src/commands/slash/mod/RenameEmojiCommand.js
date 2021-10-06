const { Command } = require('../../../utils')
const { CommandBase, CommandOptions } = require('eris')

module.exports = class RenameEmojiCommand extends Command {
  constructor() {
    super({
      name: 'renameemoji',
      aliases: ['renomearemoji'],
      hasUsage: true,
      permissions: [{
        entity: 'both',
        permissions: ['manageEmojisAndStickers']
      }],
      arguments: 1,
      slash: new CommandBase()
        .setName('renameemoji')
        .setDescription('Rename the name of an emoji.')
        .addOptions(
          new CommandOptions()
            .setType(3)
            .setName('emoji')
            .setDescription('The emoji that you want rename.')
            .isRequired(),
          new CommandOptions()
            .setType(3)
            .setName('name')
            .setDescription('The new name of the emoji.')
            .isRequired()
        )
    })
  }

  run(ctx) {
    const guild = ctx.message.guild
    const getEmoji = ctx.args.get('emoji').value.replace(/(<:)/, '').replace(/(<a:)/, '').replace(/(>)/, '').trim().split(':')
    const emoji = guild.emojis.find(emoji => emoji.id === getEmoji[1])
    if (!emoji) return ctx.replyT('error', 'basic:invalidEmoji')

    guild.editEmoji(emoji.id, { name: ctx.args.get('name').value }).then(() => {
      ctx.replyT('success', 'commands:renameemoji.successfullyRenamed')
    })
  }
}
