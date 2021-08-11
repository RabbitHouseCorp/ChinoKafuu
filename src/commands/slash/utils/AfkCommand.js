const { Command } = require('../../../utils')
const { CommandBase, CommandOptions } = require('eris')

module.exports = class AfkCommand extends Command {
  constructor() {
    super({
      name: 'afk',
      aliases: ['awayfromthekeyboard'],
      hasUsage: true,
      slash: new CommandBase()
        .setName('afk')
        .setDescription('Make you AFK.')
        .addOptions(
          new CommandOptions()
            .setType(3)
            .setName('text')
            .setDescription('Enter a text to leave a message.')
            .isRequired(),
        )
    })
  }

  async run(ctx) {
    const member = ctx.db.user
    const reason = ctx.args.join(' ') ?? 'Unspecified'
    const guildInviteRegex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|(discordapp|discord)\.com\/invite)\/.+[a-z]/g

    const hasInvite = reason.match(guildInviteRegex)

    if (hasInvite !== null && hasInvite.length >= 1) reason = '¯\\_(ツ)_/¯'

    member.afk = true
    member.afkReason = reason
    member.save()
    return ctx.replyT('success', 'commands:afk.success')
  }
}
