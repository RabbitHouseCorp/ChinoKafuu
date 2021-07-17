const Listener = require('../../structures/events/Listener')
const { EmbedBuilder, TopGGUtils, BlacklistUtils } = require('../../utils')

module.exports = class GuildCreateListener extends Listener {
  constructor() {
    super()
    this.event = 'guildCreate'
    this.region = {
      brazil: 'pt-BR',
      europe: 'en-US',
      hongkong: 'zh-TW',
      japan: 'ja-JP',
      russia: 'ru-RU',
      singapore: 'zh-TW',
      southafrica: 'en-US',
      sydney: 'en-US',
      'us-central': 'en-US',
      'us-east': 'en-US',
      'us-south': 'en-US',
      'us-west': 'en-US',
      india: 'en-US'
    }
  }

  async on(client, guild) {
    const server = await client.database.guilds.getOrCreate(guild.id, {
      lang: this.region[guild.region]
    })

    const top_gg = new TopGGUtils()
    await top_gg.post(client)
    const _locale = client.i18nRegistry.getT(server.lang)
    const me = guild.members.get(client.user.id).permission.has('viewAuditLogs')
    const blacklist = new BlacklistUtils(client)
    if (!me) {
      if (await blacklist.verifyGuild(guild)) return guild.leave()
      return
    }

    const audit = await guild.getAuditLogs()
    const guildAudit = audit.entries.filter(action => action.actionType === 28)
    const user = await client.users.get(guildAudit[0].user.id)
    if (await blacklist.verifyGuild(guild)) {
      const embed = new EmbedBuilder()
      embed.setColor('MODERATION')
      embed.setThumbnail(guild.iconURL)
      embed.addField(_locale('basic:guildban.title'), _locale('basic:guildban.explain', { 0: guild.name }))
      embed.addField(_locale('basic:guildban.reason'), `\`${server.blacklistReason}\``)
      guild.leave()

      return user.getDMChannel().then(channel => channel.createMessage(embed.build())).catch(() => { })
    }

    const embed = new EmbedBuilder()
    embed.setImage('https://cdn.discordapp.com/attachments/648188298149232644/770759671552016414/gc9DEF.png')
    embed.setColor('DEFAULT')
    embed.setFooter(_locale('basic:addedToGuild.guildSaved', { 0: guild.name }), guild.icon ? guild.iconURL : null)
    embed.addField(_locale('basic:addedToGuild.thanks'), _locale('basic:addedToGuild.description', { 0: user.mention, 1: guild.name, 2: server.prefix }))

    user.getDMChannel().then(channel => channel.createMessage(embed.build()))
  }
}
