const { Command, EmbedBuilder } = require('../../../utils')
const moment = require('moment')
const { CommandBase, CommandOptions } = require('eris')

module.exports = class UserInfoCommand extends Command {
  constructor() {
    super({
      name: 'userinfo',
      aliases: [],
      hasUsage: true,
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }],
      slash: new CommandBase()
        .setName('userinfo')
        .setDescription('Shows some information about a user.')
        .addOptions(
          new CommandOptions()
            .setType(6)
            .setName('user')
            .setDescription('Mention a user.')
        )
    })
  }

  async run(ctx) {
    moment.locale(ctx.db.guild.lang)
    const user = ctx.args.get('user')?.value
    const member = await ctx.getUser(user?.id ?? user, true)
    let hoist
    const guildMember = await ctx.getMember(member.id)
    const avatar = guildMember?.guildAvatar ?? member.avatarURL
    const guild = ctx.message.guild
    if (guildMember) {
      const role = guildMember.roles
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
    embed.addField(ctx._locale('commands:userinfo.createdAt'), moment(member.createdAt).format('LLLL'), true)
    guildMember ? embed.addField(ctx._locale('commands:userinfo.joinedAt'), moment(guildMember.joinedAt).format('LLLL'), true) : null
    guildMember ? embed.addField(ctx._locale('commands:userinfo.highRole'), highRole?.mention, true) : null
    guildMember?.premiumSince ? embed.addField(ctx._locale('commands:userinfo.boostSince'), moment(guildMember.premiumSince).format('LLLL'), true) : null
    guildMember ? embed.addField(ctx._locale('commands:userinfo.hasPermissions'), guildMember?.permissions?.array?.map(perm => `\`${ctx._locale(`permission:${perm}`)}\``)?.join(', ')) : null

    ctx.send(embed.build())
  }
}
