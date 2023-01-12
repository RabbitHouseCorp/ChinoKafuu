import { Command } from '../../../structures/util'

export default class AfkCommand extends Command {
  constructor() {
    super({
      name: 'afk',
      aliases: ['awayfromthekeyboard']
    })
  }

  async run(ctx) {
    const member = ctx.db.user
    let reason = ctx.args.join(' ') ?? 'Unspecified'
    // eslint-disable-next-line security/detect-unsafe-regex
    const guildInviteRegex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|(discordapp|discord)\.com\/invite)\/.+[a-z]/g

    const hasInvite = reason.match(guildInviteRegex)

    if (hasInvite !== null && hasInvite.length >= 1) reason = '¯\\_(ツ)_/¯'

    member.afk = true
    member.afkReason = reason
    member.save()
    return ctx.replyT('success', 'commands:afk.success')
  }
}
