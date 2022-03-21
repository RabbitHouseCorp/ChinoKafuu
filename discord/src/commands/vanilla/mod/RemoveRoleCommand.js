const { Command } = require('../../../structures/util')

module.exports = class RemoveRoleCommand extends Command {
  constructor() {
    super({
      name: 'removerole',
      arguments: 2,
      aliases: ['removercargo'],
      hasUsage: true,
      permissions: [{
        entity: 'both',
        permissions: ['manageRoles']
      }]
    })
  }

  async run(ctx) {
    const member = await ctx.getUser(ctx.args[0])
    if (!member) return ctx.replyT('error', 'basic:invalidUser')
    const role = await ctx.getRole(ctx.args[1])
    if (!role) return ctx.replyT('error', 'basic:invalidUser')

    const guildMember = ctx.message.guild.members.get(member.id)
    if (!guildMember.roles.includes(role.id)) return ctx.replyT('error', 'commands:removerole.alreadyRemoved')
    guildMember.removeRole(role.id).then(() => {
      ctx.replyT('success', 'commands:removerole.success')
    }).catch(() => ctx.replyT('error', 'commands:addrole.higher'))
  }
}
