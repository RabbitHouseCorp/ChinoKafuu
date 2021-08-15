const { Command, EmbedBuilder } = require('../../../utils')
const moment = require('moment')
const { CommandBase, CommandOptions } = require('eris')

module.exports = class RoleInfoCommand extends Command {
  constructor() {
    super({
      name: 'roleinfo',
      aliases: ['cargoinfo'],
      arguments: 1,
      hasUsage: true,
      permissions: [
        {
          entity: 'user',
          permissions: ['manageRoles']
        },
        {
          entity: 'bot',
          permissions: ['embedLinks', 'manageRoles']
        }],
      slash: new CommandBase()
        .setName('roleinfo')
        .setDescription('Shows some informations about a role.')
        .addOptions(
          new CommandOptions()
            .setType(8)
            .setName('role')
            .setDescription('Mention the role for more information.')
            .isRequired(),
        )
    })
  }

  run(ctx) {
    moment.locale(ctx.db.guild.lang)
    const role = ctx.message.guild.roles.get(ctx.message.command.interface.get('role').value)
    if (!role) return ctx.replyT('error', 'commands:roleinfo.roleNotExist')

    const embed = new EmbedBuilder()
    embed.setColor(`#${role.color.toString(16)}`)
    embed.setTitle(ctx._locale('commands:roleinfo.roleName', { 0: role.name }))
    embed.addField(ctx._locale('commands:roleinfo.roleMention'), role.mention, true)
    embed.addField(ctx._locale('commands:roleinfo.roleID'), role.id, true)
    embed.addField(ctx._locale('commands:roleinfo.roleColor'), `#${role.color.toString(16).toUpperCase()}`, true)
    embed.addField(ctx._locale('commands:roleinfo.roleGuild'), `\`${role.guild.name}\``, true)
    embed.addField(ctx._locale('commands:roleinfo.roleHoist'), ctx._locale(`basic:boolean.${role.hoist}`), true)
    embed.addField(ctx._locale('commands:roleinfo.roleMentionable'), ctx._locale(`basic:boolean.${role.mentionable}`), true)
    embed.addField(ctx._locale('commands:roleinfo.roleManaged'), ctx._locale(`basic:boolean.${role.managed}`), true)
    embed.addField(ctx._locale('commands:roleinfo.roleCreatedAt'), moment(role.createdAt).format('LLLL'), true)

    ctx.send(embed.build())
  }
}
