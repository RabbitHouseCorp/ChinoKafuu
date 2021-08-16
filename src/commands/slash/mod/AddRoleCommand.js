const { Command } = require('../../../utils')
const { CommandBase, CommandOptions } = require('eris')

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
      }],
      slash: new CommandBase()
        .setName('addrole')
        .setDescription('You can get your daily yens by using this command')
        .addOptions(
          new CommandOptions()
            .setType(6)
            .setName('user')
            .setDescription('Mention the member on the server')
            .isRequired(),
          new CommandOptions()
            .setType(8)
            .setName('role')
            .setDescription('Mention the role on the server')
            .isRequired(),
        )
    })
  }

  async run(ctx) {
    const user = ctx.message.command.interface.get('user').value
    const member = await ctx.getUser(user?.id ?? user)
    if (!member) return ctx.replyT('error', 'basic:invalidUser')
    const role = ctx.getRole(ctx.message.command.interface.get('role').value)
    if (!role) return ctx.replyT('error', 'basic:invalidRole')

    const guildMember = await ctx.client.getRESTGuildMember(ctx.message.guild.id, member.id)
    guildMember.addRole(role.id)
      .then(() => {
        ctx.replyT('success', 'commands:addrole.success')
      })
      .catch(() => ctx.replyT('error', 'commands:addrole.higher'))
  }
}
