const Command = require('../../structures/command/Command')
const Helper = require('../../structures/util/Helper')

module.exports = class SetNickCommand extends Command {
  constructor() {
    super({
      name: 'setnick',
      aliases: ['changenick', 'updatenick', 'alterarnickname', 'setnickname'],
      permissions: [{
        entity: 'both',
        permissions: ['manageNicknames']
      }]
    })
  }

  async run(ctx) {
    const member = ctx.message.mentions[0] || ctx.client.users.get(ctx.args[0])
    const newNick = ctx.args.slice(1).join(' ')

    if (!member) return ctx.replyT('error', 'basic:invalidUser')
    if (!newNick) return new Helper(ctx, this.name, this.aliases, ctx._locale(`commands:${this.name}.usage`, `commands:${this.name}.description`)).help()

    const guildMember = ctx.message.channel.guild.members.get(member.id)
    try {
      await guildMember.edit({
        nick: newNick
      })
      return ctx.replyT('success', 'commands:setnick.success', { member: member.username, nickname: newNick })
    } catch (e) {
      return ctx.replyT('error', 'commands:setnick.error') //FIXME error being triggered with no reason
    }
  }
}
