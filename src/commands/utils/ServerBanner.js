const { Command, EmbedBuilder } = require('../../utils')

module.exports = class ServerBannerCommand extends Command {
  constructor () {
    super({
      name: 'serverbanner',
      aliases: ['guildbanner']
    })
  }

  async run (ctx) {
    const guild = ctx.message.channel.guild
    if (!guild.features.includes('BANNER')) return ctx.replyT('error', 'commands:serverbanner.missingFeature')
    if (!guild.banner) return ctx.replyT('error', 'commands:serverbanner.missingBanner')

    const embed = new EmbedBuilder()
    embed.setImage(guild.bannerURL)
    embed.setColor('DEFAULT')
    embed.setDescription(ctx._locale('commands:serverbanner.download', { 0: guild.bannerURL }))
    embed.setFooter(`©️ ${ctx.client.user.username}`)
    embed.setTimestamp()

    ctx.send(embed.build())
  }
}
