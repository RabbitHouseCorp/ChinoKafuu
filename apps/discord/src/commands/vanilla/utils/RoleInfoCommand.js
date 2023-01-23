import { Command, EmbedBuilder } from '../../../structures/util'

export default class RoleInfoCommand extends Command {
  constructor() {
    super({
      name: 'roleinfo',
      aliases: ['cargoinfo'],
      permissions: [
        {
          entity: 'user',
          permissions: ['manageRoles']
        },
        {
          entity: 'bot',
          permissions: ['embedLinks', 'manageRoles']
        }]
    })
  }

  run(ctx) {
    const guild = ctx.message.guild
    const role = guild.roles.get(ctx.args[0]?.replace(/[<@&>]/g, '')) || guild.roles.find(role => role.name.toLowerCase().includes(ctx.args.join(' ').toLowerCase()))
    if (!role) return ctx.replyT('error', 'commands:roleinfo.roleNotExist')

    const embed = new EmbedBuilder()
    embed.setColor(`#${role.color.toString(16)}`)
    embed.setTitle(ctx._locale('commands:roleinfo.roleName', { 0: role.name }))
    embed.addField(ctx._locale('commands:roleinfo.roleMention'), role.mention, true)
    embed.addField(ctx._locale('commands:roleinfo.roleID'), role.id, true)
    embed.addField(ctx._locale('commands:roleinfo.roleColor'), `#${role.color.toString(16).toUpperCase()}`, true)
    embed.addField(ctx._locale('commands:roleinfo.roleGuild'), `\`${role.guild.name}\``, true)
    embed.addField(ctx._locale('commands:roleinfo.roleHoist'), role.hoist.toString(), true)
    embed.addField(ctx._locale('commands:roleinfo.roleMentionable'), role.mentionable.toString(), true)
    embed.addField(ctx._locale('commands:roleinfo.roleManaged'), role.managed.toString(), true)
    embed.addField(ctx._locale('commands:roleinfo.roleCreatedAt'), `<t:${parseInt(role.createdAt / 1000).toFixed(0)}:F>`, true)

    ctx.send(embed.build())
  }
}
