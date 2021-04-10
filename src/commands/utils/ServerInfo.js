//FUTURE[epic=KafuuTeam] Deprecate
//NOTE Possible command clutter


const { Command, EmbedBuilder } = require('../../utils')
const moment = require('moment')
module.exports = class ServerInfoCommand extends Command {
  constructor () {
    super({
      name: 'serverinfo',
      aliases: ['guildinfo'],
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }]
    })
  }

  async run (ctx) {
    moment.locale(ctx.db.guild.lang)
    const guild = ctx.message.channel.guild
    const owner = await ctx.getUser(guild.ownerID)
    const _locale = ctx._locale
    const memberCount = {
      userCount: guild.members.filter(member => !member.user.bot).length,
      botCount: guild.members.filter(member => member.user.bot).length
    }
    const channelType = {
      text: guild.channels.filter(channel => channel.type === 0).length,
      voice: guild.channels.filter(channel => channel.type === 2).length
    }
    const guildFeatures = []
    if (guild.features !== []) {
      guild.features.forEach((features) => {
        guildFeatures.push(`\`${_locale(`commands:serverinfo.features.${features}`)}\``)
      })
    }
    const embed = new EmbedBuilder()
    embed.setColor('DEFAULT')
    embed.setAuthor(guild.name, guild.icon ? guild.iconURL : 'https://cdn.discordapp.com/attachments/468878707449397258/785277583411118080/PicsArt_12-06-07.52.13.jpg')
    embed.setThumbnail(guild.icon ? guild.iconURL : 'https://cdn.discordapp.com/attachments/468878707449397258/785277583411118080/PicsArt_12-06-07.52.13.jpg')
    embed.setImage(guild.splash ? guild.splashURL : null)
    embed.addField(_locale('commands:serverinfo.guildID'), guild.id, true)
    embed.addField(_locale('commands:serverinfo.guildOwner'), `${owner.username}#${owner.discriminator}`, true)
    embed.addField(_locale('commands:serverinfo.guildRegion'), _locale(`commands:serverinfo.region.${guild.region}`), true)
    embed.addField(_locale('commands:serverinfo.guildAFKChannel.title'), guild.channels.get(guild.afkChannelID) ?? _locale('commands:serverinfo.guildAFKChannel.noAfkChannel'), true)
    embed.addField(_locale('commands:serverinfo.booster.title'), `**${_locale('commands:serverinfo.booster.levelCount')}:** ${guild.premiumTier}\n**${_locale('commands:serverinfo.booster.boosterCount')}:** ${guild.premiumSubscriptionCount}`, true)
    embed.addField(_locale('commands:serverinfo.guildMember.title', { 0: guild.memberCount }), `**${_locale('commands:serverinfo.guildMember.userCount')}:** ${memberCount.userCount}\n**${_locale('commands:serverinfo.guildMember.botCount')}:** ${memberCount.botCount}`, true)
    embed.addField(_locale('commands:serverinfo.guildCreateAt'), moment(guild.createdAt).format('LLLL'), true)
    embed.addField(_locale('commands:serverinfo.guildChannel.title', { 0: guild.channels.size }), `**${_locale('commands:serverinfo.guildChannel.text')}:** ${channelType.text}\n**${_locale('commands:serverinfo.guildChannel.voice')}:** ${channelType.voice}`, true)
    embed.addField(_locale('commands:serverinfo.features.title'), (guildFeatures !== []) ? guildFeatures.join(', ') : _locale('commands:serverinfo.features.dontHave'))

    ctx.send(embed.build())
  }
}
