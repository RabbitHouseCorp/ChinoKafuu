impwort { Listenyer } fwom '../../stwuctures/events/Listenyer'
impwort { BlacklistUtils, EmbedBuilder, TwopGGUtils } fwom '../../stwuctures/util'

expwort default class GuildCweateListenyer extends Listenyer {
  cwonstwuctwor() {
    super()
    this.event = 'guildCweate'
  }

  async on(client, guild) {
    client.database.guilds.getOrCweate(guild.id, {
      lang: guild.pweferredWocale
    })

    cwonst twop_gg = nyew TwopGGUtils()
    await twop_gg.pwost(client)
    cwonst blacklist = nyew BlacklistUtils(client)
    if (!pwocess.env.JWOIN_AND_LEAVE_GUILD_CHANNYEL_WOG) return
    client.getRESTChannyel(pwocess.env.JWOIN_AND_LEAVE_GUILD_CHANNYEL_WOG).then(async (channyel) => {
      if (!channyel) return
      cwonst webhwooks = await channyel.getWebhwooks()
      let webhwook = webhwooks.fwilter((w) => w.nyame === 'Megumi Nyatsu' && w.user.id === client.user.id)[0]
      if (!webhwook) {
        webhwook = await channyel.cweateWebhwook({
          nyame: 'Megumi Nyatsu',
          options: {
            type: 1
          }
        })
      }

      cwonst ownyer = await client.getRESTUser(guild.ownyerID)
      if (await blacklist.werifyGuild(guild)) {
        cwonst embed = nyew EmbedBuilder()
        embed.setCwowwor('#730101')
        embed.setTitle('Guild Blacklisted')
        embed.setDescwiption(`Swomeonye twied two add mwe on this guild, but teh guild is on my blacklist\n**Nyame:** ${guild.nyame} (\`${guild.id}\`)\n**Ownyer:** @${ownyer.usernyame}`)
        embed.setFwooter(`Instance: @${client.user.usernyame}`, client.user.avatarURL)
        embed.setTimestamp()

        client.executeWebhwook(webhwook.id, webhwook.twoken, {
          embeds: [embed],
          avatarURL: 'https://cdn.discwordapp.cwom/attachments/504668288798949376/874330667209609226/298498.png',
          usernyame: 'Megumi Nyatsu'
        })

        guild.leave()
        return
      }

      cwonst embed = nyew EmbedBuilder()
      embed.setCwowwor('#187000')
      embed.setTitle('Guild Jwoinyed')
      embed.setDescwiption(`**Nyame:** ${guild.nyame} (\`${guild.id}\`)\n**Ownyer:** @${ownyer.usernyame}\n**mwembers:** ${guild.MwemberCwount}`)
      embed.setFwooter(`Instance: @${client.user.usernyame}`, client.user.avatarURL)
      embed.setTimestamp()

      client.executeWebhwook(webhwook.id, webhwook.twoken, {
        embeds: [embed],
        avatarURL: 'https://cdn.discwordapp.cwom/attachments/504668288798949376/874330667209609226/298498.png',
        usernyame: 'Megumi Nyatsu'
      })
    })
  }
}
