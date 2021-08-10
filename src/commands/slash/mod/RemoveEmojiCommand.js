const { Command } = require('../../../utils')
const {CommandBase, CommandOptions} = require("eris");

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
          .setName('remove')
          .setDescription('Removes an emoji in the current guild.')
          .addOptions(
              new CommandOptions()
                  .setType(1)
                  .setName('emoji')
                  .setDescription('Removes an emoji in the current guild.')
                  .addOptions(
                      new CommandOptions()
                          .setType(3)
                          .setName('input')
                          .setDescription('Enter the emoji you are adding to the server.')
                          .isRequired()
                  ),
              new CommandOptions()
                  .setType(1)
                  .setName('role')
                  .setDescription('Removes a role from a guild member.')
                  .addOptions(
                      new CommandOptions()
                          .setType(6)
                          .setName('user')
                          .setDescription('Mention member on server.')
                          .isRequired(),
                      new CommandOptions()
                          .setType(7)
                          .setName('role')
                          .setDescription('Mention role on server.')
                          .isRequired()
                  ),
          )
    })
  }

  run(ctx) {
    const guild = ctx.message.guild
    const getEmoji = ctx.args[0].replace(/(<:)/, '').replace(/(<a:)/, '').replace(/(>)/, '').trim().split(':')
    const emoji = guild.emojis.find(emoji => emoji.id === getEmoji[1])
    if (!emoji) return ctx.replyT('error', 'basic:invalidEmoji')

    guild.deleteEmoji(emoji.id).then(() => {
      ctx.replyT('trash', 'commands:removeemoji.successfullyRemoved')
    })
  }
}
