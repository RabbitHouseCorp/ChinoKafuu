const { Command, EmbedBuilder } = require('../../../structures/util')

module.exports = class UserInfoCommand extends Command {
  constructor() {
    super({
      name: 'userinfo',
      aliases: [],
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }]
    })
  }

  async run(ctx) {
    const member = await ctx.getUser(ctx.args[0], true)
    let hoist
    const avatar = ctx.message.guild.members.get(member.id)?.guildAvatar ?? member.avatarURL

    const guild = ctx.message.guild
    if (guild.members.get(member.id)) {
      const role = guild.members.get(member.id).roles
        .map((a) => ctx.message.guild.roles.get(a))
        .filter((z) => z && z.color >= 0)
        .sort((a, b) => b.position - a.position)
      hoist = role[0]
    }

    const highRole = guild.roles.get(hoist?.id)
    const embed = new EmbedBuilder()
    embed.setColor(`#${highRole?.color.toString(16)}` ?? null)
    embed.setThumbnail(avatar)
    embed.addField(ctx._locale('commands:userinfo.username'), `${member.username}#${member.discriminator}`, true)
    embed.addField(ctx._locale('commands:userinfo.userid'), member.id, true)
    embed.addField(ctx._locale('commands:userinfo.createdAt'), `<t:${parseInt(member.createdAt / 1000).toFixed(0)}:F>`, true)
    guild.members.get(member.id) ? embed.addField(ctx._locale('commands:userinfo.joinedAt'), `<t:${parseInt(guild.members.get(member.id).joinedAt / 1000).toFixed(0)}:F>`, true) : null
    guild.members.get(member.id) ? embed.addField(ctx._locale('commands:userinfo.highRole'), highRole?.mention, true) : null
    guild.members.get(member.id)?.premiumSince ? embed.addField(ctx._locale('commands:userinfo.boostSince'), `<t:${parseInt(guild.members.get(member.id).premiumSince / 1000).toFixed(0)}:F>`, true) : null
    guild.members.get(member.id) ? embed.addField(ctx._locale('commands:userinfo.hasPermissions'), this.checkPermission(ctx._locale, guild, member).join(', ')) : null

    ctx.send(embed.build())
  }

  checkPermission(_locale, guild, member) {
    const allowedPerms = []
    const perms = guild.members.get(member.id).permissions.array

    perms.forEach(perms => {
      allowedPerms.push(`\`${_locale(`permission:${perms}`)}\``)
    })

    return allowedPerms
  }
}
