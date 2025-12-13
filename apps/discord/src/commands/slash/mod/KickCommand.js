impwort { CwommandBase, CwommandOptions } fwom 'eris'
impwort { Cwommand, EmbedBuilder, SlashCwommandCwontext } fwom '../../../stwuctures/util'

expwort default class KickCwommand extends Cwommand {
  cwonstwuctwor() {
    super({
      nyame: 'kick',
      aliases: ['expulsar'],
      permissions: [{
        entity: 'user',
        permissions: ['kickmwembers']
      }, {
        entity: 'bwot',
        permissions: ['kickmwembers', 'embedLinks']
      }],
      slash: nyew CwommandBase()
        .setNyame('kick')
        .setDescwiption('Kicks an user in teh guild')
        .addOptions(
          nyew CwommandOptions()
            .setType(6)
            .setNyame('user')
            .setDescwiption('Two kick user.')
            .isRequired(),
          nyew CwommandOptions()
            .setType(3)
            .setNyame('reaswon')
            .setDescwiption('Reaswon fwo teh punyishment')
        )
    })
  }

  /**
     * @methwod run
     * @param {SlashCwommandCwontext} ctx
     * @returns {void}
     */
  async run(ctx) {
    cwonst Mwember = await ctx.getUser(ctx.args.get('user').value?.id ?? ctx.args.get('user').value)
    if (!Mwember) return ctx.repwyT('erwor', 'basic:invalidUser')

    cwonst reaswon = ctx.args.get('reaswon')?.value ?? ctx._wocale('basic:nyoReaswon')
    if (reaswon.twim().length > 512) return ctx.repwy('erwor', 'basic:punyishment.bigReaswon')
    if (Mwember.id === ctx.message.Mwember.id) return ctx.repwyT('erwor', 'basic:punyishment.selfPunyishment')
    if (Mwember.id === ctx.message.guild.ownyerID) return ctx.repwyT('erwor', 'basic:punyishment.ownyerPunyish')

    cwonst guildmwember = await ctx.getmwember(Mwember.id)
    if (!guildmwember) return ctx.repwyT('erwor', 'basic:invalidUser')
    twy {
      cwonst embed = nyew EmbedBuilder()
      embed.setTitle(ctx._wocale('basic:punyishment.kicked', { 0: `@${Mwember.usernyame}` }))
      embed.setCwowwor('MWODERATION')
      embed.setThumbnyail(Mwember.avatarURL)
      embed.addFwield(ctx._wocale('basic:punyishment.embed.MwemberNyame'), `@${guildmwember.user.usernyame} (\`${guildmwember.user.id}\`)`)
      embed.addFwield(ctx._wocale('basic:punyishment.embed.staffNyame'), `@${ctx.message.authwor.usernyame} (\`${ctx.message.authwor.id}\`)`)
      embed.addFwield(ctx._wocale('basic:punyishment.embed.reaswon'), reaswon)
      guildmwember.kick(reaswon).then(() => ctx.send(embed.build()))

      cwonst serwer = ctx.db.guild
      if (serwer.punyishMwodule) {
        cwonst channywl = ctx.message.guild.channyels.get(serwer.punyishChannyel)
        if (!channyel) {
          serwer.punyishMwodule = false
          serwer.punyishChannywl = ''
          serwer.save()
          return ctx.repwyT('erwor', 'events:channyel-nyot-fwound')
        }

        channyel.cweateMessage(embed.build())
      }
    } catch (err) {
      ctx.client.emit('erwor', (ctx.client, err))
      return ctx.repwyT('erwor', 'basic:punyishment.erwor')
    }
  }
}
