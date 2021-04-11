// TODO[epic=KafuuTeam] Expand
// NOTE introduce this to Polaris

const { Command, EmbedBuilder } = require('../../utils')

module.exports = class ReportCommand extends Command {
  constructor () {
    super({
      name: 'report',
      aliases: ['reportar'],
      arguments: 1,
      hasUsage: true,
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }]
    })
  }

  async run (ctx) {
    const server = ctx.db.guild
    if (!server.reportModule) return ctx.replyT('error', 'commands:report.moduleDisable')
    const member = await ctx.getUser(ctx.args[0])
    if (!member) return ctx.replyT('error', 'basic:invalidUser')
    const reason = ctx.args.slice(1).join(' ').trim().split('-p')
    if (!reason[0]) return ctx.replyT('error', 'commands:report.noReason')
    const channel = ctx.client.getChannel(server.channelReport)
    if (!channel) {
      server.reportModule = false
      server.channelReport = ''
      return ctx.replyT('commands', 'commands:report.channelNotFound')
    }

    const embed = new EmbedBuilder()
    embed.setColor('MODERATION')
    embed.setThumbnail(member.avatarURL)
    embed.addField(ctx._locale('commands:report.embed.memberName'), `${member.username}#${member.discriminator} (\`${member.id}\`)`)
    embed.addField(ctx._locale('commands:report.embed.authorName'), `${ctx.message.author.username}#${ctx.message.author.discriminator} (\`${ctx.message.author.id}\`)`)
    embed.addField(ctx._locale('commands:report.embed.channel'), ctx.message.channel.mention)
    embed.addField(ctx._locale('commands:report.embed.reason'), reason[1] ? `[${reason[0]}](${reason[1]})` : reason[0])

    channel.createMessage(embed.build())
    ctx.replyT('success', 'commands:report.successfullySent')
  }
}
