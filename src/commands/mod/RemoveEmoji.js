//FUTURE[epic=KafuuTeam] Deprecate
//NOTE Possible command clutter


const { Command } = require('../../utils')

module.exports = class RemoveEmojiCommand extends Command {
  constructor () {
    super({
      name: 'removeemoji',
      aliases: ['removeremoji'],
      hasUsage: true,
      permissions: [{
        entity: 'both',
        permissions: ['manageEmojis']
      }],
      arguments: 1
    })
  }

  run (ctx) {
    const guild = ctx.message.channel.guild
    const getEmoji = ctx.args[0].replace(/(<:)/, '').replace(/(<a:)/, '').replace(/(>)/, '').trim().split(':')
    const emoji = guild.emojis.find(emoji => emoji.id === getEmoji[1])
    if (!emoji) return ctx.replyT('error', 'basic:invalidEmoji')

    guild.deleteEmoji(emoji.id).then(() => {
      ctx.replyT('trash', 'commands:removeemoji.successfullyRemoved')
    })
  }
}
