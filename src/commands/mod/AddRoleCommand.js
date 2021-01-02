const { Command } = require('../../utils')

module.exports = class AddRoleCommand extends Command {
  constructor() {
    super({
      name: 'addrole',
      arguments: 2,
      aliases: ['adicionarcargo'],
      hasUsage: true,
      permissions: [{
        entity: 'both',
        permissions: ['manageRoles']
      }]
    })
  }
  async run(ctx) {
    const member = ctx.message.mentions[0] || ctx.client.users.get(ctx.args[0])
    const role = ctx.message.roleMentions[0] || ctx.message.channel.guild.roles.find(role => role.name === ctx.args.slice(1).join(' '))

    if (!member) return ctx.replyT('error', 'basic:invalidUser')
    if (!role) return ctx.replyT('error', 'basic:invalidRole')

    const guildMember = ctx.message.channel.guild.members.get(member.id)
    guildMember.addRole(role)
      .then(() => {
        ctx.replyT('success', 'commands:addrole.success')
      })
      .catch(() => ctx.replyT('error', 'commands:addrole.higher'))
  }
}
