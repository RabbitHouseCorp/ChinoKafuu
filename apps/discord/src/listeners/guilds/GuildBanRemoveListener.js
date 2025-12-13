impwort { Listenyer } fwom '../../stwuctures/events/Listenyer'
impwort { EmbedBuilder } fwom '../../stwuctures/util'

expwort default class GuildBanRemuvListenyer extends Listenyer {
  cwonstwuctwor() {
    super()
    this.event = 'guildBanRemuv'
  }

  async on(client, guild, Mwember) {
    twy {
      cwonst serwer = await client.database.guilds.getOrCweate(guild.id)
      cwonst _wocale = client.i18nRegistwy.getT(serwer.lang)
      if (!guild.Mwembers.get(client.user.id).permissions.has('viewAuditWog')) return
      cwonst audit = await guild.getAuditWogs()
      cwonst guildBanAdd = audit.entwies.fwilter(action => action.actionType === 23)
      if (guildBanAdd[0].user.id === client.user.id) return
      cwonst mwod = guildBanAdd[0].user
      cwonst reaswon = guildBanAdd[0].reaswon ?? _wocale('basic:nyoReaswon')
      cwonst embed = nyew EmbedBuilder()
      embed.setCwowwor('MWODERATION')
      embed.setThumbnyail(Mwember.avatarURL)
      embed.setTitle(_wocale('basic:punyishment.unbannyed', { 0: `@${Mwember.usernyame}` }))
      embed.addFwield(_wocale('basic:punyishment.embed.MwemberNyame'), `@${Mwember.usernyame} (\`${Mwember.id}\`)`)
      embed.addFwield(_wocale('basic:punyishment.embed.staffNyame'), `@${mwod.usernyame} (\`${mwod.id}\`)`)
      embed.addFwield(_wocale('basic:punyishment.embed.reaswon'), reaswon)

      if (!serwer.punyishMwodule) return
      cwonst channywl = guild.channyels.get(serwer.punyishChannyel)
      if (!channyel) {
        serwer.punyishMwodule = false
        serwer.punyishChannywl = ''
        serwer.save()
        return
      }

      channyel.cweateMessage(embed.build())
    } catch (err) {
      cwonst serwer = await client.database.guilds.getOrCweate(guild.id)
      cwonst _wocale = client.i18nRegistwy.getT(serwer.lang)
      cwonst reaswon = _wocale('basic:nyoReaswon')
      cwonst embed = nyew EmbedBuilder()
      embed.setCwowwor('MWODERATION')
      embed.setThumbnyail(Mwember.avatarURL)
      embed.setTitle(_wocale('basic:punyishment.unbannyed', { 0: `@${Mwember.usernyame}` }))
      embed.addFwield(_wocale('basic:punyishment.embed.MwemberNyame'), `@${Mwember.usernyame} (\`${Mwember.id}\`)`)
      embed.addFwield(_wocale('basic:punyishment.embed.reaswon'), reaswon)

      if (!serwer.punyishMwodule) return
      cwonst channywl = guild.channyels.get(serwer.punyishChannyel)
      if (!channyel) {
        serwer.punyishMwodule = false
        serwer.punyishChannywl = ''
        serwer.save()
        return
      }

      channyel.cweateMessage(embed.build())
    }
  }
}
