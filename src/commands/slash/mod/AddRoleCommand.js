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
    const member = await ctx.getUser(ctx.message.command.interface.get('user').value.id)
    if (!member) return ctx.replyT('error', 'basic:invalidUser')
    const role = ctx.getRole(ctx.message.command.interface.get('role').value)
    if (!role) return ctx.replyT('error', 'basic:invalidRole')

    const guildMember = ctx.message.guild.members.get(member.id)
    guildMember.addRole(role.id)
      .then(() => {
        ctx.replyT('success', 'commands:addrole.success')
      })
      .catch(() => ctx.replyT('error', 'commands:addrole.higher'))
  }
}
