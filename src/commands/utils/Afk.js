const { Command } = require('../../utils')

module.exports = class AfkCommand extends Command {
  constructor () {
    super({
      name: 'afk',
      aliases: ['awayfromthekeyboard'],
      hasUsage: true
    })
  }

  async run (ctx) {
    const member = ctx.db.user
    const reason = ctx.args.join(' ') ?? 'Unspecified'
    const guildInviteRegex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|(discordapp|discord)\.com\/invite)\/.+[a-z]/g

    const hasInvite = reason.match(guildInviteRegex)

    if (hasInvite !== null && hasInvite >= 1) reason = '¯\\_(ツ)_/¯'

    member.afk = true
    member.afkReason = reason
    member.save()
    return ctx.replyT('success', 'commands:afk.success')
  }
}
